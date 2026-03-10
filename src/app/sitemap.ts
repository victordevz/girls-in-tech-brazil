import type { MetadataRoute } from 'next'
import { getAllCreators } from '@/lib/creators'
import { SITE_URL } from '@/lib/site'
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const creators = await getAllCreators()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1, changeFrequency: 'weekly' },
    { url: `${SITE_URL}/criadoras/`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${SITE_URL}/sobre/`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/contribuir/`, priority: 0.7, changeFrequency: 'monthly' },
  ]

  const creatorRoutes: MetadataRoute.Sitemap = creators.map((creator) => ({
    url: `${SITE_URL}/criadoras/${creator.slug}/`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  return [...staticRoutes, ...creatorRoutes]
}
