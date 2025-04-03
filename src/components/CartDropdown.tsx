"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, X, Trash2 } from "lucide-react"

// Define cart item type
export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  size?: string
}

// Mock initial cart items
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Mountain Explorer Pro",
    price: 1299.99,
    quantity: 1,
    image: "/placeholder.svg",
    size: "M",
  },
  {
    id: 2,
    name: "Urban Glide 7",
    price: 899.99,
    quantity: 1,
    image: "/placeholder.svg",
    size: "L",
  },
]

// Create a context to manage cart state globally
import { createContext, useContext } from "react"
import { toast } from "sonner"

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  // Calculate cart count and total
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size,
      )

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += item.quantity

        toast.success(`${item.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`)

        return updatedItems
      } else {
        // Add new item if it doesn't exist
        toast.success(`${item.name} has been added to your cart`)

        return [...prevItems, item]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)

      if (itemToRemove) {
        toast.success(`${itemToRemove.name} has been removed from your cart`)
      }

      return prevItems.filter((item) => item.id !== id)
    })
  }

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
    toast.success("All items have been removed from your cart")
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export default function CartDropdown() {
  const { cartItems, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex justify-between items-center p-4">
          <h3 className="font-medium">Shopping Cart ({cartCount})</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <DropdownMenuSeparator />

        {cartItems.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">Your cart is empty</div>
        ) : (
          <>
            <ScrollArea className="h-[300px] p-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                      <div className="flex items-center mt-1">
                        <button
                          className="h-5 w-5 rounded border flex items-center justify-center text-xs"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <button
                          className="h-5 w-5 rounded border flex items-center justify-center text-xs"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <span className="ml-auto text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <DropdownMenuSeparator />

            <div className="p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

