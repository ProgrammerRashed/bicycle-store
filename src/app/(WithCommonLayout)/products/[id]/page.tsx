"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart, type CartItem } from "@/components/CartDropdown"
import { ShoppingCart, Heart, Truck, Shield, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

// Mock data for bicycle details
const bicycles = [
  {
    id: 1,
    name: "Mountain Explorer Pro",
    brand: "TrekMaster",
    price: 1299.99,
    category: "Mountain",
    model: "2023",
    color: "Matte Black",
    frameSize: ["S", "M", "L", "XL"],
    wheelSize: "29 inch",
    material: "Aluminum Alloy",
    suspension: "Front Suspension",
    brakes: "Hydraulic Disc",
    gears: "21-Speed Shimano",
    weight: "13.5 kg",
    description:
      "The Mountain Explorer Pro is designed for serious trail enthusiasts. With its lightweight aluminum frame, responsive suspension, and reliable braking system, this bike offers exceptional performance on challenging terrains. The ergonomic design ensures comfort during long rides, while the durable construction guarantees longevity.",
    features: [
      "Lightweight aluminum frame for easy handling",
      "Responsive front suspension for smooth rides on rough terrain",
      "Hydraulic disc brakes for reliable stopping power",
      "21-speed Shimano gears for versatile riding",
      "Ergonomic saddle and grips for extended comfort",
      "Tubeless-ready wheels for reduced puncture risk",
    ],
    stock: 15,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    inStock: true,
  },
  {
    id: 2,
    name: "Urban Glide 7",
    brand: "CityRider",
    price: 899.99,
    category: "Commuter",
    model: "2023",
    color: "Midnight Blue",
    frameSize: ["S", "M", "L"],
    wheelSize: "28 inch",
    material: "Chromoly Steel",
    suspension: "None",
    brakes: "Mechanical Disc",
    gears: "8-Speed Internal Hub",
    weight: "12.2 kg",
    description:
      "The Urban Glide 7 is the perfect companion for city commuters. Its sleek design combines style with functionality, featuring an internal gear hub for low maintenance and a comfortable upright riding position. The integrated fenders and chain guard keep you clean in all weather conditions, while the puncture-resistant tires ensure a worry-free ride.",
    features: [
      "Durable chromoly steel frame with urban geometry",
      "Low-maintenance 8-speed internal gear hub",
      "Integrated fenders and chain guard for all-weather riding",
      "Puncture-resistant tires for reliable commuting",
      "Upright riding position for comfort and visibility",
      "Integrated rack mounts for carrying capacity",
    ],
    stock: 8,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    inStock: true,
  },
]

export default function BicycleDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const id = Number.parseInt(params.id)
  const bicycle = bicycles[0]

  const [selectedSize, setSelectedSize] = useState("")
  const [mainImage, setMainImage] = useState(0)

  if (!bicycle) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Bicycle not found</h1>
        <p className="mb-8">The bicycle you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/products")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Bicycles
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize && bicycle.frameSize.length > 0) {
      toast.error('You need to select a frame size before adding to cart')
      return
    }

    const cartItem: CartItem = {
      id: bicycle.id,
      name: bicycle.name,
      price: bicycle.price,
      quantity: 1,
      image: bicycle.images[0],
      size: selectedSize,
    }

    addToCart(cartItem)
  }

  const handleBuyNow = () => {
    if (!selectedSize && bicycle.frameSize.length > 0) {
      toast.error('You need to select a frame size before proceeding to checkout')
      return
    }

    const cartItem: CartItem = {
      id: bicycle.id,
      name: bicycle.name,
      price: bicycle.price,
      quantity: 1,
      image: bicycle.images[0],
      size: selectedSize,
    }

    addToCart(cartItem)
    router.push("/checkout")
  }

  const handleAddToWishlist = () => {
    toast.success(`${bicycle.name} has been added to your wishlist`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/bicycles")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Bicycles
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          <div className="relative h-80 sm:h-96 md:h-[500px] w-full mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={bicycle.images[mainImage] || "/placeholder.svg"}
              alt={bicycle.name}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex space-x-4">
            {bicycle.images.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 border-2 rounded-md overflow-hidden ${
                  mainImage === index ? "border-primary" : "border-gray-200"
                }`}
                onClick={() => setMainImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${bicycle.name} - view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-sm">
              {bicycle.category}
            </Badge>
            <Badge variant={bicycle.inStock ? "default" : "destructive"}>
              {bicycle.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold mb-2">{bicycle.name}</h1>

          <div className="flex items-center text-gray-500 mb-4">
            <span className="mr-4">Brand: {bicycle.brand}</span>
            <span>Model: {bicycle.model}</span>
          </div>

          <p className="text-3xl font-bold mb-6">${bicycle.price.toFixed(2)}</p>

          <p className="text-gray-700 mb-6">{bicycle.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Frame Size</h3>
            <div className="flex flex-wrap gap-2">
              {bicycle.frameSize.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button className="flex-1" onClick={handleAddToCart} disabled={!bicycle.inStock}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="secondary" className="flex-1" onClick={handleBuyNow} disabled={!bicycle.inStock}>
              Buy Now
            </Button>
            <Button variant="outline" size="icon" onClick={handleAddToWishlist}>
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-gray-500" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-gray-500" />
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Specifications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Frame</h3>
            <p>{bicycle.material}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Wheel Size</h3>
            <p>{bicycle.wheelSize}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Suspension</h3>
            <p>{bicycle.suspension}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Brakes</h3>
            <p>{bicycle.brakes}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Gears</h3>
            <p>{bicycle.gears}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Weight</h3>
            <p>{bicycle.weight}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Color</h3>
            <p>{bicycle.color}</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          {bicycle.features.map((feature, index) => (
            <li key={index} className="text-gray-700">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

