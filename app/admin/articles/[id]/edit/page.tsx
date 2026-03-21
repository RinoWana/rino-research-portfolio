import { createServerClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import ArticleEditor from '../../../ArticleEditor'

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!article) notFound()

  return <ArticleEditor article={article} />
}
