import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createServerClient } from '@/lib/supabase-server'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('articles')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single()

  if (!data) return { title: 'Not Found' }
  return { title: data.title, description: data.excerpt ?? undefined }
}

export default async function ArticlePage({ params }: Props) {
  const supabase = createServerClient()
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!article) notFound()

  return (
    <>
      <Navbar />

      {/* Cover image */}
      {article.cover_image_url && (
        <div className="relative w-full h-[50vh] mt-20 overflow-hidden">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0603] via-[#0A0603]/40 to-transparent" />
        </div>
      )}

      {/* Article header */}
      <header
        className={`max-w-3xl mx-auto px-6 lg:px-0 ${
          article.cover_image_url ? 'pt-10' : 'pt-36'
        } pb-10`}
      >
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-[#7A6050] hover:text-[#C9A84C] text-xs tracking-[0.15em] uppercase mb-8 transition-colors"
        >
          <ArrowLeft size={12} /> Back to Research
        </Link>

        {/* Category */}
        <div className="flex items-center gap-3 mb-5">
          <span className="section-label">{article.category}</span>
          <div className="w-1 h-1 rounded-full bg-[#2E2018]" />
          <span className="flex items-center gap-1 text-[0.65rem] text-[#7A6050]">
            <Clock size={11} /> {article.read_time} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5EBD8] leading-tight mb-6">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-[#BFA888] text-lg leading-relaxed mb-6 font-serif italic">
            {article.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 pt-6 border-t border-[#2E2018]">
          <div>
            <p className="text-[#F5EBD8] text-sm font-medium">Rino Riyadi Wana</p>
            <p className="text-[#7A6050] text-xs">
              {format(new Date(article.created_at), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[0.65rem] tracking-wide text-[#7A6050] border border-[#2E2018] px-3 py-1"
              >
                <Tag size={9} /> {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Gold divider */}
      <div className="max-w-3xl mx-auto px-6 lg:px-0 mb-10">
        <div className="h-px bg-gradient-to-r from-[#C9A84C] via-[#C9A84C]/30 to-transparent" />
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 lg:px-0 pb-24">
        <div className="prose-research">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </article>

      <Footer />
    </>
  )
}
