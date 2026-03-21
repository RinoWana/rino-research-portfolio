'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function DeleteButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false)
  const router   = useRouter()
  const supabase = createClient()

  async function handleDelete() {
    await supabase.from('articles').delete().eq('id', id)
    router.refresh()
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          className="text-[0.65rem] px-2 py-1 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          Confirm
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[0.65rem] px-2 py-1 border border-[#2E2018] text-[#7A6050] hover:text-[#F5EBD8] transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-[#7A6050] hover:text-red-400 transition-colors"
      title="Delete"
    >
      <Trash2 size={15} />
    </button>
  )
}
