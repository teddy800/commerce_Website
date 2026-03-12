import Image from 'next/image';
import Link from 'next/link';

interface ContentSectionProps {
  data: {
    type: string;
    title?: string;
    content?: string;
    images?: Array<{ url: string; alt?: string }>;
    cta?: {
      text: string;
      link: string;
    };
  };
}

export default function ContentSection({ data }: ContentSectionProps) {
  if (!data) return null;

  const { type, title, content, images, cta } = data;

  // Text Section
  if (type === 'text') {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {title && <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>}
          {content && (
            <div
              className="prose prose-lg mx-auto text-gray-600"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          {cta && (
            <Link
              href={cta.link}
              className="inline-block mt-8 bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              {cta.text}
            </Link>
          )}
        </div>
      </section>
    );
  }

  // Gallery Section
  if (type === 'gallery' && images && images.length > 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {title && <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // CTA Section
  if (type === 'cta') {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          {title && <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>}
          {content && <p className="text-xl text-gray-300 mb-8">{content}</p>}
          {cta && (
            <Link
              href={cta.link}
              className="inline-block bg-white text-gray-900 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {cta.text}
            </Link>
          )}
        </div>
      </section>
    );
  }

  return null;
}
