const DEFAULT_SITE_URL = 'https://bullas.github.io/girls-in-tech-brazil'

const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

export const SITE_URL =
  envSiteUrl && /^https?:\/\//i.test(envSiteUrl)
    ? envSiteUrl.replace(/\/+$/, '')
    : DEFAULT_SITE_URL

export const SITE_ORIGIN = new URL(`${SITE_URL}/`)
