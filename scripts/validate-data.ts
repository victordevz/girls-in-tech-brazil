import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { ZodError } from 'zod'
import { creatorFileSchema } from '@/schemas/creator.schema'

type ValidationIssue = {
  file: string
  field?: string
  message: string
}

type ParsedCreator = {
  fileName: string
  slug: string
  name: string
}

const creatorsDirectory = path.join(process.cwd(), 'src', 'data', 'creators')
const isCiMode = process.argv.includes('--ci')

function isPublicCreatorFile(fileName: string) {
  return fileName.endsWith('.json') && !fileName.startsWith('_')
}

function formatIssue(issue: ValidationIssue) {
  const fieldLabel = issue.field ? ` Campo "${issue.field}":` : ''
  return `❌ [${issue.file}]${fieldLabel} ${issue.message}`
}

function formatJsonError(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return 'Erro desconhecido ao interpretar JSON.'
}

function readIssuesFromZod(error: ZodError, fileName: string): ValidationIssue[] {
  return error.issues.map((issue) => ({
    file: fileName,
    field: issue.path.join('.'),
    message: issue.message,
  }))
}

async function main() {
  const files = await readdir(creatorsDirectory)
  const creatorFiles = files.filter(isPublicCreatorFile).sort()
  const issues: ValidationIssue[] = []
  const parsedCreators: ParsedCreator[] = []

  for (const fileName of creatorFiles) {
    const filePath = path.join(creatorsDirectory, fileName)

    try {
      const fileContent = await readFile(filePath, 'utf8')
      const parsedJson = JSON.parse(fileContent) as unknown
      const creator = creatorFileSchema.parse(parsedJson)
      const expectedFileName = `${creator.slug}.json`

      if (fileName !== expectedFileName) {
        issues.push({
          file: fileName,
          field: 'slug',
          message: `O nome do arquivo deve ser "${expectedFileName}".`,
        })
      }

      parsedCreators.push({
        fileName,
        slug: creator.slug,
        name: creator.name,
      })
    } catch (error) {
      if (error instanceof SyntaxError) {
        issues.push({
          file: fileName,
          message: `JSON malformado: ${formatJsonError(error)}`,
        })
        continue
      }

      if (error instanceof ZodError) {
        issues.push(...readIssuesFromZod(error, fileName))
        continue
      }

      throw error
    }
  }

  const slugIndex = new Map<string, string[]>()
  const nameIndex = new Map<string, string[]>()

  for (const creator of parsedCreators) {
    slugIndex.set(creator.slug, [...(slugIndex.get(creator.slug) ?? []), creator.fileName])
    nameIndex.set(creator.name, [...(nameIndex.get(creator.name) ?? []), creator.fileName])
  }

  for (const [slug, fileNames] of slugIndex) {
    if (fileNames.length > 1) {
      issues.push({
        file: fileNames.join(', '),
        field: 'slug',
        message: `Slug duplicado "${slug}" encontrado em ${fileNames.join(' e ')}.`,
      })
    }
  }

  for (const [name, fileNames] of nameIndex) {
    if (fileNames.length > 1) {
      issues.push({
        file: fileNames.join(', '),
        field: 'name',
        message: `Nome duplicado "${name}" encontrado em ${fileNames.join(' e ')}.`,
      })
    }
  }

  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(formatIssue(issue))
    }

    const divider = isCiMode ? '' : '────────────────────────────────────────'
    if (divider) {
      console.error(divider)
    }
    console.error(
      `${issues.length} erro(s) encontrado(s). Corrija os problemas acima e execute novamente.`,
    )
    process.exit(1)
  }

  console.log(`✅ ${creatorFiles.length} arquivo(s) validados com sucesso.`)
}

main().catch((error) => {
  console.error('❌ Falha inesperada na validação dos dados.')
  console.error(error)
  process.exit(1)
})
