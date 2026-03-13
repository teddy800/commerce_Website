import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ToastContainer } from '@/components/common/Toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'Card Game Store - Buy Premium Card Games',
  description: 'Discover and purchase the best card games. Fast shipping, great prices, and excellent customer service.',
  keywords: 'card games, board games, party games, card game store',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cardgamestore.com',
    siteName: 'Card Game Store',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@cardgamestore',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}
