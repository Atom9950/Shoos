'use client'
import { useCart } from '@/hooks/use-cart'
import React, { useState } from 'react'
import Checkout from '../checkout'
import { Button } from '../button'


type Props = {
  product?: any
}

const ProductAction = ({ product }: Props) => {
  const {
    items: cartItems,
    addItem: addToCart,
    removeItem: removeFromCart,
    updateQuantity,
    cartTotal,
    isOpen,
    setIsOpen,
  } = useCart()
  
  const [loading, setLoading] = useState(false)

  const currProductQuantity =
    cartItems.find((item) => item.id === product?.id)?.quantity || 0

  const handleBuyNow = async () => {
    if (!product) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.images[0]?.src,
          }],
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await (await import('@stripe/stripe-js')).loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      )
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-[#F4F4F5] p-6 sticky top-20 flex flex-col h-[80vh]">
      <div>
        <div className="grid grid-cols-3 gap-4 pb-2 border-b text-base font-medium">
          <div>Product</div>
          <div className="text-center">Quantity</div>
          <div className="text-right">Price</div>
        </div>

        {/* CARt Items */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-3 gap-4 text-base font-normal py-4"
          >
            <div>{item.name}</div>
            <div className="text-center">{item.quantity}</div>
            <div className="text-right">${item.price * item.quantity}</div>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <div>Subtotal</div>
          <div className="text-right">${cartTotal || 0}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {product && (
          <Button 
            className="w-full bg-black text-white hover:bg-gray-800"
            size="lg"
            disabled={loading || currProductQuantity > 1}
            onClick={handleBuyNow}
          >
            {loading ? 'Processing...' : 'Buy Now'}
          </Button>
        )}
        <Checkout />
      </div>
    </div>
  )
}

export default ProductAction