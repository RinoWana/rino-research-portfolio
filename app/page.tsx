import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { createServerClient } from '@/lib/supabase-server'

export default async function HomePage() {
  const supabase = createServerClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0A0603]" />
        <div className="absolute inset-0 bg-hero-gradient opacity-60" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0603] to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          {/* Eyebrow */}
          <p className="section-label mb-8 animate-fade-in">
            Independent Research
          </p>

          {/* Main title */}
          <h1 className="font-serif font-bold leading-none mb-4 animate-slide-up">
            <span className="block text-5xl md:text-7xl lg:text-8xl text-[#F5EBD8] tracking-tight">
              Rino Riyadi Wana
            </span>
            <span className="block text-2xl md:text-4xl lg:text-5xl tracking-[0.35em] text-[#C9A84C] mt-3">
              R E S E A R C H
            </span>
          </h1>

          {/* Gold rule */}
          <div className="flex items-center justify-center my-8 animate-fade-in">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <div className="w-1.5 h-1.5 bg-[#C9A84C] mx-3 rotate-45" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>

          {/* Tagline */}
          <p className="text-[#BFA888] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in">
            Quantitative research, macro analysis, fundamental deep-dives,
            and systematic trading — bridging rigorous methodology with market reality.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link href="/research" className="btn-gold">
              Explore Research <ArrowRight size={14} />
            </Link>
            <Link href="/about" className="btn-ghost">
              About
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#7A6050]" />
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#7A6050]">Scroll</span>
        </div>
      </section>

      {/* ── FEATURED RESEARCH ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">Latest Work</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#F5EBD8]">
              Featured Research
            </h2>
          </div>
          <Link
            href="/research"
            className="hidden sm:flex items-center gap-2 text-[#C9A84C] text-xs tracking-[0.15em] uppercase hover:gap-3 transition-all"
          >
            All Research <ArrowUpRight size={14} />
          </Link>
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-[#2E2018] rounded-sm">
            <p className="font-serif text-xl text-[#7A6050] italic">
              Research publications coming soon.
            </p>
          </div>
        )}

        <div className="mt-8 sm:hidden text-center">
          <Link href="/research" className="btn-gold text-sm">
            All Research <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="border-t border-[#2E2018] bg-[#0D0905]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">About the Researcher</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#F5EBD8] mb-6 leading-snug">
                Bridging Theory &<br />
                <span className="italic text-[#C9A84C]">Quantitative Practice</span>
              </h2>
              <p className="text-[#BFA888] leading-relaxed mb-4">
                My research focuses on applying mathematical models and computational methods
                to financial markets — from Hidden Markov Models for regime detection to
                algorithmic trading systems grounded in empirical evidence.
              </p>
              <p className="text-[#7A6050] leading-relaxed mb-8">
                Committed to rigorous methodology, reproducibility, and making quantitative
                insights accessible to the broader research community.
              </p>
              <Link href="/about" className="btn-gold">
                Full Profile <ArrowRight size={14} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Research Focus',    value: 'Quant Finance' },
                { label: 'Methodology',       value: 'Data-Driven' },
                { label: 'Primary Asset',     value: 'Crypto / Equities' },
                { label: 'Approach',          value: 'Empirical' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-6 border border-[#2E2018] hover:border-[rgba(201,168,76,0.3)] transition-colors"
                >
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#7A6050] mb-2">
                    {label}
                  </p>
                  <p className="font-serif text-lg text-[#F5EBD8]">{value}</p>
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
