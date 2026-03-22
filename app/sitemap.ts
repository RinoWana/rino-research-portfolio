import { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase-server'

const BASE_URL = 'https://rrwresearch.xyz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('published', true)

  const articleUrls: MetadataRoute.Sitemap = (articles ?? []).map((a) => ({
    url: `${BASE_URL}/research/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: BASE_URL,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/research`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...articleUrls,
  ]
}
