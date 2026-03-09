import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PaginationState } from '@/lib/discovery'
import { cn } from '@/lib/cn'

type PaginationProps = {
  pagination: PaginationState
  buildHref: (page: number) => string
}

type PaginationControlProps = {
  children: React.ReactNode
  href: string
  disabled: boolean
}

function PaginationControl({ children, href, disabled }: PaginationControlProps) {
  const className = cn(
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
    disabled
      ? 'cursor-default opacity-45'
      : 'bg-[var(--color-surface-muted)] text-[var(--color-text-base)]',
  )

  if (disabled) {
    return (
      <span aria-disabled="true" className={className}>
        {children}
      </span>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
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
      <PaginationControl
        href={buildHref(Math.max(pagination.page - 1, 1))}
        disabled={!pagination.hasPrevious}
      >
        <ChevronLeft className="size-4" />
        Anterior
      </PaginationControl>
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
      <PaginationControl
        href={buildHref(Math.min(pagination.page + 1, pagination.totalPages))}
        disabled={!pagination.hasNext}
      >
        Próxima
        <ChevronRight className="size-4" />
      </PaginationControl>
    </nav>
  )
}
