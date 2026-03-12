import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api/payload';

interface RelatedProductsProps {
  currentProductId: string;
}

export default async function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const products = await getProducts({ limit: 4 });
  const relatedProducts = products.filter((p: any) => p.id !== currentProductId).slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product: any) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group"
          >
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
              {product.heroImage?.url && (
                <Image
                  src={product.heroImage.url}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:underline">
              {product.title}
            </h3>
            <p className="text-gray-600 mt-1">
              ${(product.price / 100).toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
