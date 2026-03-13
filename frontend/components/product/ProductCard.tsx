import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `${(price / 100).toFixed(2)}`;
  };

  const imageUrl = product.heroImage?.url || '/placeholder-product.jpg';

  return (
    <div className="group animate-fade-in-up">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={imageUrl}
              alt={product.heroImage?.alt || product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
          <div className="absolute top-2 right-2 z-10">
            <WishlistButton 
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: imageUrl,
                slug: product.slug
              }} 
            />
          </div>
        </div>
        <div className="p-4">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-lg">{formatPrice(product.price)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
