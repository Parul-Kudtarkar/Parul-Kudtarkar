"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinkClass = (path: string) =>
    pathname === path ? "typography-nav-link-active" : "typography-nav-link hover:opacity-70"

  return (
    <header className="glass-header smooth-transition">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 smooth-transition hover:opacity-80">
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-background font-medium text-xs">PK</span>
            </div>
            <span className="font-medium text-base hidden sm:inline">Parul Kudtarkar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors ${navLinkClass("/")}`}>
              Home
            </Link>
            <Link href="/publications" className={`transition-colors ${navLinkClass("/publications")}`}>
              Publications
            </Link>
            <Link href="/art" className={`transition-colors ${navLinkClass("/art")}`}>
              Art
            </Link>
            <Link href="/blog" className={`transition-colors ${navLinkClass("/blog")}`}>
              Blog
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className={`block px-4 py-2 rounded transition-colors ${navLinkClass("/")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/publications"
              className={`block px-4 py-2 rounded transition-colors ${navLinkClass("/publications")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Publications
            </Link>
            <Link
              href="/art"
              className={`block px-4 py-2 rounded transition-colors ${navLinkClass("/art")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Art
            </Link>
            <Link
              href="/blog"
              className={`block px-4 py-2 rounded transition-colors ${navLinkClass("/blog")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
