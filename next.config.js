/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV = 'development'

const nextConfig = {
    output: "export",
    basePath: isDev ? '' : '/tarikle',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'cdn.7tv.app',
            },
            {
              protocol: 'https',
              hostname: 'i.ytimg.com',
            },
            {
              protocol: 'https',
              hostname: 'img.buymeacoffee.com',
            },
          ],
    },
}

module.exports = nextConfig
