import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Rino Riyadi Wana Research',
    template: '%s | Rino Riyadi Wana Research',
  },
  description:
    'Quantitative finance graduate and aspiring investment analyst writing on macro analysis, fundamental investing, market flow, and systematic trading.',
  keywords: ['macro research', 'fundamental analysis', 'market flow', 'systematic trading', 'finance research'],
  authors: [{ name: 'Rino Riyadi Wana' }],
  openGraph: {
    type: 'website',
    siteName: 'Rino Riyadi Wana Research',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#1A1F35] antialiased">
        {children}
      </body>
    </html>
  )
}
