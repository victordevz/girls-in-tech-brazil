import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Localização atual">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-muted)]">
        {items.map((item, index) => {
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--color-brand-700)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-[var(--color-text-base)]">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 ? <span aria-hidden="true">›</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
