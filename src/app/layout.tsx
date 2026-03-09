import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Girls in Tech Brazil',
    default: 'Girls in Tech Brazil',
  },
  description: 'Vitrine curada de mulheres referências na tecnologia brasileira.',
  metadataBase: new URL('https://glaucia86.github.io/girls-in-tech-brazil'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
