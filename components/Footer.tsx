import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0D0905] border-t border-[#2E2018] mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#2E2018]">

          {/* Brand */}
          <div>
            <div className="font-serif text-xl font-semibold text-[#F5EBD8] mb-1">
              Rino Riyadi Wana
            </div>
            <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A84C] font-medium mb-4">
              Research
            </div>
            <p className="text-[#7A6050] text-sm leading-relaxed">
              Independent research spanning macro analysis, fundamental deep-dives,
              market flow, and systematic trading strategies.
            </p>
          </div>

          {/* Quick links */}
          <div>
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
                    className="text-[#7A6050] hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label mb-5">Contact</p>
            <p className="text-[#7A6050] text-sm leading-relaxed">
              For research inquiries, collaborations, or correspondence, please reach out via
              email or LinkedIn.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href="mailto:rinoriyadiwana.pm@gmail.com"
                className="block text-[#C9A84C] text-sm hover:text-[#E8C87A] transition-colors"
              >
                rinoriyadiwana.pm@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/rino-riyadi-wana-356336254"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#C9A84C] text-sm hover:text-[#E8C87A] transition-colors"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#7A6050] text-xs tracking-wide">
            © {year} Rino Riyadi Wana Research. All rights reserved.
          </p>
          <p className="text-[#7A6050] text-xs tracking-wide">
            Macro · Fundamental · Flow · Systematic Trading
          </p>
        </div>
      </div>
    </footer>
  )
}
