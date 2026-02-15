import { NextResponse } from 'next/server'
import { stripe } from '../checkout/route'

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent'],
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Extract order details
    const orderDetails = {
      sessionId: session.id,
      email: session.customer_email,
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
      shipping: session.shipping?.address
        ? `${session.shipping.address.line1}, ${session.shipping.address.city}, ${session.shipping.address.state} ${session.shipping.address.postal_code}, ${session.shipping.address.country}`
        : null,
      items: session.line_items?.data?.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.price?.unit_amount,
      })),
      createdAt: new Date(session.created * 1000).toISOString(),
    }

    return NextResponse.json(orderDetails)
  } catch (error) {
    console.error('Error fetching order details:', error)
    return NextResponse.json(
      { error: 'Error fetching order details' },
      { status: 500 }
    )
  }
}
