"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/CartDropdown"
import { ArrowLeft, Trash2, RefreshCw } from "lucide-react"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const shipping = cartTotal > 100 ? 0 : 15
  const tax = cartTotal * 0.08 // 8% tax
  const orderTotal = cartTotal + shipping + tax

  const handleApplyPromo = () => {
    if (!promoCode) return

    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false)
      setPromoCode("")
      // In a real app, you would apply the discount here
    }, 1000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="text-center py-16">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any bicycles to your cart yet.</p>
          </div>
          <Button size="lg" asChild>
            <Link href="/bicycles">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Cart Items ({cartItems.length})</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/bicycles">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative h-24 sm:h-32 w-full sm:w-32 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          className="text-gray-400 hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      <div className="mt-2 flex items-center">
                        <span className="text-sm text-gray-500 mr-4">Quantity:</span>
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-3 py-1 border-r"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            className="px-3 py-1 border-l"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-end">
                        <span className="text-sm text-gray-500">${item.price.toFixed(2)} each</span>
                        <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                <Button variant="outline" onClick={handleApplyPromo} disabled={isApplyingPromo || !promoCode}>
                  {isApplyingPromo ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Apply"}
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">${orderTotal.toFixed(2)}</span>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <div className="mt-4 text-xs text-gray-500 text-center">Shipping is free for orders over $100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

