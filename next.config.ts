import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/girls-in-tech-brazil',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
