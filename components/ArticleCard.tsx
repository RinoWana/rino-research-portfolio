import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import type { Article } from '@/lib/supabase'

/**
 * Lead/featured article treatment: asymmetric split (image + text side by side),
 * no card border. Used for the single featured story, not for grid listings.
 */
export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/research/${article.slug}`} className="group flex flex-col md:flex-row gap-8 items-start">
      {article.cover_image_url && (
        <div className="md:w-3/5 relative h-64 md:h-80 overflow-hidden shrink-0">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className={article.cover_image_url ? 'md:w-2/5' : 'max-w-2xl'}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.65rem] tracking-[0.2em] uppercase font-medium text-[#2E3A7E]">
            {article.category}
          </span>
          <span className="text-[0.65rem] text-[#5D6478]">
            {article.read_time} min read
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-semibold text-[#1A1F35] leading-snug mb-3 group-hover:text-[#2E3A7E] transition-colors">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="text-[#5D6478] leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[#D2D6E2]">
          <span className="text-[0.7rem] text-[#5D6478]">
            {format(new Date(article.created_at), 'MMM d, yyyy')}
          </span>
          <span className="flex items-center gap-1 text-[0.7rem] text-[#2E3A7E] group-hover:gap-2 transition-all">
            Read →
          </span>
        </div>
      </div>
    </Link>
  )
}
