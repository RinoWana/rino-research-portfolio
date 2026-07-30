import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Rino Riyadi Wana, a quantitative finance graduate and aspiring investment analyst with a background in macro analysis, fundamental research, and systematic trading.',
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
      <div className="pt-32 pb-16 border-b border-[#D2D6E2] bg-[#F5F6FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-label mb-4">Researcher Profile</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1F35]">
            About
          </h1>
          <div className="gold-line mt-5" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Bio column (wider) */}
          <div className="lg:w-2/3 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#1A1F35] mb-1">
                Rino Riyadi Wana
              </h2>
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#2E3A7E] mb-6">
                Bachelor of Applied Mathematics · Aspiring Investment Analyst
              </p>
              <div className="h-px w-full bg-[#D2D6E2] mb-8" />
            </div>

            <div className="space-y-5 text-[#5D6478] leading-relaxed">
              <p>
                I am a fresh graduate with a Bachelor of Applied Mathematics degree,
                focused on quantitative finance. My coursework and thesis centered on
                building mathematical models for financial markets, and my main interest
                going forward is working as an investment analyst.
              </p>
              <p>
                For my thesis, I built a{' '}
                <strong className="text-[#1A1F35]">Hidden Markov Model</strong> system for
                detecting market regimes in cryptocurrency price data, then used it as the
                basis for a systematic trading strategy. The project covered model
                selection with information criteria such as AIC and BIC, a rolling window
                setup to keep the model from seeing future data, and backtesting against a
                buy and hold benchmark.
              </p>
              <p>
                Beyond the technical side, I am drawn to the work of an investment analyst:
                reading company fundamentals, tracking macro conditions, and forming a view
                on where value sits in a market. I want to combine the discipline of
                quantitative methods with the judgment that fundamental and macro analysis
                require.
              </p>
              <p>
                I am early in my career and treat that as something to build on. I am still
                developing my research habits, but I try to be clear about what a model can
                and cannot tell you, and I would rather present an uncertain but well
                reasoned view than a confident one that skips the caveats.
              </p>
            </div>

            {/* Research interests (hairline-separated list, not a grid) */}
            <div className="mt-10">
              <p className="section-label mb-2">Research Interests</p>
              <div>
                {researchInterests.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-3 py-3 border-b border-[#D2D6E2]"
                  >
                    <div className="w-1 h-1 bg-[#2E3A7E] rotate-45 shrink-0" />
                    <span className="text-[#5D6478] text-sm">{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-10 border-t border-[#D2D6E2]">
              <Link href="/research" className="btn-gold">
                View Research →
              </Link>
            </div>
          </div>

          {/* Skills sidebar (narrower) */}
          <div className="lg:w-1/3 space-y-8">
            {skills.map(({ category, items }) => (
              <div key={category}>
                <p className="section-label mb-4">{category}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[#5D6478] text-sm py-2 border-b border-[#D2D6E2]"
                    >
                      <div className="w-px h-3 bg-[#2E3A7E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact card */}
            <div className="p-6 border-l-2 border-[#2E3A7E] bg-[#F5F6FA] mt-8">
              <p className="section-label mb-4">Contact</p>
              <p className="text-[#5D6478] text-sm leading-relaxed mb-4">
                Open to research collaborations, academic discussions, and professional inquiries.
              </p>
              <a
                href="mailto:rinoriyadiwana.pm@gmail.com"
                className="block text-[#2E3A7E] text-sm hover:text-[#1A1F35] transition-colors mb-2"
              >
                rinoriyadiwana.pm@gmail.com →
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
      </main>

      <Footer />
    </>
  )
}
