'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Wordmark from './Wordmark'

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
          ? 'bg-white/95 backdrop-blur-md border-b border-[#D2D6E2]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <Wordmark variant="dark" className="h-8 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-[0.75rem] tracking-[0.15em] uppercase font-medium transition-colors ${
                  pathname === href
                    ? 'text-[#2E3A7E]'
                    : 'text-[#5D6478] hover:text-[#1A1F35]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[0.7rem] tracking-[0.2em] uppercase font-medium text-[#5D6478] hover:text-[#1A1F35] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#D2D6E2] px-6 py-6 space-y-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block text-[0.75rem] tracking-[0.15em] uppercase font-medium transition-colors ${
                pathname === href ? 'text-[#2E3A7E]' : 'text-[#5D6478]'
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
