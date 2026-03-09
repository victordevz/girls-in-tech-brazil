import Link from 'next/link'
import { Badge } from '@/components'

const STEPS = [
  'Revise o schema em src/schemas/creator.schema.ts e os exemplos em src/data/creators/.',
  'Adicione ou atualize um JSON válido com links públicos e categorias coerentes.',
  'Execute npm run validate, npm run lint e npm run type-check antes de abrir o PR.',
]

export default function ContribuirPage() {
  return (
    <div className="page-shell section-gap space-y-8">
      <section className="panel space-y-5 px-6 py-8 sm:px-8">
        <Badge>Contribuição guiada</Badge>
        <h1 className="text-4xl font-black tracking-tight">
          Amplie o catálogo sem quebrar o contrato de dados.
        </h1>
        <p className="max-w-3xl leading-8 text-[var(--color-text-muted)]">
          O fluxo atual prioriza consistência do dataset, revisão clara e compatibilidade com a
          exportação estática. Antes de abrir uma contribuição, valide a estrutura do perfil e o
          alinhamento com a curadoria do projeto.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-4">
          {STEPS.map((step, index) => (
            <article key={step} className="panel flex gap-4 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] font-black text-[var(--color-text-inverse)]">
                {index + 1}
              </div>
              <p className="leading-7 text-[var(--color-text-base)]">{step}</p>
            </article>
          ))}
        </div>

        <aside className="panel space-y-4 p-5">
          <h2 className="text-2xl font-black tracking-tight">Referências úteis</h2>
          <p className="leading-7 text-[var(--color-text-muted)]">
            Use a documentação existente para seguir o fluxo esperado pela validação e pelo PR
            template.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/criadoras/" className="rounded-full border px-4 py-3 font-semibold">
              Explorar catálogo atual
            </Link>
            <a
              href="https://github.com/glaucia86/girls-in-tech-brazil/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border px-4 py-3 font-semibold"
            >
              Abrir CONTRIBUTING.md
            </a>
          </div>
        </aside>
      </section>
    </div>
  )
}
