'use client'

import Link from 'next/link'

export default function OrdersPage() {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-03-10',
      total: 89.97,
      status: 'Delivered',
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2024-03-05',
      total: 59.99,
      status: 'Shipped',
      items: 1,
    },
  ]

  return (
    <div className="container-max py-12">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No orders yet</p>
          <Link href="/products" className="text-accent hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-semibold">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                    {order.status}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link href={`/account/orders/${order.id}`} className="text-accent hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
