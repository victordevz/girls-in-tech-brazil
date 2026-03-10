import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import '@/styles/globals.css'
import { Footer, Header, ScrollProgress } from '@/components'
import { SITE_ORIGIN } from '@/lib/site'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Girls in Tech Brazil',
    default: 'Girls in Tech Brazil | Criadoras brasileiras de conteúdos sobre tecnologia',
  },
  description:
    'Descubra as criadoras brasileiras de conteúdos sobre tecnologia com uma vitrine curada, filtros por categoria e perfis editoriais.',
  metadataBase: SITE_ORIGIN,
  openGraph: {
    title: 'Girls in Tech Brazil',
    description:
      'Descubra as criadoras brasileiras de conteúdos sobre tecnologia com uma vitrine curada.',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-brand-600)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Pular para o conteúdo principal
        </a>
        {/* Organic background — morphing blobs themed on BR tech voices */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="aurora-apex" />
          <div className="bg-blob bg-blob-violet" />
          <div className="bg-blob bg-blob-rose" />
          <div className="bg-blob bg-blob-gold" />
        </div>
        <ScrollProgress />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
