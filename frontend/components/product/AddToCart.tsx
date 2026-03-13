'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { showToast } from '@/components/common/Toast';

interface AddToCartProps {
  productId?: string;
  variantId?: string;
  inventory?: number;
}

export default function AddToCart({ productId: _productId, variantId, inventory = 10 }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = async () => {
    if (!variantId) return;

    setLoading(true);
    try {
      // Create a mock LineItem for the cart
      const lineItem = {
        id: variantId,
        cart_id: '',
        product_id: _productId || '',
        variant_id: variantId,
        title: 'Product',
        quantity,
        unit_price: 0,
        total: 0,
      };
      addItem(lineItem);
      // Show success toast
      showToast('Added to cart!', 'success');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      showToast('Failed to add to cart', 'error');
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = () => {
    if (quantity < inventory) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center space-x-3">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          <input
            type="number"
            min="1"
            max={inventory}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(inventory, parseInt(e.target.value) || 1)))}
            className="w-20 h-10 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />

          <button
            onClick={incrementQuantity}
            disabled={quantity >= inventory}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <span className="text-sm text-gray-600">
            {inventory} available
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading || !variantId}
        className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 animate-pulse-subtle"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
      </button>

      {/* Buy Now Button */}
      <button
        className="w-full bg-gray-100 text-gray-900 py-4 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all hover:scale-105"
      >
        Buy Now
      </button>
    </div>
  );
}
