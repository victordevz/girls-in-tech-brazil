import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCreators, getCreatorBySlug, getCreatorSlugs } from '@/lib/creators'
import { Avatar, Badge, Breadcrumb, RelatedCreators, ShareButton } from '@/components'
import { CONTENT_TYPE_META } from '@/lib/content-types'
import { toCreatorDetail } from '@/lib/discovery'
import { buildPersonJsonLd } from '@/lib/jsonld'

export async function generateStaticParams() {
  const slugs = await getCreatorSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const creator = await getCreatorBySlug(slug)

  if (!creator) {
    return { title: { absolute: 'Criadora não encontrada' } }
  }

  return {
    title: { absolute: `${creator.name} · Girls in Tech Brazil` },
    description: creator.bio.slice(0, 155),
    alternates: {
      canonical: `/criadoras/${slug}/`,
    },
    openGraph: {
      title: `${creator.name} — Girls in Tech Brazil`,
      description: creator.headline,
      images: ['/images/og-default.png'],
    },
  }
}

export default async function CriadoraPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [creator, creators] = await Promise.all([getCreatorBySlug(slug), getAllCreators()])

  if (!creator) {
    notFound()
  }

  const detail = toCreatorDetail(creator)

  return (
    <div className="page-shell section-gap space-y-8">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb
          items={[
            { label: 'Início', href: '/' },
            { label: 'Criadoras', href: '/criadoras/' },
            { label: detail.name },
          ]}
        />
        <ShareButton creatorName={detail.name} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonJsonLd(creator)) }}
      />

      {/* Gradient strip at top */}
      <div
        className="-mx-4 h-2 rounded-full sm:-mx-0"
        style={{ background: 'linear-gradient(90deg, #7c3aed, #f43f5e, #f59e0b)' }}
        aria-hidden="true"
      />

      <section className="panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-start">
        <Avatar
          name={detail.name}
          imageUrl={detail.avatarUrl}
          fallback={detail.avatarFallback}
          size="xl"
          shape="circle"
          className="mx-auto border-2 border-[var(--color-brand-300)] shadow-[0_18px_44px_rgba(109,40,217,0.2)] lg:mx-0"
        />
        <div className="space-y-5 text-center lg:text-left">
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {detail.categories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight">{detail.name}</h1>
            <p className="text-xl text-[var(--color-text-muted)]">{detail.headline}</p>
          </div>
          <p className="max-w-3xl leading-8 text-[var(--color-text-base)]">{detail.bio}</p>
          {detail.tags.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {detail.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {detail.links.map((link) => {
          const meta = CONTENT_TYPE_META[link.type]
          const Icon = meta.icon

          return (
            <a
              key={link.type}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="panel flex items-center justify-between gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-brand-400)] hover:shadow-[0_12px_32px_rgba(109,40,217,0.16)]"
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex size-12 items-center justify-center rounded-2xl text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">{meta.label}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{link.url}</p>
                </div>
              </div>
              <span
                className="text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #f43f5e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Abrir ↗
              </span>
            </a>
          )
        })}
      </section>

      <RelatedCreators
        currentSlug={detail.slug}
        categories={detail.categories}
        creators={creators}
      />
    </div>
  )
}
