import Link from 'next/link'
import { LayoutDashboard, FileText, PlusCircle, Globe, LogOut } from 'lucide-react'
import AdminLogoutButton from './LogoutButton'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0603] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#0D0905] border-r border-[#2E2018] flex flex-col">
        {/* Brand */}
        <div className="p-6 border-b border-[#2E2018]">
          <div className="font-serif text-sm font-semibold text-[#F5EBD8]">
            Rino Riyadi Wana
          </div>
          <div className="text-[0.55rem] tracking-[0.25em] uppercase text-[#C9A84C] mt-0.5">
            Admin Panel
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <SidebarLink href="/admin/dashboard"     icon={<LayoutDashboard size={15} />} label="Dashboard" />
          <SidebarLink href="/admin/articles/new"  icon={<PlusCircle size={15} />}      label="New Article" />
          <div className="pt-4 mt-4 border-t border-[#2E2018] space-y-1">
            <SidebarLink href="/"     icon={<Globe size={15} />}  label="View Site" newTab />
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#2E2018]">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

function SidebarLink({
  href, icon, label, newTab,
}: {
  href: string; icon: React.ReactNode; label: string; newTab?: boolean
}) {
  return (
    <Link
      href={href}
      target={newTab ? '_blank' : undefined}
      className="flex items-center gap-3 px-3 py-2.5 text-[0.75rem] text-[#7A6050] hover:text-[#F5EBD8] hover:bg-[#1E1510] transition-all rounded-sm group"
    >
      <span className="text-[#7A6050] group-hover:text-[#C9A84C] transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  )
}
