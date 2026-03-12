import { NextRequest, NextResponse } from 'next/server';
import { medusaAPI } from '@/lib/api/medusa';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId } = body;

    if (!cartId) {
      return NextResponse.json({ error: 'Cart ID required' }, { status: 400 });
    }

    // Complete the cart and create order
    const order = await medusaAPI.createOrder(cartId);

    // Clear cart cookie
    const response = NextResponse.json({ order });
    response.cookies.delete('cart_id');

    return response;
  } catch (error: any) {
    console.error('Complete checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to complete checkout' },
      { status: 500 }
    );
  }
}
