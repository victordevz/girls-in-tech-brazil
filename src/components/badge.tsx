import { cn } from '@/lib/cn'

type BadgeVariant = 'solid' | 'subtle' | 'outline' | 'featured'

type BadgeProps = {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'subtle', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold tracking-tight',
        variant === 'solid' &&
          'text-white',
        variant === 'subtle' &&
          'border border-[var(--color-brand-200)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)]',
        variant === 'outline' &&
          'border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-base)]',
        variant === 'featured' &&
          'border border-[var(--color-gold-400)] bg-[var(--color-gold-100)] text-[var(--color-gold-700)]',
        className,
      )}
      style={
        variant === 'solid'
          ? {
              background: 'linear-gradient(135deg, #7c3aed, #f43f5e)',
              border: 'none',
            }
          : undefined
      }
    >
      {children}
    </span>
  )
}
