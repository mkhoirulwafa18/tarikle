import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/ui/analytics'

const inter = Poppins({ weight: ['200', '500', '800'], subsets: ['latin'], variable: "--font-inter" })

export const metadata: Metadata = {
  title: 'Tarikle',
  description: "Go guess the timeline of those Tarik's yt videos & thumbnails",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={[inter.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined}`}>
        {children}
      </body>
    </html>
  )
}
