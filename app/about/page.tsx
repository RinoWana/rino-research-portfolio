import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Rino Riyadi Wana — quantitative researcher in financial technology.',
}

const researchInterests = [
  'Hidden Markov Models & Regime Detection',
  'Algorithmic Trading Systems',
  'Cryptocurrency Market Microstructure',
  'Quantitative Risk Management',
  'Machine Learning in Finance',
  'Computational Finance',
]

const skills = [
  { category: 'Quantitative',  items: ['HMM / State Space Models', 'Time Series Analysis', 'Backtesting', 'Portfolio Optimization'] },
  { category: 'Programming',   items: ['Python', 'R', 'NumPy / Pandas', 'hmmlearn / scikit-learn'] },
  { category: 'Finance',       items: ['Derivatives', 'Market Microstructure', 'Technical Analysis', 'Factor Investing'] },
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
                Quantitative Researcher
              </p>
              <div className="h-px w-full bg-[#2E2018] mb-8" />
            </div>

            <div className="space-y-5 text-[#BFA888] leading-relaxed">
              <p>
                I am a quantitative researcher focused on the application of statistical models
                and machine learning techniques to financial markets. My work spans the intersection
                of applied mathematics, computer science, and financial economics.
              </p>
              <p>
                My current research explores the use of <strong className="text-[#F5EBD8]">
                Hidden Markov Models</strong> for detecting market regimes in cryptocurrency
                markets — specifically developing causal, forward-filtering approaches that
                prevent lookahead bias and can be deployed in live trading environments.
              </p>
              <p>
                I am committed to rigorous empirical methodology: every claim is backed by
                out-of-sample validation, proper benchmark comparison, and transparent
                reporting of both successes and limitations. Research that cannot be reproduced
                is not research.
              </p>
              <p>
                Beyond the technical, I am interested in how quantitative methods can be made
                more accessible — bridging the gap between academic finance and practical
                implementation.
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
                href="mailto:your@email.com"
                className="text-[#C9A84C] text-sm hover:text-[#E8C87A] transition-colors"
              >
                your@email.com →
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
