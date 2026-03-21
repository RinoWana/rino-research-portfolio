import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ArrowUpRight } from 'lucide-react'
import type { Article } from '@/lib/supabase'

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/research/${article.slug}`} className="group block card rounded-sm">
      {/* Cover image */}
      {article.cover_image_url && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1510] to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Category + read time */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.65rem] tracking-[0.2em] uppercase font-medium text-[#C9A84C]">
            {article.category}
          </span>
          <span className="text-[0.65rem] text-[#7A6050]">
            {article.read_time} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-[#F5EBD8] leading-snug mb-3 group-hover:text-[#C9A84C] transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-[#7A6050] text-sm leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#2E2018]">
          <span className="text-[0.7rem] text-[#7A6050]">
            {format(new Date(article.created_at), 'MMM d, yyyy')}
          </span>
          <span className="flex items-center gap-1 text-[0.7rem] text-[#C9A84C] group-hover:gap-2 transition-all">
            Read <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}
