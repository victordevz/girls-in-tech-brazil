'use client'

import { useState, useEffect, useRef } from 'react'
import { Pause, Play } from 'lucide-react'
import { Avatar } from '@/components/avatar'
import type { AvatarFallback } from '@/lib/avatar'
import { cn } from '@/lib/cn'

// ─── Public types ─────────────────────────────────────────────────────────────

export type CreatorsGridShowcaseCreator = {
  name: string
  imageUrl?: string | null
  fallback: AvatarFallback
}

// ─── Decorative shapes (dark-palette, harmonises with #0f0723 hero bg) ─────────

function StripedCircle({ v }: { v: number }) {
  const fg = ['#c4b5fd', '#2dd4bf'][v % 2]
  return (
    <div
      className="size-full rounded-full"
      style={{
        background: `repeating-linear-gradient(45deg, ${fg} 0px, ${fg} 3px, #0f0723 3px, #0f0723 14px)`,
      }}
    />
  )
}

function StripedRect({ v }: { v: number }) {
  const fg = ['#3b82f6', '#a78bfa'][v % 2]
  return (
    <div
      className="size-full rounded-2xl"
      style={{
        background: `repeating-linear-gradient(0deg, ${fg} 0px, ${fg} 3px, #0a1628 3px, #0a1628 14px)`,
      }}
    />
  )
}

function DottedRect({ v }: { v: number }) {
  const bg  = ['#0a1628', '#110a2a', '#0a1221'][v % 3]
  const dot = ['#f59e0b', '#6366f1', '#64748b'][v % 3]
  return (
    <div
      className="size-full rounded-2xl"
      style={{
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle, ${dot} 2.5px, transparent 2.5px)`,
        backgroundSize: '14px 14px',
        backgroundPosition: '7px 7px',
      }}
    />
  )
}

function DottedCircle({ v }: { v: number }) {
  const bg  = ['#0f172a', '#0d0a1e'][v % 2]
  const dot = ['#475569', '#7c3aed'][v % 2]
  return (
    <div
      className="size-full rounded-full"
      style={{
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle, ${dot} 2px, transparent 2px)`,
        backgroundSize: '12px 12px',
        backgroundPosition: '6px 6px',
      }}
    />
  )
}

function SolidCircle({ v }: { v: number }) {
  const color = ['#06b6d4', '#3b82f6'][v % 2]
  return (
    <div
      className="size-full rounded-full"
      style={{ backgroundColor: color }}
    />
  )
}

function SolidSquare({ v }: { v: number }) {
  const color = ['#4f46e5', '#1e1b4b'][v % 2]
  return (
    <div
      className="size-full rounded-2xl"
      style={{ backgroundColor: color }}
    />
  )
}

// ─── Static 4×4 grid definition (16 cells: 6 photo + 10 deco) ────────────────

type PhotoCellDef = { type: 'photo'; startOffset: number }
type DecoCellDef  = {
  type: 'deco'
  shape:
    | 'striped-circle'
    | 'striped-rect'
    | 'dotted-rect'
    | 'dotted-circle'
    | 'solid-circle'
    | 'solid-square'
  v: number
}
type CellDef = PhotoCellDef | DecoCellDef

const GRID: CellDef[] = [
  { type: 'deco',  shape: 'striped-circle', v: 0 },
  { type: 'photo', startOffset: 0           },
  { type: 'deco',  shape: 'dotted-rect',    v: 0 },
  { type: 'photo', startOffset: 4           },
  { type: 'photo', startOffset: 8           },
  { type: 'deco',  shape: 'solid-circle',   v: 0 },
  { type: 'photo', startOffset: 12          },
  { type: 'deco',  shape: 'solid-square',   v: 0 },
  { type: 'deco',  shape: 'dotted-rect',    v: 1 },
  { type: 'photo', startOffset: 16          },
  { type: 'deco',  shape: 'dotted-circle',  v: 0 },
  { type: 'deco',  shape: 'striped-rect',   v: 0 },
  { type: 'deco',  shape: 'striped-circle', v: 1 },
  { type: 'deco',  shape: 'solid-circle',   v: 1 },
  { type: 'photo', startOffset: 20          },
  { type: 'deco',  shape: 'solid-square',   v: 1 },
]

