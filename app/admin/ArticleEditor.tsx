'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Bold, Italic, Link2, Image as ImageIcon,
  Heading2, Heading3, List, Quote, Code2,
  Eye, Edit3, Save, Send, Upload, X,
} from 'lucide-react'
import { createClient, type Article } from '@/lib/supabase'

type Props = { article?: Article }

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
}

function estimateReadTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))
}

export default function ArticleEditor({ article }: Props) {
  const router   = useRouter()
  const supabase = createClient()
  const isEdit   = !!article

  const [title,    setTitle]    = useState(article?.title    ?? '')
  const [slug,     setSlug]     = useState(article?.slug     ?? '')
  const [excerpt,  setExcerpt]  = useState(article?.excerpt  ?? '')
  const [category, setCategory] = useState(article?.category ?? 'Research')
  const [tags,     setTags]     = useState((article?.tags ?? []).join(', '))
  const [content,  setContent]  = useState(article?.content  ?? '')
  const [coverUrl, setCoverUrl] = useState(article?.cover_image_url ?? '')
  const [preview,  setPreview]  = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')
  const [uploadingCover,     setUploadingCover]     = useState(false)
  const [uploadingInline,    setUploadingInline]    = useState(false)

  // Auto-generate slug from title
  function handleTitleChange(val: string) {
    setTitle(val)
    if (!isEdit) setSlug(slugify(val))
  }

  // ── Upload helpers ──────────────────────────────────────────────
  async function uploadImage(file: File): Promise<string | null> {
    const ext      = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage
      .from('article-images')
      .upload(filename, file, { cacheControl: '3600', upsert: false })

    if (error) { setError(`Upload failed: ${error.message}`); return null }

    const { data: urlData } = supabase.storage
      .from('article-images')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    const url = await uploadImage(file)
    if (url) setCoverUrl(url)
    setUploadingCover(false)
    e.target.value = ''
  }

  async function handleInlineImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingInline(true)
    const url = await uploadImage(file)
    if (url) insertMarkdown(`![${file.name}](${url})`)
    setUploadingInline(false)
    e.target.value = ''
  }

  // ── Markdown toolbar ────────────────────────────────────────────
  function insertMarkdown(syntax: string, wrap = false) {
    const ta = document.getElementById('md-editor') as HTMLTextAreaElement
    if (!ta) { setContent((c) => c + syntax); return }

    const start = ta.selectionStart
    const end   = ta.selectionEnd
    const sel   = ta.value.slice(start, end)
    const newVal = wrap && sel
      ? ta.value.slice(0, start) + syntax.replace('$', sel) + ta.value.slice(end)
      : ta.value.slice(0, start) + syntax + ta.value.slice(end)

    setContent(newVal)
    setTimeout(() => {
      ta.focus()
      const pos = start + syntax.length
      ta.setSelectionRange(pos, pos)
    }, 0)
  }

  const toolbar = [
    { icon: <Bold     size={14} />, title: 'Bold',        action: () => insertMarkdown('**bold**', true)  },
    { icon: <Italic   size={14} />, title: 'Italic',      action: () => insertMarkdown('*italic*', true)  },
    { icon: <Heading2 size={14} />, title: 'Heading 2',   action: () => insertMarkdown('\n## ')            },
    { icon: <Heading3 size={14} />, title: 'Heading 3',   action: () => insertMarkdown('\n### ')           },
    { icon: <Quote    size={14} />, title: 'Blockquote',  action: () => insertMarkdown('\n> ')             },
    { icon: <List     size={14} />, title: 'List',        action: () => insertMarkdown('\n- ')             },
    { icon: <Code2    size={14} />, title: 'Code block',  action: () => insertMarkdown('\n```\n\n```\n')   },
    { icon: <Link2    size={14} />, title: 'Link',        action: () => insertMarkdown('[text](url)')      },
  ]

  // ── Save ────────────────────────────────────────────────────────
  async function handleSave(publish = false) {
    if (!title.trim() || !slug.trim()) {
      setError('Title and slug are required.')
      return
    }
    setSaving(true)
    setError('')

    const payload = {
      title:            title.trim(),
      slug:             slug.trim(),
      excerpt:          excerpt.trim() || null,
      content:          content.trim(),
      category:         category.trim() || 'Research',
      tags:             tags.split(',').map((t) => t.trim()).filter(Boolean),
      cover_image_url:  coverUrl || null,
      published:        publish,
      read_time:        estimateReadTime(content),
      updated_at:       new Date().toISOString(),
    }

    let err
    if (isEdit) {
      const res = await supabase.from('articles').update(payload).eq('id', article!.id)
      err = res.error
    } else {
      const res = await supabase.from('articles').insert(payload)
      err = res.error
    }

    setSaving(false)
    if (err) { setError(err.message); return }
    router.push('/admin/dashboard')
    router.refresh()
  }

  // ── UI ──────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2E2018] bg-[#0D0905] shrink-0">
        <h1 className="font-serif text-lg text-[#F5EBD8]">
          {isEdit ? 'Edit Article' : 'New Article'}
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs border transition-colors ${
              preview
                ? 'border-[rgba(201,168,76,0.4)] text-[#C9A84C]'
                : 'border-[#2E2018] text-[#7A6050] hover:text-[#F5EBD8]'
            }`}
          >
            {preview ? <Edit3 size={13} /> : <Eye size={13} />}
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-3 py-1.5 text-xs border border-[#2E2018] text-[#7A6050] hover:text-[#F5EBD8] transition-colors"
          >
            <Save size={13} />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="btn-gold text-xs py-1.5 px-4"
          >
            <Send size={13} />
            {saving ? 'Saving…' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div className="px-6 py-3 bg-red-500/10 border-b border-red-500/20 text-red-400 text-xs flex items-center justify-between">
          {error}
          <button onClick={() => setError('')}><X size={13} /></button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Metadata panel */}
        <div className="w-72 shrink-0 border-r border-[#2E2018] bg-[#0D0905] overflow-y-auto p-5 space-y-5">
          <div>
            <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-[#7A6050] mb-1.5">
              Title *
            </label>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-[#0A0603] border border-[#2E2018] text-[#F5EBD8] px-3 py-2 text-sm outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors"
              placeholder="Article title"
            />
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-[#7A6050] mb-1.5">
              Slug *
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-[#0A0603] border border-[#2E2018] text-[#F5EBD8] px-3 py-2 text-xs font-mono outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors"
              placeholder="article-slug"
            />
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-[#7A6050] mb-1.5">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full bg-[#0A0603] border border-[#2E2018] text-[#F5EBD8] px-3 py-2 text-sm outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors resize-none"
              placeholder="Short description (optional)"
            />
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-[#7A6050] mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#0A0603] border border-[#2E2018] text-[#F5EBD8] px-3 py-2 text-sm outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors"
            >
              {['Research', 'Working Paper', 'Commentary', 'Thesis', 'Tutorial'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-[#7A6050] mb-1.5">
              Tags (comma-separated)
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-[#0A0603] border border-[#2E2018] text-[#F5EBD8] px-3 py-2 text-sm outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors"
              placeholder="HMM, crypto, trading"
            />
          </div>

          {/* Cover image */}
          <div>
            <label className="block text-[0.6rem] tracking-[0.15em] uppercase text-[#7A6050] mb-1.5">
              Cover Image
            </label>
            {coverUrl ? (
              <div className="relative">
                <img src={coverUrl} alt="Cover" className="w-full h-28 object-cover border border-[#2E2018]" />
                <button
                  onClick={() => setCoverUrl('')}
                  className="absolute top-1 right-1 p-1 bg-[#0A0603]/80 text-[#7A6050] hover:text-red-400 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 h-24 border border-dashed border-[#2E2018] hover:border-[rgba(201,168,76,0.3)] cursor-pointer transition-colors">
                <Upload size={16} className="text-[#7A6050]" />
                <span className="text-[0.65rem] text-[#7A6050]">
                  {uploadingCover ? 'Uploading…' : 'Upload cover image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                  disabled={uploadingCover}
                />
              </label>
            )}
          </div>
        </div>

        {/* Editor / Preview */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!preview && (
            /* Toolbar */
            <div className="flex items-center gap-1 px-4 py-2 border-b border-[#2E2018] bg-[#0D0905] shrink-0 flex-wrap">
              {toolbar.map(({ icon, title, action }) => (
                <button
                  key={title}
                  onClick={action}
                  title={title}
                  className="p-2 text-[#7A6050] hover:text-[#F5EBD8] hover:bg-[#1E1510] transition-colors rounded-sm"
                >
                  {icon}
                </button>
              ))}
              <div className="w-px h-5 bg-[#2E2018] mx-1" />
              <label
                title="Insert image"
                className="flex items-center gap-1.5 px-2 py-1.5 text-[#7A6050] hover:text-[#F5EBD8] hover:bg-[#1E1510] cursor-pointer transition-colors text-xs"
              >
                <ImageIcon size={14} />
                {uploadingInline ? 'Uploading…' : 'Insert image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInlineImageUpload}
                  className="hidden"
                  disabled={uploadingInline}
                />
              </label>
            </div>
          )}

          {preview ? (
            <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto w-full">
              <h1 className="font-serif text-3xl font-bold text-[#F5EBD8] mb-4">{title || 'Untitled'}</h1>
              {excerpt && <p className="text-[#BFA888] italic font-serif mb-8">{excerpt}</p>}
              <div className="h-px bg-[#2E2018] mb-8" />
              <div className="prose-research">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea
              id="md-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="editor-textarea flex-1"
              placeholder="Write your article in Markdown…

# Introduction

Start writing here. Supports **bold**, *italic*, headings, lists, tables, code blocks, and more.

## Section

> Blockquote for important insights

```python
# Code block
import numpy as np
```
"
            />
          )}
        </div>
      </div>
    </div>
  )
}
