/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
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
