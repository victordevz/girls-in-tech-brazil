import type { LucideIcon } from 'lucide-react'
import {
  BookOpenText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Mic2,
  Play,
  Twitter,
} from 'lucide-react'
import type { ContentType } from '@/schemas/creator.schema'

type ContentTypeMeta = {
  label: string
  icon: LucideIcon
}

export const CONTENT_TYPE_META: Record<ContentType, ContentTypeMeta> = {
  youtube: { label: 'YouTube', icon: Play },
  instagram: { label: 'Instagram', icon: Instagram },
  linkedin: { label: 'LinkedIn', icon: Linkedin },
  github: { label: 'GitHub', icon: Github },
  website: { label: 'Website', icon: Globe },
  blog: { label: 'Blog', icon: BookOpenText },
  podcast: { label: 'Podcast', icon: Mic2 },
  newsletter: { label: 'Newsletter', icon: Mail },
  twitter: { label: 'Twitter', icon: Twitter },
}

export function getContentTypeLabel(type: ContentType) {
  return CONTENT_TYPE_META[type].label
}
