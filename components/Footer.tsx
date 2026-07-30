import Link from 'next/link'
import Wordmark from './Wordmark'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#F5F6FA] border-t border-[#D2D6E2] mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row gap-12 pb-12 border-b border-[#D2D6E2]">

          {/* Brand (wider column) */}
          <div className="md:w-[45%]">
            <Wordmark variant="dark" className="h-8 w-auto mb-4" />
            <p className="text-[#5D6478] text-sm leading-relaxed max-w-sm">
              Quantitative finance graduate writing on macro analysis, fundamental
              research, and systematic trading.
            </p>
          </div>

          {/* Quick links (narrow column) */}
          <div className="md:w-[20%]">
            <p className="section-label mb-5">Navigation</p>
            <ul className="space-y-3">
              {[
                { href: '/',         label: 'Home' },
                { href: '/research', label: 'Research' },
                { href: '/about',    label: 'About' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#5D6478] hover:text-[#2E3A7E] text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (remaining width) */}
          <div className="md:flex-1">
            <p className="section-label mb-5">Contact</p>
            <p className="text-[#5D6478] text-sm leading-relaxed">
              For research inquiries, collaborations, or correspondence, please reach out via
              email or LinkedIn.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href="mailto:rinoriyadiwana.pm@gmail.com"
                className="block text-[#2E3A7E] text-sm hover:text-[#1A1F35] transition-colors"
              >
                rinoriyadiwana.pm@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/rino-riyadi-wana-356336254"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#2E3A7E] text-sm hover:text-[#1A1F35] transition-colors"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#5D6478] text-xs tracking-wide">
            © {year} Rino Riyadi Wana Research. All rights reserved.
          </p>
          <p className="text-[#5D6478] text-xs tracking-wide">
            Macro · Fundamental · Flow · Systematic Trading
          </p>
        </div>
      </div>
    </footer>
  )
}
