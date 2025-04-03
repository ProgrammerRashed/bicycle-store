"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for featured bicycles
const featuredBicycles = [
  {
    id: 1,
    name: "Mountain Explorer Pro",
    brand: "TrekMaster",
    price: 1299.99,
    category: "Mountain",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 2,
    name: "Urban Glide 7",
    brand: "CityRider",
    price: 899.99,
    category: "Commuter",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 3,
    name: "SpeedForce Elite",
    brand: "VeloRacer",
    price: 2499.99,
    category: "Road",
    image: "/products/product-1.webp",
    inStock: false,
  },
  {
    id: 4,
    name: "Trail Blazer X3",
    brand: "TrekMaster",
    price: 1599.99,
    category: "Mountain",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 5,
    name: "Kids Adventure 20",
    brand: "JuniorRide",
    price: 349.99,
    category: "Kids",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 6,
    name: "Electric Commuter Plus",
    brand: "PowerPedal",
    price: 1899.99,
    category: "Electric",
    image: "/products/product-1.webp",
    inStock: true,
  },
]

export default function FeaturedBicycles() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Bicycles</h2>
          <Button variant="outline" asChild>
            <Link href="/products">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBicycles.map((bicycle) => (
            <Card key={bicycle.id} className="overflow-hidden p-0 gap-0">
              <div className="relative h-full min-h-56 w-full">
                <Image src={bicycle.image || "/products/product-1.webp"} alt={bicycle.name} fill className="h-full w-full object-cover" />
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{bicycle.name}</CardTitle>
                  <Badge variant={bicycle.inStock ? "default" : "destructive"}>
                    {bicycle.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{bicycle.brand}</span>
                  <span>{bicycle.category}</span>
                </div>
                <p className="text-xl font-bold">${bicycle.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" asChild>
                  <Link href={`/products/${bicycle.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

