'use client';

interface OrderReviewProps {
  shipping: any;
  payment: any;
  items: any[];
  total: number;
  onSubmit: () => void;
  onBack: () => void;
}

export default function OrderReview({
  shipping,
  payment,
  items,
  total,
  onSubmit,
  onBack,
}: OrderReviewProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>
      </div>

      {/* Shipping Information */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
        <p className="text-sm text-gray-600">
          {shipping.firstName} {shipping.lastName}<br />
          {shipping.address}<br />
          {shipping.city}, {shipping.state} {shipping.zipCode}<br />
          {shipping.country}
        </p>
      </div>

      {/* Payment Information */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
        <p className="text-sm text-gray-600">
          Card ending in {payment.cardNumber.slice(-4)}<br />
          {payment.cardName}
        </p>
      </div>

      {/* Order Items */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.title} × {item.quantity}
              </span>
              <span className="font-medium text-gray-900">
                {formatPrice(item.unit_price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">{formatPrice(total * 0.1)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-gray-900 text-lg">
              {formatPrice(total * 1.1)}
            </span>
          </div>
        </div>
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
          type="button"
          onClick={onSubmit}
          className="bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
