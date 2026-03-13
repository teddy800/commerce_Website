'use client';

import { useWishlistStore } from '@/lib/store/wishlistStore';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from '@/components/common/Toast';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();

  const handleRemove = (id: string, title: string) => {
    removeItem(id);
    toast.info(`${title} removed from wishlist`);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
      toast.success('Wishlist cleared');
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12 space-y-6">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your Wishlist is Empty</h1>
            <p className="text-gray-600">
              Start adding products you love to your wishlist!
            </p>
            <Link
              href="/products"
              className="inline-block bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{items.length} item(s)</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group animate-scale-in"
            >
              <Link href={`/products/${item.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              <div className="p-4 space-y-3">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                
                <p className="text-2xl font-bold text-gray-900">
                  ${(item.price / 100).toFixed(2)}
                </p>
                
                <div className="flex gap-2">
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex-1 bg-black text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleRemove(item.id, item.title)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Wishlist */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Share Your Wishlist</h2>
          <p className="text-gray-600 mb-4">
            Share your wishlist with friends and family!
          </p>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
