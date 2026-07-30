import Link from 'next/link'
import { format } from 'date-fns'
import type { Article } from '@/lib/supabase'

export default function ArticleRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/research/${article.slug}`}
      className="group editorial-row flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-6"
    >
      <div className="md:w-40 shrink-0 flex md:block items-center gap-3">
        <span className="text-[0.65rem] tracking-[0.2em] uppercase font-medium text-[#2E3A7E]">
          {article.category}
        </span>
        <span className="text-[0.7rem] text-[#5D6478] md:block md:mt-1">
          {format(new Date(article.created_at), 'MMM d, yyyy')}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-[#1A1F35] leading-snug group-hover:text-[#2E3A7E] transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-[#5D6478] text-sm leading-relaxed line-clamp-2 mt-1">
            {article.excerpt}
          </p>
        )}
      </div>

      <div className="shrink-0 text-[0.7rem] text-[#2E3A7E] flex items-center gap-1 group-hover:gap-2 transition-all">
        Read →
      </div>
    </Link>
  )
}
