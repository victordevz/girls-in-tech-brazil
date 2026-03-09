'use client'

import { useDeferredValue, useEffect, useState, useTransition } from 'react'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type SearchBarProps = {
  initialValue: string
}

export function SearchBar({ initialValue }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(initialValue)
  const deferredValue = useDeferredValue(value)
  const [, startTransition] = useTransition()

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      const normalizedDeferredValue = deferredValue.trim()
      const currentQuery = searchParams.get('q')?.trim() ?? ''

      if (normalizedDeferredValue === currentQuery) {
        return
      }

      if (normalizedDeferredValue) {
        params.set('q', normalizedDeferredValue)
      } else {
        params.delete('q')
      }

      params.delete('page')
      const queryString = params.toString()
      const nextHref = queryString ? `${pathname}?${queryString}` : pathname

      startTransition(() => {
        router.replace(nextHref, { scroll: false })
      })
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [deferredValue, pathname, router, searchParams, startTransition])

  return (
    <label className="flex items-center gap-3 rounded-[1.25rem] border-2 border-[var(--color-border-soft)] bg-white px-4 py-3 shadow-[var(--shadow-soft)] transition-colors focus-within:border-[var(--color-brand-500)] focus-within:shadow-[0_0_24px_rgba(139,92,246,0.15)]">
      <Search className="size-4 text-[var(--color-brand-500)]" />
      <span className="sr-only">Buscar criadoras</span>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Busque por nome, headline, categoria ou tag"
        className="w-full border-none bg-transparent text-sm text-[var(--color-text-base)] outline-none placeholder:text-[var(--color-text-muted)]"
      />
    </label>
  )
}
