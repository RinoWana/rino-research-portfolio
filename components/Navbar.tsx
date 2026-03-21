'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/about',    label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0603]/95 backdrop-blur-md border-b border-[#2E2018]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-wide text-[#F5EBD8] group-hover:text-gold transition-colors">
              Rino Riyadi Wana
            </span>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A84C] font-medium">
              Research
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-[0.75rem] tracking-[0.15em] uppercase font-medium transition-colors ${
                  pathname === href
                    ? 'text-[#C9A84C]'
                    : 'text-[#BFA888] hover:text-[#F5EBD8]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#BFA888] hover:text-[#F5EBD8] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#140D08] border-t border-[#2E2018] px-6 py-6 space-y-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block text-[0.75rem] tracking-[0.15em] uppercase font-medium transition-colors ${
                pathname === href ? 'text-[#C9A84C]' : 'text-[#BFA888]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
