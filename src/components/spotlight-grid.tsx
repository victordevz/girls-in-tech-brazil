'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CreatorCard } from '@/components/creator-card'
import { staggerContainer, fadeSlideUp } from '@/lib/motion-variants'
import type { CreatorSummary } from '@/lib/discovery'

const SPOTLIGHT_LIMIT = 6
const FEATURED_SPOTLIGHT_COUNT = 2
const SPOTLIGHT_SEED_KEY = 'girls-in-tech-spotlight-seed'

type SpotlightGridProps = {
  creators: CreatorSummary[]
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

function shuffleWithSeed<T>(items: T[], seed: number) {
  const random = createSeededRandom(Math.floor(seed * 0xffffffff))
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1))
    const temp = shuffled[index]
    shuffled[index] = shuffled[randomIndex]
    shuffled[randomIndex] = temp
  }

  return shuffled
}

function buildHybridSpotlight(creators: CreatorSummary[], seed: number) {
  const featured = creators.filter((creator) => creator.featured)
  const nonFeatured = creators.filter((creator) => !creator.featured)
  const random = createSeededRandom(Math.floor(seed * 0xffffffff))

  const selectedFeatured = shuffleWithSeed(featured, random()).slice(
    0,
    Math.min(FEATURED_SPOTLIGHT_COUNT, featured.length),
  )
  const remainingSlots = SPOTLIGHT_LIMIT - selectedFeatured.length
  const selectedNonFeatured = shuffleWithSeed(nonFeatured, random()).slice(
    0,
    Math.min(remainingSlots, nonFeatured.length),
  )

  const selectedSlugs = new Set(
    [...selectedFeatured, ...selectedNonFeatured].map((creator) => creator.slug),
  )
  const fallbackPool = creators.filter((creator) => !selectedSlugs.has(creator.slug))
  const fallback = shuffleWithSeed(fallbackPool, random()).slice(
    0,
    Math.max(SPOTLIGHT_LIMIT - selectedFeatured.length - selectedNonFeatured.length, 0),
  )

  return shuffleWithSeed(
    [...selectedFeatured, ...selectedNonFeatured, ...fallback],
    random(),
  ).slice(0, SPOTLIGHT_LIMIT)
}

function getSessionSeed() {
  try {
    const storedSeed = window.sessionStorage.getItem(SPOTLIGHT_SEED_KEY)
    if (storedSeed) {
      const parsedSeed = Number(storedSeed)
      if (Number.isFinite(parsedSeed) && parsedSeed >= 0 && parsedSeed < 1) {
        return parsedSeed
      }
    }

    const nextSeed = Math.random()
    window.sessionStorage.setItem(SPOTLIGHT_SEED_KEY, String(nextSeed))
    return nextSeed
  } catch {
    return Math.random()
  }
}

export function SpotlightGrid({ creators }: SpotlightGridProps) {
  const [spotlightCreators, setSpotlightCreators] = useState(() =>
    creators.slice(0, SPOTLIGHT_LIMIT),
  )

  useEffect(() => {
    const seed = getSessionSeed()
    setSpotlightCreators(buildHybridSpotlight(creators, seed))
  }, [creators])

  return (
    <motion.div
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {spotlightCreators.map((creator) => (
        <motion.div key={creator.slug} variants={fadeSlideUp}>
          <CreatorCard creator={creator} />
        </motion.div>
      ))}
    </motion.div>
  )
}
