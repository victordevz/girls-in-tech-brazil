# UI and Motion Guide

## Design system

- System name: **Pulso BR Tech**
- Palette: violet, rose, gold, light base
- Typography: Outfit via `next/font/google` and `--font-outfit`
- Theme tokens and effects are defined in `src/styles/globals.css` (`@theme` block)

## UI architecture

- Route shell and metadata: `src/app/layout.tsx`
- UI components: `src/components/`
- Utility styling helpers: `src/lib/cn.ts`

Prefer changing existing components and patterns instead of introducing parallel styles.

## Motion architecture

- Shared motion variants: `src/lib/motion-variants.ts`
- Count-up behavior: `src/hooks/use-count-up.ts`
- Scroll-related components:
  - `src/components/scroll-progress.tsx`
  - `src/components/section-reveal.tsx`

All client-side motion lives in `'use client'` components.
Server components should remain animation-free.

## UX guardrails

- Keep layout responsive and readable across mobile, tablet, desktop
- Preserve visible focus states and keyboard reachability
- Avoid introducing new visual styles that conflict with Pulso BR Tech
