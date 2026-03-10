import { CtaBanner, Hero, StatsBanner } from '@/components'
import { getAllCreators } from '@/lib/creators'
import { toCreatorSummary } from '@/lib/discovery'
import { SectionReveal } from '@/components/section-reveal'
import { SpotlightGrid } from '@/components/spotlight-grid'

export default async function HomePage() {
  const creators = await getAllCreators()
  const spotlightPool = creators.map(toCreatorSummary)

  return (
    <div className="page-shell">
      <Hero
        eyebrow="Amplificando vozes femininas na tecnologia"
        title="Descubra quem são as mulheres que estão construindo o futuro tech no Brasil"
        description="Um site colaborativo de criadoras de conteúdos brasileiras em tecnologia. Encontre referências em programação, IA, dados, design, carreira e desenvolvimento de software."
        primaryAction={{ label: 'Explorar criadoras', href: '/criadoras/' }}
        secondaryAction={{ label: 'Como contribuir', href: '/contribuir/' }}
      />

      <StatsBanner
        title="Mais visibilidade para quem compartilha conhecimento"
        description="Este projeto amplifica a voz de mulheres no mundo tech, ajudando estudantes, profissionais e curiosos a encontrarem referências e aprenderem com quem está criando conteúdos de qualidade."
        metrics={[
          {
            label: 'Criadoras listadas',
            value: String(creators.length),
            description: 'Perfis carregados do dataset local e validados pelo schema oficial.',
          },
          {
            label: 'Categorias ativas',
            value: String(new Set(creators.flatMap((creator) => creator.categories)).size),
            description: 'Áreas que ajudam a recortar o ecossistema sem perder diversidade.',
          },
          {
            label: 'Formatos mapeados',
            value: String(new Set(creators.flatMap((creator) => creator.contentTypes)).size),
            description: 'Canais que mostram onde acompanhar e aprender com cada criadora.',
          },
        ]}
      />

      <SectionReveal className="section-gap pt-0">
        <div className="mb-8 space-y-3">
          <p className="eyebrow">Quem está por aqui</p>
          <h2 className="text-3xl font-black tracking-tight">
            Referências para inspirar e aprender
          </h2>
          <p className="max-w-2xl leading-7 text-[var(--color-text-muted)]">
            Perfis de mulheres que produzem conteúdo incrível sobre tecnologia — da programação ao
            design, da IA à carreira tech.
          </p>
        </div>
        <SpotlightGrid creators={spotlightPool} />
      </SectionReveal>

      <CtaBanner
        title="Conhece alguma mulher referência tech que deveria estar aqui?"
        description="Este projeto cresce pela comunidade. Se você conhece uma mulher que compartilha conhecimento tech no Brasil e ainda não está no catálogo, abra um PR e ajude a ampliar o mapa."
        actionLabel="Ver guia de contribuição"
        actionHref="/contribuir/"
      />
    </div>
  )
}
