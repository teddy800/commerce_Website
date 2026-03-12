'use client';

import { useCartStore } from '@/lib/store/cartStore';

export default function CartSummary() {
  const { items } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = 0; // Free shipping
  const finalTotal = subtotal + tax + shipping;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="text-gray-900">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="text-gray-900">{formatPrice(tax)}</span>
        </div>

        <div className="border-t pt-2 flex justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-gray-900 text-lg">{formatPrice(finalTotal)}</span>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-sm text-green-800 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          You qualify for free shipping!
        </p>
      </div>
    </div>
  );
}
