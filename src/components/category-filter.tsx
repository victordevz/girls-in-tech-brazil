'use client'

import { useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/schemas/creator.schema'
import { cn } from '@/lib/cn'

type CategoryFilterProps = {
  categories: Category[]
  selectedCategories: Category[]
}

export function CategoryFilter({ categories, selectedCategories }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  function toggleCategory(category: Category) {
    const nextSelected = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category]

    const params = new URLSearchParams(searchParams.toString())

    params.delete('categories')
    params.delete('page')

    nextSelected.forEach((item) => params.append('categories', item))

    const queryString = params.toString()

    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
    })
  }

  return (
    <div className="flex flex-wrap gap-2" aria-label="Filtrar por categoria">
      {categories.map((category) => {
        const active = selectedCategories.includes(category)

        return (
          <button
            key={category}
            type="button"
            onClick={() => toggleCategory(category)}
            aria-pressed={active}
            className={cn(
              'rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-200',
              active
                ? 'border-transparent text-white shadow-md'
                : 'border-[var(--color-border-soft)] bg-white text-[var(--color-text-base)] hover:border-[var(--color-brand-400)] hover:bg-[var(--color-surface-muted)]',
            )}
            style={
              active
                ? {
                    background: 'linear-gradient(135deg, #7c3aed, #f43f5e)',
                    boxShadow: '0 2px 12px rgba(139,92,246,0.30)',
                  }
                : undefined
            }
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
