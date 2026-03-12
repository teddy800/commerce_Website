'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderReview from '@/components/checkout/OrderReview';
import { useCartStore } from '@/lib/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total } = useCartStore();
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentSubmit = (data: any) => {
    setPaymentData(data);
    setStep(3);
  };

  const handleOrderSubmit = async () => {
    try {
      // Create order in Medusa
      const response = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipping: shippingData,
          payment: paymentData,
          items,
        }),
      });

      const order = await response.json();

      if (order.id) {
        router.push(`/order-confirmation/${order.id}`);
      }
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <a
            href="/"
            className="inline-block bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Shipping', 'Payment', 'Review'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step > index + 1
                      ? 'bg-green-500 text-white'
                      : step === index + 1
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
                {index < 2 && (
                  <div className="w-16 h-1 mx-4 bg-gray-200">
                    <div
                      className={`h-full ${step > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Forms */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {step === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
          {step === 2 && <PaymentForm onSubmit={handlePaymentSubmit} onBack={() => setStep(1)} />}
          {step === 3 && (
            <OrderReview
              shipping={shippingData}
              payment={paymentData}
              items={items}
              total={total}
              onSubmit={handleOrderSubmit}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
