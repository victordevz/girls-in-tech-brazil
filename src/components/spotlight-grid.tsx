'use client'

import { motion } from 'framer-motion'
import { CreatorCard } from '@/components/creator-card'
import { staggerContainer, fadeSlideUp } from '@/lib/motion-variants'
import type { CreatorSummary } from '@/lib/discovery'

type SpotlightGridProps = {
  creators: CreatorSummary[]
}

export function SpotlightGrid({ creators }: SpotlightGridProps) {
  return (
    <motion.div
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {creators.map((creator) => (
        <motion.div key={creator.slug} variants={fadeSlideUp}>
          <CreatorCard creator={creator} />
        </motion.div>
      ))}
    </motion.div>
  )
}
