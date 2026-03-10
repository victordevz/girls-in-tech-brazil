'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/use-count-up'
import { fadeSlideLeft, scaleIn, staggerContainer } from '@/lib/motion-variants'

type Metric = {
  label: string
  value: string
  description: string
}

type StatsBannerProps = {
  title: string
  description: string
  metrics: Metric[]
}

function AnimatedMetricCard({ metric, index }: { metric: Metric; index: number }) {
  // Parse numeric part (e.g. "19" from "19" or "12" from "12")
  const numericValue = parseInt(metric.value, 10)
  const isNumeric = !isNaN(numericValue)
  const { count, ref } = useCountUp(isNumeric ? numericValue : 0)

  return (
    <motion.article
      variants={scaleIn}
      custom={index}
      className="rounded-[1.5rem] p-5 text-white"
      style={{
        background: 'linear-gradient(145deg, #2e1065 0%, #6d28d9 100%)',
        boxShadow: '0 8px 32px rgba(109,40,217,0.25)',
      }}
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <p
        ref={isNumeric ? (ref as React.RefObject<HTMLParagraphElement>) : undefined}
        className="text-4xl font-black tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #ddd6fe, #fb7185)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {isNumeric ? count : metric.value}
      </p>
      <h3 className="mt-3 font-semibold">{metric.label}</h3>
      <p className="mt-2 text-sm leading-6 text-white/70">{metric.description}</p>
    </motion.article>
  )
}

export function StatsBanner({ title, description, metrics }: StatsBannerProps) {
  return (
    <section className="section-gap pt-0">
      <div className="panel px-6 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            className="space-y-3"
            variants={fadeSlideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="eyebrow">Impacto da comunidade</p>
            <h2 className="text-3xl font-black tracking-tight">{title}</h2>
            <p className="max-w-xl leading-7 text-[var(--color-text-muted)]">{description}</p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {metrics.map((metric, i) => (
              <AnimatedMetricCard key={metric.label} metric={metric} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
