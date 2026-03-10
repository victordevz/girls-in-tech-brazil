'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { AvatarFallback } from '@/lib/avatar'

type AvatarProps = {
  name: string
  imageUrl?: string | null
  fallback: AvatarFallback
  size?: 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'rounded' | 'circle'
  className?: string
}

const toneClassNames: Record<AvatarFallback['tone'], string> = {
  sun: 'bg-[linear-gradient(135deg,#fef3c7,#f59e0b)] text-[#78350f]',
  ocean: 'bg-[linear-gradient(135deg,#ede9fe,#8b5cf6)] text-[#2e1065]',
  forest: 'bg-[linear-gradient(135deg,#d7f4db,#4f8f62)] text-[#16351f]',
  berry: 'bg-[linear-gradient(135deg,#ffe4e6,#f43f5e)] text-[#4c0519]',
  sand: 'bg-[linear-gradient(135deg,#f5f3ff,#a78bfa)] text-[#2e1065]',
}

const sizeClassNames = {
  sm: 'size-12 text-sm',
  md: 'size-16 text-lg',
  lg: 'size-24 text-2xl',
  xl: 'size-32 text-3xl',
}

const shapeClassNames = {
  rounded: 'rounded-[1.6rem]',
  circle: 'rounded-full',
}

export function Avatar({
  name,
  imageUrl,
  fallback,
  size = 'md',
  shape = 'rounded',
  className,
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden border border-[var(--color-brand-200)] shadow-[var(--shadow-soft)]',
        shapeClassNames[shape],
        sizeClassNames[size],
        className,
      )}
    >
      {imageUrl && !imageFailed ? (
        // External avatar URLs are allowed by the dataset, so a plain img keeps the contract flexible.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            'flex h-full w-full items-center justify-center font-black tracking-[0.08em]',
            toneClassNames[fallback.tone],
          )}
        >
          {fallback.initials}
        </div>
      )}
    </div>
  )
}
