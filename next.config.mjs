import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.tsx',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/en/:path*', destination: '/:path*' },
      { source: '/pt/:path*', destination: '/:path*' },
    ];
  },
}

export default withNextra(nextConfig)
