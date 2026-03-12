'use client';

import { useState } from 'react';

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

interface ShippingMethodSelectorProps {
  onSelect: (method: ShippingMethod) => void;
  selectedMethodId?: string;
}

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivery in 5-7 business days',
    price: 500, // $5.00
    estimatedDays: '5-7 days',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivery in 2-3 business days',
    price: 1500, // $15.00
    estimatedDays: '2-3 days',
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day delivery',
    price: 2500, // $25.00
    estimatedDays: '1 day',
  },
];

export default function ShippingMethodSelector({
  onSelect,
  selectedMethodId,
}: ShippingMethodSelectorProps) {
  const [selected, setSelected] = useState<string>(selectedMethodId || 'standard');

  const handleSelect = (method: ShippingMethod) => {
    setSelected(method.id);
    onSelect(method);
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
      {SHIPPING_METHODS.map((method) => (
        <div
          key={method.id}
          onClick={() => handleSelect(method)}
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            selected === method.id
              ? 'border-black bg-gray-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <input
                type="radio"
                name="shippingMethod"
                checked={selected === method.id}
                onChange={() => handleSelect(method)}
                className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black"
              />
              <div className="ml-3">
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-gray-600">{method.description}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Estimated delivery: {method.estimatedDays}
                </div>
              </div>
            </div>
            <div className="font-semibold">{formatPrice(method.price)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
