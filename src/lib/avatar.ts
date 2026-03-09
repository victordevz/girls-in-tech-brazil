const AVATAR_TONES = ['sun', 'ocean', 'forest', 'berry', 'sand'] as const

export type AvatarTone = (typeof AVATAR_TONES)[number]

export type AvatarFallback = {
  initials: string
  tone: AvatarTone
}

function normalizeName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

export function getAvatarInitials(name: string) {
  const parts = normalizeName(name)

  if (parts.length === 0) {
    return '?'
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase()
}

export function getAvatarTone(name: string): AvatarTone {
  const hash = Array.from(name).reduce((total, character) => total + character.charCodeAt(0), 0)
  return AVATAR_TONES[hash % AVATAR_TONES.length]
}

export function getAvatarFallback(name: string): AvatarFallback {
  return {
    initials: getAvatarInitials(name),
    tone: getAvatarTone(name),
  }
}
