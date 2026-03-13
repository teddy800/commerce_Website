'use client'

import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  data?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: {
      url: string;
      alt?: string;
    };
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function Hero({ data }: HeroProps) {
  const title = data?.title || 'Premium Card Games';
  const subtitle = data?.subtitle || 'Discover the best selection of card games for every occasion';
  const ctaText = data?.ctaText || 'Shop Now';
  const ctaLink = data?.ctaLink || '/products';
  const backgroundImage = data?.backgroundImage?.url || 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920&h=1080&fit=crop';

  return (
    <section className="relative w-full h-96 md:h-screen bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 animate-ken-burns">
        <Image
          src={backgroundImage}
          alt={data?.backgroundImage?.alt || 'Hero background'}
          fill
          className="object-cover opacity-40"
          priority
          quality={85}
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container-max text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-in-down">
            {title}
          </h1>
          <p className="text-lg md:text-2xl mb-8 md:mb-12 text-gray-200 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            {subtitle}
          </p>
          <Link
            href={ctaLink}
            className="inline-block bg-accent hover:bg-red-700 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-lg transition-all transform hover:scale-110 hover:shadow-2xl animate-bounce-subtle animation-delay-400"
          >
            {ctaText}
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
