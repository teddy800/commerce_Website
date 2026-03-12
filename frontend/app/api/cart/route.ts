import { NextRequest, NextResponse } from 'next/server';
import { medusaAPI } from '@/lib/api/medusa';

export async function GET(request: NextRequest) {
  try {
    const cartId = request.cookies.get('cart_id')?.value;

    if (!cartId) {
      return NextResponse.json({ cart: null });
    }

    const cart = await medusaAPI.getCart(cartId);

    return NextResponse.json({ cart });
  } catch (error: any) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, quantity = 1 } = body;

    let cartId: string = request.cookies.get('cart_id')?.value || '';

    // Create cart if it doesn't exist
    if (!cartId) {
      const newCart = await medusaAPI.createCart();
      cartId = newCart.id;
    }

    // Add item to cart
    const cart = await medusaAPI.addToCart(cartId, variantId, quantity);

    const response = NextResponse.json({ cart });
    response.cookies.set('cart_id', cartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { lineItemId, quantity } = body;
    const cartId = request.cookies.get('cart_id')?.value;

    if (!cartId) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const cart = await medusaAPI.updateLineItem(cartId, lineItemId, quantity);

    return NextResponse.json({ cart });
  } catch (error: any) {
    console.error('Update cart error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lineItemId = searchParams.get('lineItemId');
    const cartId = request.cookies.get('cart_id')?.value;

    if (!cartId) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    if (!lineItemId) {
      return NextResponse.json({ error: 'Line item ID required' }, { status: 400 });
    }

    const cart = await medusaAPI.removeFromCart(cartId, lineItemId);

    return NextResponse.json({ cart });
  } catch (error: any) {
    console.error('Remove from cart error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}
