import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify webhook signature
    const signature = request.headers.get('x-payload-signature')
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }

    // Handle different webhook events
    if (body.event === 'products.change') {
      // Revalidate product pages
      revalidatePath('/products')
      revalidatePath('/products/[slug]')
    }

    if (body.event === 'homepage.change') {
      // Revalidate homepage
      revalidatePath('/')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
