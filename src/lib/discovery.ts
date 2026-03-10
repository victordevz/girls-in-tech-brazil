import {
  CREATOR_CATEGORIES,
  type Category,
  type ContentType,
  type Creator,
} from '@/schemas/creator.schema'
import { getAvatarFallback, type AvatarFallback } from '@/lib/avatar'

export const DISCOVERY_PAGE_SIZE = 12
const MAX_VISIBLE_CATEGORIES = 3

export type CreatorSummary = {
  slug: string
  name: string
  headline: string
  avatarUrl: string | null
  avatarFallback: AvatarFallback
  categories: Category[]
  hiddenCategoryCount: number
  contentTypes: ContentType[]
  featured: boolean
  profileHref: string
}

export type PaginationState = {
  page: number
  pageSize: number
  totalResults: number
  totalPages: number
  hasPrevious: boolean
  hasNext: boolean
}

export type FilterState = {
  query: string
  selectedCategories: Category[]
  pagination: PaginationState
}

export type EmptyStateView = {
  title: string
  description: string
  actionLabel: string | null
  actionHref: string | null
}

export type CreatorListView = {
  items: CreatorSummary[]
  filters: FilterState
  emptyState: EmptyStateView | null
}

export type CreatorDetailView = {
  slug: string
  name: string
  headline: string
  bio: string
  avatarUrl: string | null
  avatarFallback: AvatarFallback
  categories: Category[]
  tags: string[]
  links: Array<{ type: ContentType; url: string }>
  contentTypes: ContentType[]
  featured: boolean
}

export type DiscoveryParams = {
  q?: string
  categories?: string | string[]
  page?: string
  pageSize?: string
}

function sortCreatorsByEditorialPriority(creators: Creator[]) {
  return [...creators].sort((left, right) => {
    const featuredScore = Number(right.featured) - Number(left.featured)
    if (featuredScore !== 0) {
      return featuredScore
    }

    const rightDate = Date.parse(right.createdAt)
    const leftDate = Date.parse(left.createdAt)
    const dateScore = rightDate - leftDate
    if (dateScore !== 0) {
      return dateScore
    }

    const nameScore = left.name.localeCompare(right.name, 'pt-BR')
    if (nameScore !== 0) {
      return nameScore
    }

    return left.slug.localeCompare(right.slug, 'pt-BR')
  })
}

function normalizeQuery(query: string | undefined) {
  return query?.trim() ?? ''
}

function isCategory(value: string): value is Category {
  return CREATOR_CATEGORIES.includes(value as Category)
}

function normalizeCategories(raw: string | string[] | undefined): Category[] {
  const values = Array.isArray(raw) ? raw : raw ? [raw] : []
  const unique = new Set<Category>()

  values
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(isCategory)
    .forEach((value) => unique.add(value))

  return Array.from(unique)
}

function normalizePage(value: string | undefined) {
  const page = Number(value)
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1
}

function normalizePageSize(value: string | undefined) {
  const pageSize = Number(value)
  if (!Number.isFinite(pageSize) || pageSize < 1) {
    return DISCOVERY_PAGE_SIZE
  }

  return Math.min(Math.floor(pageSize), 24)
}

function matchesQuery(creator: Creator, query: string) {
  if (!query) {
    return true
  }

  const haystack = [
    creator.name,
    creator.headline,
    creator.bio,
    creator.categories.join(' '),
    creator.tags?.join(' ') ?? '',
  ]
    .join(' ')
    .toLocaleLowerCase('pt-BR')

  return haystack.includes(query.toLocaleLowerCase('pt-BR'))
}

function matchesCategories(creator: Creator, selectedCategories: Category[]) {
  if (selectedCategories.length === 0) {
    return true
  }

  return creator.categories.some((category) => selectedCategories.includes(category))
}

export function toCreatorSummary(creator: Creator): CreatorSummary {
  const visibleCategories = creator.categories.slice(0, MAX_VISIBLE_CATEGORIES)

  return {
    slug: creator.slug,
    name: creator.name,
    headline: creator.headline,
    avatarUrl: creator.avatar ?? null,
    avatarFallback: getAvatarFallback(creator.name),
    categories: visibleCategories,
    hiddenCategoryCount: Math.max(creator.categories.length - visibleCategories.length, 0),
    contentTypes: creator.contentTypes,
    featured: creator.featured,
    profileHref: `/criadoras/${creator.slug}/`,
  }
}

export function toCreatorDetail(creator: Creator): CreatorDetailView {
  return {
    slug: creator.slug,
    name: creator.name,
    headline: creator.headline,
    bio: creator.bio,
    avatarUrl: creator.avatar ?? null,
    avatarFallback: getAvatarFallback(creator.name),
    categories: creator.categories,
    tags: creator.tags ?? [],
    links: creator.contentTypes.flatMap((type) => {
      const url = creator.links[type]
      return url ? [{ type, url }] : []
    }),
    contentTypes: creator.contentTypes,
    featured: creator.featured,
  }
}

export function buildDiscoveryView(creators: Creator[], params: DiscoveryParams): CreatorListView {
  const query = normalizeQuery(params.q)
  const selectedCategories = normalizeCategories(params.categories)
  const pageSize = normalizePageSize(params.pageSize)

  const filteredCreators = creators.filter(
    (creator) => matchesQuery(creator, query) && matchesCategories(creator, selectedCategories),
  )
  const sortedCreators = sortCreatorsByEditorialPriority(filteredCreators)

  const totalResults = sortedCreators.length
  const totalPages = Math.max(Math.ceil(totalResults / pageSize), 1)
  const page = Math.min(normalizePage(params.page), totalPages)
  const offset = (page - 1) * pageSize
  const items = sortedCreators.slice(offset, offset + pageSize).map(toCreatorSummary)

  const pagination: PaginationState = {
    page,
    pageSize,
    totalResults,
    totalPages,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
  }

  return {
    items,
    filters: {
      query,
      selectedCategories,
      pagination,
    },
    emptyState:
      items.length === 0 ? buildEmptyState(query, selectedCategories, creators.length) : null,
  }
}

function buildEmptyState(
  query: string,
  selectedCategories: Category[],
  totalCreators: number,
): EmptyStateView {
  if (totalCreators === 0) {
    return {
      title: 'Comunidade em crescimento',
      description: 'Ainda não há perfis publicados. Volte em breve ou contribua com uma indicação.',
      actionLabel: 'Contribuir',
      actionHref: '/contribuir/',
    }
  }

  const hasFilters = query.length > 0 || selectedCategories.length > 0

  return {
    title: 'Nenhuma criadora encontrada',
    description: 'Tente ajustar a busca ou remover alguns filtros para ampliar os resultados.',
    actionLabel: hasFilters ? 'Limpar filtros' : null,
    actionHref: hasFilters ? '/criadoras/' : null,
  }
}

export function getDiscoveryCategories(creators: Creator[]) {
  const available = new Set(creators.flatMap((creator) => creator.categories))
  return CREATOR_CATEGORIES.filter((category) => available.has(category))
}

export function getRelatedCreators(
  creators: Creator[],
  currentSlug: string,
  categories: Category[],
  limit = 3,
) {
  if (categories.length === 0 || limit <= 0) {
    return []
  }

  const related = creators.filter((creator) => {
    if (creator.slug === currentSlug) {
      return false
    }

    return creator.categories.some((category) => categories.includes(category))
  })

  return sortCreatorsByEditorialPriority(related).slice(0, limit).map(toCreatorSummary)
}
