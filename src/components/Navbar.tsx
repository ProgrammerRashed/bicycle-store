"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartDropdown from "@/components/CartDropdown"
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() 

  const isActive = (path : string) => pathname === path ? "border-primary text-primary" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/logo.png" alt="Bicycle Store Logo" width={40} height={40} className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-primary">BikeHub</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive("/")}`}>
                Home
              </Link>
              <Link href="/products" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive("/products")}`}>
                All Bicycles
              </Link>
              <Link href="/about-us" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive("/about-us")}`}>
                About
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <CartDropdown />
            <Button variant="default" size="sm" className="ml-2">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
          <div className="flex items-center md:hidden">
            <CartDropdown />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive("/")}`}>
              Home
            </Link>
            <Link href="/products" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive("/products")}`}>
              All Bicycles
            </Link>
            <Link href="/about-us" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive("/about-us")}`}>
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Button variant="outline" size="sm" className="mr-2">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
                <Button variant="default" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
