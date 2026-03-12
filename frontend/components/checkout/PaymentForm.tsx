'use client';

import { useState } from 'react';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export default function PaymentForm({ onSubmit, onBack }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Format card number
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5);
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Test Mode:</strong> Use card number 4242 4242 4242 4242 with any future expiry date and CVV.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Card Number *
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          required
          maxLength={19}
          placeholder="4242 4242 4242 4242"
          value={formData.cardNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
          Cardholder Name *
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          required
          placeholder="John Doe"
          value={formData.cardName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date *
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            required
            placeholder="MM/YY"
            maxLength={5}
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
            CVV *
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            required
            placeholder="123"
            maxLength={4}
            value={formData.cvv}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="saveCard"
          className="w-4 h-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label htmlFor="saveCard" className="text-sm text-gray-700">
          Save this card for future purchases
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-100 text-gray-900 py-3 px-8 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Review Order
        </button>
      </div>
    </form>
  );
}
