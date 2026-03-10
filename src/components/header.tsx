'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { cn } from '@/lib/cn'

const NAV_ITEMS = [
  { href: '/', label: 'Início' },
  { href: '/criadoras/', label: 'Criadoras' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/contribuir/', label: 'Contribuir' },
]

export function Header() {
  const currentPath = usePathname()
  const { scrollY } = useScroll()
  const shadowAlpha = useTransform(scrollY, [0, 80], [0, 0.12])
  const headerShadow = useMotionTemplate`0 4px 32px rgba(109,40,217,${shadowAlpha})`

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-[var(--color-border-soft)] bg-[rgba(253,252,255,0.88)] backdrop-blur-xl"
      style={{ boxShadow: headerShadow }}
    >
      <div className="page-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <motion.span
            className="flex size-11 items-center justify-center rounded-2xl text-lg font-black text-white"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #f43f5e)',
              boxShadow: '0 4px 14px rgba(139,92,246,0.40)',
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            GT
          </motion.span>
          <div className="space-y-0.5">
            <p
              className="text-sm font-black uppercase tracking-[0.18em]"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #f43f5e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Girls in Tech Brazil
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Criadoras brasileiras de conteúdos sobre tecnologia
            </p>
          </div>
        </Link>
        <nav aria-label="Primária" className="flex flex-wrap gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.href.replace(/\/$/, ''))

            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-[var(--color-text-base)] hover:bg-[var(--color-surface-muted)]',
                  )}
                  style={
                    isActive
                      ? {
                          background: 'linear-gradient(135deg, #7c3aed, #f43f5e)',
                          boxShadow: '0 2px 12px rgba(139,92,246,0.30)',
                        }
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              </motion.div>
            )
          })}
        </nav>
      </div>
    </motion.header>
  )
}
