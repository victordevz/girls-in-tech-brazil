import { notFound } from 'next/navigation'
import { getCreatorBySlug, getCreatorSlugs } from '@/lib/creators'
import { Avatar, Badge } from '@/components'
import { CONTENT_TYPE_META } from '@/lib/content-types'
import { toCreatorDetail } from '@/lib/discovery'

export async function generateStaticParams() {
  const slugs = await getCreatorSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function CriadoraPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const creator = await getCreatorBySlug(slug)

  if (!creator) {
    notFound()
  }

  const detail = toCreatorDetail(creator)

  return (
    <div className="page-shell section-gap space-y-8">
      {/* Gradient strip at top */}
      <div
        className="-mx-4 h-2 rounded-full sm:-mx-0"
        style={{ background: 'linear-gradient(90deg, #7c3aed, #f43f5e, #f59e0b)' }}
        aria-hidden="true"
      />

      <section className="panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[auto_1fr]">
        <Avatar
          name={detail.name}
          imageUrl={detail.avatarUrl}
          fallback={detail.avatarFallback}
          size="lg"
        />
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {detail.featured ? <Badge variant="featured">✨ Destaque editorial</Badge> : null}
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
            <div className="flex flex-wrap gap-2">
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
    </div>
  )
}