// ─── Photo slot — fixed container, content fades in/out ──────────────────────

type PhotoSlotProps = {
  creators: CreatorsGridShowcaseCreator[]
  startOffset: number
  isPaused: boolean
}

function PhotoSlot({ creators, startOffset, isPaused }: PhotoSlotProps) {
  const [index, setIndex] = useState(() =>
    startOffset % Math.max(creators.length, 1),
  )
  const [visible, setVisible] = useState(true)
  const errorSwapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (errorSwapTimerRef.current) {
        clearTimeout(errorSwapTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setVisible(true)
    if (isPaused || creators.length <= 1) return

    // Each slot gets a unique show duration (3.2 – 5.0 s) for organic feel
    const showDuration = 3200 + (startOffset % 7) * 257

    let swapTimer: ReturnType<typeof setTimeout> | undefined
    const showTimer = setTimeout(() => {
      setVisible(false)
      swapTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % creators.length)
      }, 700)
    }, showDuration)

    return () => {
      clearTimeout(showTimer)
      if (swapTimer !== undefined) {
        clearTimeout(swapTimer)
      }
    }
  }, [index, isPaused, creators.length, startOffset])

  if (creators.length === 0) return null
  const c = creators[index]

  // If a URL fails to load (e.g. hotlink protection), silently skip to the
  // next creator so the slot never stays on an initials fallback.
  function handleError() {
    setVisible(false)
    if (errorSwapTimerRef.current) {
      clearTimeout(errorSwapTimerRef.current)
    }
    errorSwapTimerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % creators.length)
      errorSwapTimerRef.current = null
    }, 300)
  }

  return (
    <div
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}
    >
      <Avatar
        key={c.name}
        name={c.name}
        imageUrl={c.imageUrl}
        fallback={c.fallback}
        size="xl"
        shape="circle"
        onImageError={handleError}
      />
    </div>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────

type Props = {
  creators: CreatorsGridShowcaseCreator[]
  className?: string
}

export function CreatorsGridShowcase({ creators, className }: Props) {
  const [isPaused, setIsPaused] = useState(false)

  // Distribute creators into exclusive per-slot pools so two slots can never
  // show the same person at the same time (round-robin by creator index).
  const NUM_PHOTO_SLOTS = GRID.filter((c) => c.type === 'photo').length
  const slotPools = Array.from({ length: NUM_PHOTO_SLOTS }, (_, slotIdx) =>
    creators.filter((_, creatorIdx) => creatorIdx % NUM_PHOTO_SLOTS === slotIdx),
  )

  let photoSlotCounter = 0

  return (
    <div className={cn('relative select-none', className)}>
      {/* Static 4×4 grid — positions are fixed, only photo content cycles */}
      <div
        className="grid grid-cols-4 grid-rows-4 place-items-center gap-3"
        aria-hidden="true"
      >
        {GRID.map((cell, i) => (
          <div
            key={i}
            className="flex size-[7.5rem] items-center justify-center"
          >
            {cell.type === 'photo' ? (
              <PhotoSlot
                creators={slotPools[photoSlotCounter++]}
                startOffset={cell.startOffset}
                isPaused={isPaused}
              />
            ) : (
              <div className="size-20" aria-hidden="true">
                {cell.shape === 'striped-circle' && <StripedCircle v={cell.v} />}
                {cell.shape === 'striped-rect'   && <StripedRect   v={cell.v} />}
                {cell.shape === 'dotted-rect'    && <DottedRect    v={cell.v} />}
                {cell.shape === 'dotted-circle'  && <DottedCircle  v={cell.v} />}
                {cell.shape === 'solid-circle'   && <SolidCircle   v={cell.v} />}
                {cell.shape === 'solid-square'   && <SolidSquare   v={cell.v} />}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pause / Resume */}
      <button
        onClick={() => setIsPaused((p) => !p)}
        aria-label={isPaused ? 'Retomar animação' : 'Pausar animação'}
        className="absolute bottom-4 right-4 flex cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        {isPaused ? <Play size={13} /> : <Pause size={13} />}
        {isPaused ? 'Retomar' : 'Pausar'}
      </button>
    </div>
  )
}
