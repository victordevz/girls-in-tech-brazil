import type { Creator } from '@/schemas/creator.schema'

const BASE_URL = 'https://bullas.github.io/girls-in-tech-brazil'

export function buildPersonJsonLd(creator: Creator) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: creator.name,
    description: creator.bio,
    url: `${BASE_URL}/criadoras/${creator.slug}/`,
    image: creator.avatar ?? undefined,
    sameAs: Object.values(creator.links).filter(Boolean),
    knowsAbout: creator.categories,
  }
}
