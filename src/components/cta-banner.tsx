'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { scaleIn } from '@/lib/motion-variants'

type CtaBannerProps = {
  title: string
  description: string
  actionLabel: string
  actionHref: string
}

export function CtaBanner({ title, description, actionLabel, actionHref }: CtaBannerProps) {
  return (
    <section className="section-gap pt-0">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative overflow-hidden rounded-[2rem] px-6 py-10 text-white shadow-[var(--shadow-card)] sm:px-10"
        style={{
          background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 45%, #be185d 100%)',
        }}
      >
        {/* Decorative dot pattern overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow" style={{ color: '#ddd6fe' }}>
              Amplie o mapa
            </p>
            <h2 className="text-3xl font-black tracking-tight">{title}</h2>
            <p className="max-w-2xl leading-7 text-white/80">{description}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href={actionHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-[var(--color-brand-700)] shadow-lg transition-all hover:shadow-xl"
            >
              {actionLabel}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
