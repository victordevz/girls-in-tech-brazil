import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import {
  type ContentType,
  type Creator,
  type CreatorFile,
  creatorFileSchema,
  deriveContentTypes,
} from '@/schemas/creator.schema'

const creatorsDirectory = path.join(process.cwd(), 'src', 'data', 'creators')
let creatorsPromise: Promise<Creator[]> | undefined

function isPublicCreatorFile(fileName: string) {
  return fileName.endsWith('.json') && !fileName.startsWith('_')
}

function withDerivedFields(creator: CreatorFile): Creator {
  return {
    ...creator,
    contentTypes: deriveContentTypes(creator.links),
  }
}

async function readCreatorFromFile(fileName: string): Promise<Creator> {
  const filePath = path.join(creatorsDirectory, fileName)
  const fileContent = await readFile(filePath, 'utf8')
  const parsedContent = JSON.parse(fileContent) as unknown
  return withDerivedFields(creatorFileSchema.parse(parsedContent))
}

async function loadAllCreators(): Promise<Creator[]> {
  const files = await readdir(creatorsDirectory)
  const creatorFiles = files.filter(isPublicCreatorFile).sort((left, right) => left.localeCompare(right))
  return Promise.all(creatorFiles.map(readCreatorFromFile))
}

export async function getAllCreators(): Promise<Creator[]> {
  if (!creatorsPromise) {
    creatorsPromise = loadAllCreators()
  }

  return creatorsPromise
}

export async function getCreatorBySlug(slug: string): Promise<Creator | undefined> {
  const creators = await getAllCreators()
  return creators.find((creator) => creator.slug === slug)
}

export async function getCreatorSlugs(): Promise<string[]> {
  const creators = await getAllCreators()
  return creators.map((creator) => creator.slug)
}

export type { ContentType }
