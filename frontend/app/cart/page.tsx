import { Metadata } from 'next';
import Link from 'next/link';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

export const metadata: Metadata = {
  title: 'Shopping Cart - Modern E-Commerce Store',
  description: 'Review your cart and proceed to checkout',
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CartItem />
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <CartSummary />
              
              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className="block w-full bg-black text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/"
                  className="block w-full bg-gray-100 text-gray-900 text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
