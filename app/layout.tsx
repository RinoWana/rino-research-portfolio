import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Rino Riyadi Wana Research',
    template: '%s | Rino Riyadi Wana Research',
  },
  description:
    'Quantitative research in financial technology, computational finance, and algorithmic trading.',
  keywords: ['quantitative finance', 'research', 'financial technology', 'algorithmic trading'],
  authors: [{ name: 'Rino Riyadi Wana' }],
  openGraph: {
    type: 'website',
    siteName: 'Rino Riyadi Wana Research',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0603] text-[#F5EBD8] antialiased">
        {children}
      </body>
    </html>
  )
}
