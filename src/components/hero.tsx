'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Users, BookOpen } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Badge } from '@/components/badge'
import { fadeSlideUp, fadeSlideLeft, staggerContainer } from '@/lib/motion-variants'

type HeroAction = {
  label: string
  href: string
}

type HeroProps = {
  eyebrow: string
  title: string
  description: string
  primaryAction: HeroAction
  secondaryAction?: HeroAction
}

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: HeroProps) {
  const { scrollY } = useScroll()

  // Parallax: blobs drift at different speeds as page scrolls
  const blobVioletY = useTransform(scrollY, [0, 400], [0, -70])
  const blobRoseY    = useTransform(scrollY, [0, 400], [0, -35])
  const blobVioletSmoothed = useSpring(blobVioletY, { stiffness: 60, damping: 18 })
  const blobRoseSmoothed   = useSpring(blobRoseY,   { stiffness: 60, damping: 18 })

  const words = title.split(' ')
  const static1 = words.slice(0, 4).join(' ')
  const animated = words.slice(4).join(' ')

  return (
    <section className="section-gap relative overflow-hidden">
      {/* Parallax blobs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-35 blur-3xl animate-float"
        style={{
          background: 'radial-gradient(circle, #a78bfa, transparent)',
          y: blobVioletSmoothed,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-12 h-72 w-72 rounded-full opacity-25 blur-3xl animate-float-slow"
        style={{
          background: 'radial-gradient(circle, #fb7185, transparent)',
          y: blobRoseSmoothed,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #fbbf24, transparent)' }}
      />

      <div className="panel relative overflow-hidden px-6 py-8 sm:px-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          {/* Left — staggered entrance */}
          <motion.div
            className="space-y-7"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeSlideUp}>
              <Badge className="w-fit">{eyebrow}</Badge>
            </motion.div>

            <motion.div variants={fadeSlideUp} className="space-y-4">
              <h1 className="text-balance text-4xl font-black tracking-tight text-[var(--color-text-base)] sm:text-5xl lg:text-6xl">
                {static1}{' '}
                <span className="headline-gradient">{animated}</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
                {description}
              </p>
            </motion.div>

            <motion.div variants={fadeSlideUp} className="flex flex-col gap-3 sm:flex-row">
              <Link href={primaryAction.href} className="btn-primary">
                {primaryAction.label}
                <ArrowRight className="size-4" />
              </Link>
              {secondaryAction ? (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center justify-center rounded-full border-2 border-[var(--color-brand-400)] px-5 py-3 font-semibold text-[var(--color-brand-700)] transition hover:bg-[var(--color-surface-muted)]"
                >
                  {secondaryAction.label}
                </Link>
              ) : null}
            </motion.div>
          </motion.div>

          {/* Right panel — value props, slides in from right */}
          <motion.div
            variants={fadeSlideLeft}
            initial="hidden"
            animate="visible"
            className="grid gap-5 rounded-[2rem] p-6 text-white shadow-[var(--shadow-soft)]"
            style={{ background: 'linear-gradient(145deg, #2e1065 0%, #6d28d9 60%, #be185d 100%)' }}
          >
            <p className="eyebrow" style={{ color: '#ddd6fe' }}>
              Por que faz diferença
            </p>
            <ul className="space-y-4">
              {[
                { Icon: Users,    title: 'Referências reais',       body: 'Mulheres que produzem conteúdo sobre programação, IA, dados, design e carreira no ecossistema tech brasileiro.' },
                { Icon: BookOpen, title: 'Para estudantes e profissionais', body: 'Encontre rapidamente quem ensina o que você quer aprender, com filtros por área e formato de conteúdo.' },
                { Icon: Sparkles, title: 'Projeto colaborativo',    body: 'Mantido pela comunidade via Pull Request. Conhece alguém que deveria estar aqui? Contribua.' },
              ].map(({ Icon, title: t, body }, i) => (
                <motion.li
                  key={t}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="font-bold">{t}</p>
                    <p className="mt-1 text-sm leading-6 text-white/72">{body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
