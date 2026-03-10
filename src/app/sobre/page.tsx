import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge, CreatorsGridShowcase, CtaBanner } from '@/components'
import { getAvatarFallback } from '@/lib/avatar'
import { getAllCreators } from '@/lib/creators'

export const metadata: Metadata = {
  title: 'Sobre o Projeto',
  description:
    'Conheça o propósito do Girls in Tech Brazil e como a plataforma amplia a visibilidade de criadoras brasileiras em tecnologia.',
  openGraph: {
    title: 'Sobre o Projeto | Girls in Tech Brazil',
    description:
      'Entenda o contexto, os valores e o impacto da plataforma colaborativa Girls in Tech Brazil.',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/sobre/',
  },
}

const PILLARS = [
  {
    title: 'Curadoria com critério',
    description:
      'Os perfis seguem um schema validado, com links públicos e ativos, para manter qualidade e confiança na descoberta.',
  },
  {
    title: 'Descoberta facilitada',
    description:
      'Busca, filtros por categoria e perfis editoriais ajudam qualquer pessoa a encontrar referências técnicas com rapidez.',
  },
  {
    title: 'Comunidade aberta',
    description:
      'O projeto é open source e colaborativo. Qualquer pessoa pode contribuir com um Pull Request para incluir novas criadoras.',
  },
]

export default async function SobrePage() {
  const creators = await getAllCreators()
  // Only include creators that have a real avatar URL so photo slots
  // never fall back to initials due to missing data.
  const showcaseCreators = creators
    .filter((c) => Boolean(c.avatar))
    .map((c) => ({
      name: c.name,
      imageUrl: c.avatar!,
      fallback: getAvatarFallback(c.name),
    }))

  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[90vh] items-center overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-strong)' }}
      >
        <div className="page-shell w-full py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left — text */}
            <div className="flex flex-col gap-8">
              <div>
                <Badge variant="solid">Sobre a plataforma</Badge>
              </div>

              <h1
                className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-brand-300), var(--color-rose-400))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <span className="block">Visível.</span>
                <span className="block">Referência.</span>
                <span className="block">Inspiração.</span>
              </h1>

              <p className="max-w-lg text-lg leading-8 text-[var(--color-brand-200)]">
                Girls in Tech Brazil existe para ampliar a visibilidade de mulheres brasileiras que
                ensinam, publicam e lideram conversas sobre tecnologia. Representação importa: quem
                não é visto não é encontrado, e quem não é encontrado não se torna referência.
              </p>

              <nav className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <Link
                  href="/criadoras/"
                  className="group flex items-center gap-2 text-base font-semibold text-[var(--color-brand-300)] transition-opacity hover:opacity-80"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                  Conhecer as criadoras
                </Link>
                <Link
                  href="/contribuir/"
                  className="group flex items-center gap-2 text-base font-semibold text-[var(--color-rose-400)] transition-opacity hover:opacity-80"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                  Contribuir com o catálogo
                </Link>
              </nav>
            </div>

            {/* Right — animated creator grid (desktop only) */}
            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <CreatorsGridShowcase creators={showcaseCreators} className="h-[560px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS + CTA ─────────────────────────────────────────────────── */}
      <div className="page-shell section-gap space-y-8">
        <section className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="panel p-5">
              <h2 className="text-xl font-black tracking-tight">{pillar.title}</h2>
              <p className="mt-3 leading-7 text-[var(--color-text-muted)]">{pillar.description}</p>
            </article>
          ))}
        </section>

        <CtaBanner
          title="Quer fortalecer essa curadoria com a comunidade?"
          description="Ajude a ampliar o catálogo com novas criadoras e mantenha o ecossistema tech mais diverso e encontrável."
          actionLabel="Contribuir com o catálogo"
          actionHref="/contribuir/"
        />
      </div>
    </div>
  )
}
