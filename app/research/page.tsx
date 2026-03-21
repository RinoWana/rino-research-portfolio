import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
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

  // Group by category
  const categories = [...new Set((articles ?? []).map((a) => a.category))]

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div className="pt-32 pb-16 border-b border-[#2E2018] bg-[#0D0905]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-label mb-4">Publications & Articles</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#F5EBD8]">
            Research
          </h1>
          <div className="gold-line mt-5" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {articles && articles.length > 0 ? (
          categories.length > 1 ? (
            categories.map((cat) => {
              const catArticles = articles.filter((a) => a.category === cat)
              return (
                <section key={cat} className="mb-20">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="section-label">{cat}</span>
                    <div className="flex-1 h-px bg-[#2E2018]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </section>
              )
            })
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-32">
            <p className="font-serif text-2xl text-[#7A6050] italic mb-4">
              Research publications coming soon.
            </p>
            <p className="text-[#7A6050] text-sm">
              New research is currently being prepared for publication.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
