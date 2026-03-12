import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Products - Card Game Store',
  description: 'Browse our complete collection of card games.',
}

export const revalidate = 300

export default function ProductsPage() {
  const products = [
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

  return (
    <div className="container-max py-12">
      <h1 className="text-4xl font-bold mb-12">All Products</h1>

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
  )
}
