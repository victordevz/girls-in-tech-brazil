'use client'

import { useState } from 'react'

type ShareButtonProps = {
  creatorName: string
}

export function ShareButton({ creatorName }: ShareButtonProps) {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)

  async function handleShare() {
    const shareUrl = window.location.href
    const shareTitle = `${creatorName} · Girls in Tech Brazil`

    setIsSharing(true)

    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        })
        setFeedback('Link compartilhado com sucesso.')
        return
      }

      await navigator.clipboard.writeText(shareUrl)
      setFeedback('Link copiado para a área de transferência.')
    } catch {
      setFeedback('Não foi possível compartilhar agora.')
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => {
          void handleShare()
        }}
        disabled={isSharing}
        aria-label={`Compartilhar perfil de ${creatorName}`}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-white px-4 py-2 text-sm font-semibold shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--color-brand-300)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSharing ? 'Compartilhando...' : 'Compartilhar'}
      </button>
      {feedback ? <p className="text-sm text-[var(--color-text-muted)]">{feedback}</p> : null}
    </div>
  )
}
