'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeSlideUp } from '@/lib/motion-variants'
import { cn } from '@/lib/cn'

type SectionRevealProps = HTMLMotionProps<'section'> & {
  className?: string
  children: React.ReactNode
}

export function SectionReveal({ className, children, ...props }: SectionRevealProps) {
  return (
    <motion.section
      className={cn(className)}
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      {...props}
    >
      {children}
    </motion.section>
  )
}
