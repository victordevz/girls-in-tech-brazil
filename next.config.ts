import type { NextConfig } from 'next'

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProduction ? '/girls-in-tech-brazil' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
