'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { CONTENT_TYPE_META } from '@/lib/content-types'
import { fadeSlideUp } from '@/lib/motion-variants'
import type { CreatorSummary } from '@/lib/discovery'

type CreatorCardProps = {
  creator: CreatorSummary
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 250, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 250, damping: 28 })

  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg'])

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.article
      className="panel group flex h-full flex-col gap-5 p-5"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      variants={fadeSlideUp}
      whileHover={{
        scale: 1.02,
        zIndex: 10,
        boxShadow: '0 32px 80px rgba(109,40,217,0.22)',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start gap-4">
        <Avatar
          name={creator.name}
          imageUrl={creator.avatarUrl}
          fallback={creator.avatarFallback}
          size="md"
        />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            {creator.featured ? <Badge variant="featured">✨ Destaque</Badge> : null}
            {creator.contentTypes.slice(0, 3).map((contentType) => {
              const Icon = CONTENT_TYPE_META[contentType].icon

              return (
                <Badge key={contentType} variant="outline" className="gap-1.5">
                  <Icon className="size-3.5" />
                  {CONTENT_TYPE_META[contentType].label}
                </Badge>
              )
            })}
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">{creator.name}</h3>
            <p className="mt-2 leading-7 text-[var(--color-text-muted)]">{creator.headline}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {creator.categories.map((category) => (
          <Badge key={category}>{category}</Badge>
        ))}
        {creator.hiddenCategoryCount > 0 ? (
          <Badge variant="outline">+{creator.hiddenCategoryCount}</Badge>
        ) : null}
      </div>
      <div className="mt-auto pt-2">
        <Link href={creator.profileHref} className="btn-profile-link">
          Ver perfil
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </motion.article>
  )
}
