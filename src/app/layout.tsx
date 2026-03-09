import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import '@/styles/globals.css'
import { Footer, Header, ScrollProgress } from '@/components'

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
  metadataBase: new URL('https://glaucia86.github.io/girls-in-tech-brazil'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <body className="flex min-h-screen flex-col">
        {/* Organic background — morphing blobs themed on BR tech voices */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="aurora-apex" />
          <div className="bg-blob bg-blob-violet" />
          <div className="bg-blob bg-blob-rose" />
          <div className="bg-blob bg-blob-gold" />
        </div>
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
