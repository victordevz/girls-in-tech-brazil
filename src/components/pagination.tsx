import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PaginationState } from '@/lib/discovery'
import { cn } from '@/lib/cn'

type PaginationProps = {
  pagination: PaginationState
  buildHref: (page: number) => string
}

export function Pagination({ pagination, buildHref }: PaginationProps) {
  if (pagination.totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: pagination.totalPages }, (_, index) => index + 1)

  return (
    <nav
      aria-label="Paginação de criadoras"
      className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-[var(--color-border-soft)] bg-white px-4 py-4 shadow-[var(--shadow-soft)]"
    >
      <Link
        href={buildHref(Math.max(pagination.page - 1, 1))}
        aria-disabled={!pagination.hasPrevious}
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
          pagination.hasPrevious
            ? 'bg-[var(--color-surface-muted)] text-[var(--color-text-base)]'
            : 'pointer-events-none opacity-45',
        )}
      >
        <ChevronLeft className="size-4" />
        Anterior
      </Link>
      <div className="flex flex-wrap justify-center gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={buildHref(page)}
            aria-current={page === pagination.page ? 'page' : undefined}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold transition',
              page === pagination.page
                ? 'bg-[var(--color-brand-500)] text-[var(--color-text-inverse)]'
                : 'bg-[var(--color-surface-muted)] text-[var(--color-text-base)] hover:bg-[var(--color-brand-100)]',
            )}
          >
            {page}
          </Link>
        ))}
      </div>
      <Link
        href={buildHref(Math.min(pagination.page + 1, pagination.totalPages))}
        aria-disabled={!pagination.hasNext}
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
          pagination.hasNext
            ? 'bg-[var(--color-surface-muted)] text-[var(--color-text-base)]'
            : 'pointer-events-none opacity-45',
        )}
      >
        Próxima
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  )
}
