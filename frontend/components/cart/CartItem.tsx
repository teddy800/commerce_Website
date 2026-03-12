'use client';

import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';

export default function CartItem() {
  const { items, removeItem, updateQuantity } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
        <p className="mt-1 text-sm text-gray-500">Start adding some products!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
          {/* Product Image */}
          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            {item.variant && (
              <p className="text-sm text-gray-600">{item.variant.title}</p>
            )}
            <p className="text-sm font-medium text-gray-900 mt-1">
              {formatPrice(item.unit_price)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>

          {/* Item Total */}
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {formatPrice(item.unit_price * item.quantity)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-600 hover:text-red-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
