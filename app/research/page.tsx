import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import ArticleRow from '@/components/ArticleRow'
import { createServerClient } from '@/lib/supabase-server'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Published research papers and articles by Rino Riyadi Wana.',
}

export default async function ResearchPage() {
  const supabase = createServerClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const [lead, ...rest] = articles ?? []

  // Group the remaining (non-lead) articles by category
  const categories = Array.from(new Set(rest.map((a) => a.category)))

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div className="pt-32 pb-16 border-b border-[#D2D6E2] bg-[#F5F6FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-label mb-4">Publications & Articles</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1F35]">
            Research
          </h1>
          <div className="gold-line mt-5" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {lead ? (
          <>
            {/* Lead story */}
            <div className="mb-20">
              <ArticleCard article={lead} />
            </div>

            {/* Remaining articles, grouped by category as stacked rows */}
            {categories.length > 0 &&
              categories.map((cat) => {
                const catArticles = rest.filter((a) => a.category === cat)
                return (
                  <section key={cat} className="mb-16">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="section-label">{cat}</span>
                      <div className="flex-1 h-px bg-[#D2D6E2]" />
                    </div>
                    <div>
                      {catArticles.map((article) => (
                        <ArticleRow key={article.id} article={article} />
                      ))}
                    </div>
                  </section>
                )
              })}
          </>
        ) : (
          <div className="text-center py-32">
            <p className="text-2xl text-[#5D6478] italic mb-4">
              Research publications coming soon.
            </p>
            <p className="text-[#5D6478] text-sm">
              New research is currently being prepared for publication.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
