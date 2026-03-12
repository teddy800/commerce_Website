import { NextRequest, NextResponse } from 'next/server';

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Destructure but don't use shipping, payment, items directly
    // They would be used for validation or additional processing
    const { shipping: _shipping, payment: _payment, items: _items } = body;

    // Get cart ID from cookies or create new cart
    const cartId = request.cookies.get('cart_id')?.value;

    if (!cartId) {
      return NextResponse.json(
        { message: 'No cart found' },
        { status: 400 }
      );
    }

    // Complete cart and create order
    const response = await fetch(`${MEDUSA_URL}/store/carts/${cartId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Order creation failed' },
        { status: response.status }
      );
    }

    // Clear cart cookie
    const res = NextResponse.json({ order: data.data });
    res.cookies.delete('cart_id');

    return res;
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the order' },
      { status: 500 }
    );
  }
}
