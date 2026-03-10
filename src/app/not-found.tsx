'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/badge'
import { fadeSlideUp, scaleIn, staggerContainer } from '@/lib/motion-variants'

export default function NotFound() {
  return (
    <div className="page-shell section-gap flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div
        className="space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={scaleIn}>
          <Badge>Página não encontrada</Badge>
        </motion.div>

        <motion.p
          variants={scaleIn}
          className="text-[8rem] font-black leading-none tracking-tighter sm:text-[9rem]"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #f43f5e, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </motion.p>

        <motion.div variants={fadeSlideUp} className="space-y-3">
          <h1 className="text-2xl font-black tracking-tight">Essa página não existe ou foi movida</h1>
          <p className="mx-auto max-w-md leading-7 text-[var(--color-text-muted)]">
            Continue explorando as criadoras ou volte para o início.
          </p>
        </motion.div>

        <motion.div variants={fadeSlideUp} className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Ir para o início
          </Link>
          <Link
            href="/criadoras/"
            className="inline-flex items-center justify-center rounded-full border-2 border-[var(--color-brand-400)] px-5 py-3 font-semibold text-[var(--color-brand-700)] transition hover:bg-[var(--color-surface-muted)]"
          >
            Ver criadoras
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
