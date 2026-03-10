import type { Creator } from '@/schemas/creator.schema'
import { SITE_URL } from '@/lib/site'

export function toSafeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

function toAbsoluteImageUrl(avatar: string | undefined) {
  if (!avatar) {
    return undefined
  }

  if (avatar.startsWith('/')) {
    return `${SITE_URL}${avatar}`
  }

  if (/^https?:\/\//i.test(avatar)) {
    return avatar
  }

  return undefined
}

export function buildPersonJsonLd(creator: Creator) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: creator.name,
    description: creator.bio,
    url: `${SITE_URL}/criadoras/${creator.slug}/`,
    image: toAbsoluteImageUrl(creator.avatar),
    sameAs: Object.values(creator.links).filter(Boolean),
    knowsAbout: creator.categories,
  }
}
