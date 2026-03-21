'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function AdminLogoutButton() {
  const router   = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-3 py-2.5 text-[0.75rem] text-[#7A6050] hover:text-red-400 transition-colors w-full"
    >
      <LogOut size={15} />
      Sign Out
    </button>
  )
}
