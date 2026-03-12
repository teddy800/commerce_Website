'use client'

import Link from 'next/link'
import { useState } from 'react'
import Navigation from './Navigation'
import CartIcon from '../common/CartIcon'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container-max">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">CG</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg md:text-xl">Card Games</span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation className="hidden md:flex" />

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/account/login"
              className="hidden sm:inline text-sm font-medium hover:text-accent transition"
            >
              Sign In
            </Link>
            <CartIcon />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200">
            <Link href="/products" className="block px-4 py-2 hover:bg-gray-50">
              Products
            </Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-gray-50">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-gray-50">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
