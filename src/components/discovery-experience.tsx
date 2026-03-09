'use client'

import { useSearchParams } from 'next/navigation'
import {
  CategoryFilter,
  CreatorCard,
  EmptyState,
  Pagination,
  SearchBar,
} from '@/components'
import { buildDiscoveryView, getDiscoveryCategories } from '@/lib/discovery'
import type { Creator } from '@/schemas/creator.schema'

type DiscoveryExperienceProps = {
  creators: Creator[]
}

export function DiscoveryExperience({ creators }: DiscoveryExperienceProps) {
  const searchParams = useSearchParams()
  const discovery = buildDiscoveryView(creators, {
    q: searchParams.get('q') ?? undefined,
    categories: searchParams.getAll('categories'),
    page: searchParams.get('page') ?? undefined,
    pageSize: searchParams.get('pageSize') ?? undefined,
  })
  const categories = getDiscoveryCategories(creators)

  function buildPageHref(page: number) {
    const params = new URLSearchParams()

    if (discovery.filters.query) {
      params.set('q', discovery.filters.query)
    }

    discovery.filters.selectedCategories.forEach((category) => params.append('categories', category))

    if (page > 1) {
      params.set('page', String(page))
    }

    return params.toString() ? `/criadoras/?${params.toString()}` : '/criadoras/'
  }

  return (
    <>
      <section className="panel space-y-5 p-5 sm:p-6">
        <SearchBar initialValue={discovery.filters.query} />
        <CategoryFilter
          categories={categories}
          selectedCategories={discovery.filters.selectedCategories}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--color-text-muted)]">
          <p>
            {discovery.filters.pagination.totalResults} resultado(s) encontrados em{' '}
            {discovery.filters.pagination.totalPages} página(s)
          </p>
          <p>Página atual: {discovery.filters.pagination.page}</p>
        </div>
      </section>

      {discovery.emptyState ? (
        <EmptyState {...discovery.emptyState} />
      ) : (
        <section className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {discovery.items.map((creator) => (
              <CreatorCard key={creator.slug} creator={creator} />
            ))}
          </div>
          <Pagination pagination={discovery.filters.pagination} buildHref={buildPageHref} />
        </section>
      )}
    </>
  )
}
