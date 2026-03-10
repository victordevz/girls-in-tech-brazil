import type { Category, Creator } from '@/schemas/creator.schema'
import { CreatorCard } from '@/components/creator-card'
import { getRelatedCreators } from '@/lib/discovery'

type RelatedCreatorsProps = {
  creators: Creator[]
  currentSlug: string
  categories: Category[]
}

export function RelatedCreators({ creators, currentSlug, categories }: RelatedCreatorsProps) {
  const relatedCreators = getRelatedCreators(creators, currentSlug, categories)

  if (relatedCreators.length === 0) {
    return null
  }

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight">Criadoras relacionadas</h2>
        <p className="text-[var(--color-text-muted)]">
          Continue explorando perfis com categorias em comum.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {relatedCreators.map((creator) => (
          <CreatorCard key={creator.slug} creator={creator} />
        ))}
      </div>
    </section>
  )
}
