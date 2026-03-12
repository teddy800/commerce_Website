import Link from 'next/link'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={`flex items-center gap-8 ${className}`}>
      <Link href="/products" className="text-sm font-medium hover:text-accent transition">
        Products
      </Link>
      <Link href="/about" className="text-sm font-medium hover:text-accent transition">
        About
      </Link>
      <Link href="/contact" className="text-sm font-medium hover:text-accent transition">
        Contact
      </Link>
    </nav>
  )
}
