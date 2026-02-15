'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Package } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided')
      setLoading(false)
      return
    }

    // Fetch order details from session
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch('/api/order-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch order details')
        }

        const data = await response.json()
        setOrderDetails(data)
      } catch (err) {
        console.error('Error fetching order details:', err)
        setError('Failed to load order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin mb-4">
              <Package className="w-12 h-12 mx-auto text-slate-400" />
            </div>
            <p className="text-slate-600">Processing your order...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <Link
              href="/"
              className="mt-4 inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-slate-600 mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>

            {sessionId && (
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600">Order ID</p>
                <p className="text-lg font-mono font-semibold text-slate-900 break-all">
                  {sessionId}
                </p>
              </div>
            )}

            {orderDetails && (
              <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-slate-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">{orderDetails.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-medium">
                      ₹{(orderDetails.amount / 100).toFixed(2)}
                    </span>
                  </div>
                  {orderDetails.shipping && (
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="font-medium">{orderDetails.shipping}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-slate-700">
              <p className="mb-2">
                <span className="font-semibold">What's next?</span>
              </p>
              <p>
                You'll receive a confirmation email shortly with your order details and tracking information.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Print Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
