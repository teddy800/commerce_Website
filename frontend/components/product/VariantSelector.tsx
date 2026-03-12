'use client';

import { useState } from 'react';

interface Variant {
  id: string;
  title: string;
  inventory_quantity: number;
  prices: Array<{ amount: number }>;
}

interface VariantSelectorProps {
  variants: Variant[];
}

export default function VariantSelector({ variants }: VariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]?.id);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Variant
        </label>
        <div className="grid grid-cols-2 gap-3">
          {variants.map((variant) => {
            const isSelected = selectedVariant === variant.id;
            const isOutOfStock = variant.inventory_quantity === 0;

            return (
              <button
                key={variant.id}
                onClick={() => !isOutOfStock && setSelectedVariant(variant.id)}
                disabled={isOutOfStock}
                className={`relative px-4 py-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                  isSelected
                    ? 'border-black bg-black text-white'
                    : isOutOfStock
                    ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                }`}
              >
                {variant.title}
                {isOutOfStock && (
                  <span className="block text-xs mt-1">Out of Stock</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
