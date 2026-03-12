import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import VariantSelector from '@/components/product/VariantSelector';
import AddToCart from '@/components/product/AddToCart';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductBySlug } from '@/lib/api/payload';
import { getMedusaProduct } from '@/lib/api/medusa';

export const revalidate = 600; // Revalidate every 10 minutes

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} - Modern E-Commerce Store`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.title,
      description: product.shortDescription || product.description,
      images: product.heroImage?.url ? [product.heroImage.url] : [],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const cmsProduct = await getProductBySlug(params.slug);

  if (!cmsProduct) {
    notFound();
  }

  // Fetch commerce data from Medusa
  const medusaProduct = cmsProduct.medusaProductId
    ? await getMedusaProduct(cmsProduct.medusaProductId)
    : null;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery
              images={[
                cmsProduct.heroImage,
                ...(cmsProduct.galleryImages || []),
              ]}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <ProductInfo
              title={cmsProduct.title}
              description={cmsProduct.description}
              price={medusaProduct?.variants?.[0]?.prices?.[0]?.amount || cmsProduct.price}
            />

            {medusaProduct?.variants && medusaProduct.variants.length > 1 && (
              <VariantSelector variants={medusaProduct.variants} />
            )}

            <AddToCart
              productId={medusaProduct?.id}
              variantId={medusaProduct?.variants?.[0]?.id}
              inventory={medusaProduct?.variants?.[0]?.inventory_quantity}
            />

            {/* Additional Product Details */}
            {cmsProduct.description && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: cmsProduct.description }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProductId={cmsProduct.id} />
        </div>
      </div>
    </main>
  );
}
