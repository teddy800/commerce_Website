'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Product {
  id: string
  title: string
  price: number
  image: string
  slug: string
}

interface FeaturedProductsProps {
  products?: any[];
}

export default function FeaturedProducts({ products: initialProducts }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use provided products or fallback to mock
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }

    // Mock featured products
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Classic Card Game',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
        slug: 'classic-card-game',
      },
      {
        id: '2',
        title: 'Strategy Card Game',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1570303008033-3e4fb8547da0?w=400&h=400&fit=crop',
        slug: 'strategy-card-game',
      },
      {
        id: '3',
        title: 'Party Card Game',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
        slug: 'party-card-game',
      },
      {
        id: '4',
        title: 'Adventure Card Game',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1570303008033-3e4fb8547da0?w=400&h=400&fit=crop',
        slug: 'adventure-card-game',
      },
    ]
    setProducts(mockProducts)
    setLoading(false)
  }, [initialProducts])

  if (loading) {
    return (
      <section className="py-12 md:py-20">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-max">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    quality={75}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-accent font-bold text-xl">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
