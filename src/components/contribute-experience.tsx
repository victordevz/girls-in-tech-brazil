'use client'

import Link from 'next/link'
import { ArrowUpRight, Sparkles, CircleHelp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/badge'
import { fadeSlideUp, scaleIn, staggerContainer } from '@/lib/motion-variants'

type ContributeStep = {
  title: string
  description: string
}

type ContributeFaq = {
  question: string
  answer: string
}

type ContributeExperienceProps = {
  steps: ContributeStep[]
  faq: ContributeFaq[]
}

export function ContributeExperience({ steps, faq }: ContributeExperienceProps) {
  return (
    <div className="page-shell section-gap space-y-8">
      <motion.section
        className="panel relative space-y-5 overflow-hidden px-6 py-8 sm:px-8"
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.30), transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)' }}
        />
        <Badge>Contribuição guiada</Badge>
        <h1 className="headline-gradient text-4xl font-black tracking-tight">
          Contribua com o catálogo em cinco passos claros
        </h1>
        <p className="max-w-3xl leading-8 text-[var(--color-text-muted)]">
          O projeto cresce com colaboração da comunidade. Siga o fluxo abaixo para adicionar novas
          criadoras com consistência e revisão transparente.
        </p>
      </motion.section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <motion.div
          className="relative space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-5 top-10 w-px bg-gradient-to-b from-[var(--color-brand-400)] via-[var(--color-rose-400)] to-transparent"
          />
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              variants={fadeSlideUp}
              whileHover={{ x: 4, boxShadow: '0 22px 50px rgba(109,40,217,0.14)' }}
              className="panel relative flex gap-4 p-5"
            >
              <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] font-black text-[var(--color-text-inverse)] shadow-[0_10px_26px_rgba(109,40,217,0.35)]">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-black tracking-tight">{step.title}</h2>
                <p className="leading-7 text-[var(--color-text-base)]">{step.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.aside
          className="panel space-y-5 p-5"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="space-y-2">
            <p className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="size-4" />
              Referências úteis
            </p>
            <h2 className="text-2xl font-black tracking-tight">Tudo para abrir o PR sem fricção</h2>
            <p className="leading-7 text-[var(--color-text-muted)]">
              Use os links oficiais para seguir o fluxo de contribuição no repositório principal.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <motion.a
              href="https://github.com/Bullas/girls-in-tech-brazil/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white px-4 py-3 text-center font-semibold transition hover:bg-[var(--color-surface-subtle)]"
            >
              Abrir CONTRIBUTING.md
              <ArrowUpRight className="size-4" />
            </motion.a>
            <motion.a
              href="https://github.com/Bullas/girls-in-tech-brazil/compare"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="btn-primary"
            >
              Abrir um PR
              <ArrowUpRight className="size-4" />
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                href="/criadoras/"
                className="inline-flex w-full items-center justify-center rounded-full border px-4 py-3 text-center font-semibold transition hover:bg-[var(--color-surface-subtle)]"
              >
                Explorar catálogo atual
              </Link>
            </motion.div>
          </div>
        </motion.aside>
      </section>

      <motion.section
        className="panel space-y-5 p-5 sm:p-6"
        variants={fadeSlideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-tight">
          <CircleHelp className="size-5 text-[var(--color-brand-600)]" />
          FAQ
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {faq.map((item) => (
            <motion.article
              key={item.question}
              whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(124,58,237,0.14)' }}
              className="rounded-2xl border border-[var(--color-border-soft)] bg-white/70 p-4 transition"
            >
              <h3 className="font-semibold">{item.question}</h3>
              <p className="mt-2 leading-7 text-[var(--color-text-muted)]">{item.answer}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
