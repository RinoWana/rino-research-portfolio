'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function PublishToggle({
  id,
  published,
}: {
  id: string
  published: boolean
}) {
  const [value,   setValue]   = useState(published)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function toggle() {
    setLoading(true)
    await supabase.from('articles').update({ published: !value }).eq('id', id)
    setValue(!value)
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-[0.65rem] tracking-wide px-2.5 py-1 border transition-colors ${
        value
          ? 'border-[rgba(201,168,76,0.4)] text-[#C9A84C] bg-[rgba(201,168,76,0.05)]'
          : 'border-[#2E2018] text-[#7A6050] hover:border-[#7A6050]'
      }`}
    >
      {loading ? '…' : value ? 'Published' : 'Draft'}
    </button>
  )
}
