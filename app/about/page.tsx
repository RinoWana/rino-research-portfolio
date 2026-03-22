import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Rino Riyadi Wana — researcher in macro, fundamental analysis, market flow, and systematic trading.',
}

const researchInterests = [
  'Macro Analysis & Global Market Dynamics',
  'Fundamental Valuation & Equity Research',
  'Market Flow & Liquidity Dynamics',
  'Systematic & Algorithmic Trading',
  'Market Regime Detection (HMM)',
  'Cryptocurrency & Digital Assets',
]

const skills = [
  { category: 'Macro & Fundamental', items: ['Top-down Macro Analysis', 'Fundamental Valuation', 'Sector Rotation', 'Flow Analysis'] },
  { category: 'Systematic',         items: ['HMM / State Space Models', 'Time Series Analysis', 'Backtesting', 'Portfolio Optimization'] },
  { category: 'Tools',              items: ['Python', 'R', 'NumPy / Pandas', 'hmmlearn / scikit-learn'] },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-16 border-b border-[#2E2018] bg-[#0D0905]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-label mb-4">Researcher Profile</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#F5EBD8]">
            About
          </h1>
          <div className="gold-line mt-5" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Bio column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#F5EBD8] mb-1">
                Rino Riyadi Wana
              </h2>
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A84C] mb-6">
                Independent Researcher
              </p>
              <div className="h-px w-full bg-[#2E2018] mb-8" />
            </div>

            <div className="space-y-5 text-[#BFA888] leading-relaxed">
              <p>
                I am an independent researcher with a broad view of financial markets —
                drawing from macro economics, fundamental analysis, market flow dynamics,
                and systematic trading methodologies. I believe markets are best understood
                through multiple lenses, not a single framework.
              </p>
              <p>
                My work ranges from top-down macro analysis and global capital flows to
                bottom-up fundamental valuation, alongside quantitative research such as
                using <strong className="text-[#F5EBD8]">Hidden Markov Models</strong> for
                detecting market regimes — always with an eye toward practical application.
              </p>
              <p>
                I am drawn to the intersection of conventional investment thinking and
                systematic methods — where macro narratives meet data-driven evidence,
                and where flow dynamics reveal what price alone cannot.
              </p>
              <p>
                Committed to intellectual honesty: presenting both what the data supports
                and where uncertainty remains. Good research acknowledges its own limitations.
              </p>
            </div>

            {/* Research interests */}
            <div className="mt-10">
              <p className="section-label mb-5">Research Interests</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {researchInterests.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-3 p-4 border border-[#2E2018] hover:border-[rgba(201,168,76,0.3)] transition-colors"
                  >
                    <div className="w-1 h-1 bg-[#C9A84C] rotate-45 shrink-0" />
                    <span className="text-[#BFA888] text-sm">{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-10 border-t border-[#2E2018]">
              <Link href="/research" className="btn-gold">
                View Research <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Skills sidebar */}
          <div className="space-y-8">
            {skills.map(({ category, items }) => (
              <div key={category}>
                <p className="section-label mb-4">{category}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[#BFA888] text-sm py-2 border-b border-[#2E2018]"
                    >
                      <div className="w-px h-3 bg-[#C9A84C]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact card */}
            <div className="p-6 border border-[rgba(201,168,76,0.2)] bg-[#140D08] mt-8">
              <p className="section-label mb-4">Contact</p>
              <p className="text-[#7A6050] text-sm leading-relaxed mb-4">
                Open to research collaborations, academic discussions, and professional inquiries.
              </p>
              <a
                href="mailto:rinoriyadiwana.pm@gmail.com"
                className="block text-[#C9A84C] text-sm hover:text-[#E8C87A] transition-colors mb-2"
              >
                rinoriyadiwana.pm@gmail.com →
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
      </main>

      <Footer />
    </>
  )
}
