import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import ArticleRow from '@/components/ArticleRow'
import { createServerClient } from '@/lib/supabase-server'

export default async function HomePage() {
  const supabase = createServerClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(5)

  const [lead, ...rest] = articles ?? []

  const facts = [
    { label: 'Research Focus',    value: 'Quant Finance' },
    { label: 'Methodology',       value: 'Data-Driven' },
    { label: 'Primary Asset',     value: 'Crypto / Equities' },
    { label: 'Approach',          value: 'Empirical' },
  ]

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-hero-gradient" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 w-full pt-20">
          <p className="section-label mb-8 animate-fade-in">
            Independent Research
          </p>

          <h1 className="font-bold leading-none mb-4 animate-slide-up">
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#1A1F35] tracking-tight">
              Rino Riyadi Wana
            </span>
            <span className="block text-lg sm:text-2xl md:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.35em] text-[#2E3A7E] mt-3">
              R E S E A R C H
            </span>
          </h1>

          <div className="h-px w-24 bg-[#2E3A7E] my-8 animate-fade-in" />

          <p className="text-[#5D6478] text-base md:text-lg max-w-2xl leading-relaxed mb-12 animate-fade-in">
            Quantitative finance graduate exploring macro analysis, fundamental research,
            and systematic trading, with an eye toward working as an investment analyst.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Link href="/research" className="btn-gold">
              Explore Research →
            </Link>
            <Link href="/about" className="btn-ghost">
              About
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED RESEARCH ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">Latest Work</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1A1F35]">
              Featured Research
            </h2>
          </div>
          <Link
            href="/research"
            className="hidden sm:flex items-center gap-2 text-[#2E3A7E] text-xs tracking-[0.15em] uppercase hover:gap-3 transition-all"
          >
            All Research →
          </Link>
        </div>

        {lead ? (
          <>
            <ArticleCard article={lead} />

            {rest.length > 0 && (
              <div className="mt-16 pt-4">
                {rest.map((article) => (
                  <ArticleRow key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 border border-[#D2D6E2]">
            <p className="text-xl text-[#5D6478] italic">
              Research publications coming soon.
            </p>
          </div>
        )}

        <div className="mt-8 sm:hidden text-center">
          <Link href="/research" className="btn-gold text-sm">
            All Research →
          </Link>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="border-t border-[#D2D6E2] bg-[#F5F6FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-3/5">
              <p className="section-label mb-4">About Me</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1A1F35] mb-6 leading-snug">
                From Applied Math<br />
                <span className="text-[#2E3A7E]">To Investment Analysis</span>
              </h2>
              <p className="text-[#5D6478] leading-relaxed mb-4 max-w-xl">
                I am a fresh graduate in Applied Mathematics with a focus on quantitative
                finance. My thesis used Hidden Markov Models to detect market regimes in
                cryptocurrency data, and I am now looking to apply that background as an
                investment analyst.
              </p>
              <p className="text-[#5D6478] leading-relaxed mb-8 max-w-xl">
                I care about getting the reasoning right, being honest about what the data
                does and does not support, and connecting quantitative methods to real
                investment decisions.
              </p>
              <Link href="/about" className="btn-gold">
                Full Profile →
              </Link>
            </div>

            {/* Facts (hairline list, not a grid) */}
            <div className="lg:w-2/5 lg:pl-12 lg:border-l border-[#D2D6E2]">
              {facts.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between py-4 border-b border-[#D2D6E2]"
                >
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#5D6478]">
                    {label}
                  </p>
                  <p className="text-lg text-[#1A1F35]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
