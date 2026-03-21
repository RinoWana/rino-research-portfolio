import Link from 'next/link'
import { format } from 'date-fns'
import { PlusCircle, Edit2, Eye, EyeOff } from 'lucide-react'
import { createServerClient } from '@/lib/supabase-server'
import PublishToggle from './PublishToggle'
import DeleteButton from './DeleteButton'

export default async function DashboardPage() {
  const supabase = createServerClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, category, published, created_at, read_time')
    .order('created_at', { ascending: false })

  const published = (articles ?? []).filter((a) => a.published).length
  const drafts    = (articles ?? []).filter((a) => !a.published).length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#F5EBD8]">Dashboard</h1>
          <p className="text-[#7A6050] text-sm mt-1">Manage your research publications</p>
        </div>
        <Link href="/admin/articles/new" className="btn-gold text-xs">
          <PlusCircle size={14} /> New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total Articles', value: (articles ?? []).length },
          { label: 'Published',      value: published },
          { label: 'Drafts',         value: drafts },
        ].map(({ label, value }) => (
          <div key={label} className="p-5 border border-[#2E2018] bg-[#140D08]">
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#7A6050] mb-2">{label}</p>
            <p className="font-serif text-3xl text-[#F5EBD8]">{value}</p>
          </div>
        ))}
      </div>

      {/* Articles table */}
      <div className="border border-[#2E2018]">
        <div className="border-b border-[#2E2018] px-6 py-4">
          <p className="section-label">All Articles</p>
        </div>

        {articles && articles.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2E2018] bg-[#140D08]">
                <th className="text-left px-6 py-3 text-[0.65rem] tracking-[0.15em] uppercase text-[#7A6050]">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-[0.65rem] tracking-[0.15em] uppercase text-[#7A6050] hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-[0.65rem] tracking-[0.15em] uppercase text-[#7A6050] hidden lg:table-cell">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-[0.65rem] tracking-[0.15em] uppercase text-[#7A6050]">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-[0.65rem] tracking-[0.15em] uppercase text-[#7A6050]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-[#2E2018] hover:bg-[#140D08] transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-[#F5EBD8] text-sm font-medium line-clamp-1">
                      {article.title}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-[0.65rem] tracking-wide text-[#C9A84C]">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-[#7A6050] text-xs">
                      {format(new Date(article.created_at), 'MMM d, yyyy')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <PublishToggle id={article.id} published={article.published} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {article.published && (
                        <Link
                          href={`/research/${article.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#7A6050] hover:text-[#C9A84C] transition-colors"
                          title="View live"
                        >
                          <Eye size={15} />
                        </Link>
                      )}
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="p-1.5 text-[#7A6050] hover:text-[#F5EBD8] transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={15} />
                      </Link>
                      <DeleteButton id={article.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="text-[#7A6050] text-sm mb-4">No articles yet.</p>
            <Link href="/admin/articles/new" className="btn-gold text-xs">
              <PlusCircle size={14} /> Write your first article
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
