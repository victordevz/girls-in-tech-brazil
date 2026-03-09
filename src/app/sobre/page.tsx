import { Badge, CtaBanner } from '@/components'

export default function SobrePage() {
  return (
    <div className="page-shell section-gap space-y-8">
      <section className="panel space-y-5 px-6 py-8 sm:px-8">
        <Badge>Sobre a plataforma</Badge>
        <h1 className="text-4xl font-black tracking-tight">
          O projeto mapeia referências femininas em tecnologia com curadoria e contexto.
        </h1>
        <p className="max-w-3xl leading-8 text-[var(--color-text-muted)]">
          Girls in Tech Brazil nasceu para aumentar a encontrabilidade de mulheres brasileiras que
          publicam, ensinam e lideram conversas sobre tecnologia. O foco está em representação
          qualificada, navegação simples e uma base que possa evoluir sem criar padrões visuais
          paralelos.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          [
            'Curadoria',
            'Os perfis seguem um schema validado e um fluxo de contribuição explícito.',
          ],
          [
            'Descoberta',
            'Busca, filtros e perfis detalhados ajudam a navegar por áreas e formatos de conteúdo.',
          ],
          [
            'Reuso',
            'Os componentes do E3 formam a base para os próximos incrementos da interface.',
          ],
        ].map(([title, description]) => (
          <article key={title} className="panel p-5">
            <h2 className="text-xl font-black tracking-tight">{title}</h2>
            <p className="mt-3 leading-7 text-[var(--color-text-muted)]">{description}</p>
          </article>
        ))}
      </section>

      <CtaBanner
        title="Quer sugerir melhorias para a experiência?"
        description="O épico E3 prepara a base visual. As próximas iterações dependem de feedback claro sobre legibilidade, descoberta e consistência."
        actionLabel="Contribuir com a curadoria"
        actionHref="/contribuir/"
      />
    </div>
  )
}
