import Link from 'next/link'
import { SearchX } from 'lucide-react'

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string | null
  actionHref?: string | null
}

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="panel flex flex-col items-center gap-4 px-6 py-12 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
        <SearchX className="size-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black tracking-tight">{title}</h2>
        <p className="max-w-xl leading-7 text-[var(--color-text-muted)]">{description}</p>
      </div>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="rounded-full border border-[var(--color-border-strong)] px-5 py-3 font-semibold"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}
