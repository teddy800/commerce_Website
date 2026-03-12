import { Metadata } from 'next';
import Hero from '@/components/homepage/Hero';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import ContentSection from '@/components/homepage/ContentSection';
import { getHomepageContent } from '@/lib/api/payload';

export const metadata: Metadata = {
  title: 'Modern E-Commerce Store - Shop Quality Products',
  description: 'Discover amazing products with fast shipping and great customer service.',
  openGraph: {
    title: 'Modern E-Commerce Store',
    description: 'Discover amazing products with fast shipping and great customer service.',
    type: 'website',
  },
};

export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
  const homepageData = await getHomepageContent();

  return (
    <main className="min-h-screen">
      <Hero data={homepageData?.hero} />
      <FeaturedProducts products={homepageData?.featuredProducts} />
      {homepageData?.sections?.map((section: any, index: number) => (
        <ContentSection key={section.id || index} data={section} />
      ))}
    </main>
  );
}
