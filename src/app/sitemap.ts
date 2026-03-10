import type { MetadataRoute } from 'next'
import { getAllCreators } from '@/lib/creators'

const BASE_URL = 'https://bullas.github.io/girls-in-tech-brazil'
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const creators = await getAllCreators()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, priority: 1, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/criadoras/`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/sobre/`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/contribuir/`, priority: 0.7, changeFrequency: 'monthly' },
  ]

  const creatorRoutes: MetadataRoute.Sitemap = creators.map((creator) => ({
    url: `${BASE_URL}/criadoras/${creator.slug}/`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  return [...staticRoutes, ...creatorRoutes]
}
