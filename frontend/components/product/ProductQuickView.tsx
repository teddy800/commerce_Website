'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from '@/components/common/Toast';

interface QuickViewProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    // Add to cart logic
    toast.success(`${product.title} added to cart!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images?.[selectedImage]?.url || '/placeholder.jpg'}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedImage === idx ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h2>
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${(product.price / 100).toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${(product.compareAtPrice / 100).toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105 ripple"
              >
                Add to Cart
              </button>
              
              <button className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                Add to Wishlist ❤️
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free shipping on orders over $50
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                30-day money-back guarantee
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ships within 2-3 business days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
