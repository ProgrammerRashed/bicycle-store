"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import BicycleCard from "@/components/BicycleCard"


// Mock data for bicycles
const allBicycles = [
  {
    id: 1,
    name: "Mountain Explorer Pro",
    brand: "TrekMaster",
    price: 1299.99,
    category: "Mountain",
    model: "2023",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 2,
    name: "Urban Glide 7",
    brand: "CityRider",
    price: 899.99,
    category: "Commuter",
    model: "2023",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 3,
    name: "SpeedForce Elite",
    brand: "VeloRacer",
    price: 2499.99,
    category: "Road",
    model: "2023",
    image: "/products/product-1.webp",
    inStock: false,
  },
  {
    id: 4,
    name: "Trail Blazer X3",
    brand: "TrekMaster",
    price: 1599.99,
    category: "Mountain",
    model: "2022",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 5,
    name: "Kids Adventure 20",
    brand: "JuniorRide",
    price: 349.99,
    category: "Kids",
    model: "2023",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 6,
    name: "Electric Commuter Plus",
    brand: "PowerPedal",
    price: 1899.99,
    category: "Electric",
    model: "2023",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 7,
    name: "Mountain Trail 5",
    brand: "TrekMaster",
    price: 999.99,
    category: "Mountain",
    model: "2022",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 8,
    name: "City Cruiser Deluxe",
    brand: "CityRider",
    price: 749.99,
    category: "Commuter",
    model: "2022",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 9,
    name: "Road Racer Pro",
    brand: "VeloRacer",
    price: 1899.99,
    category: "Road",
    model: "2022",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 10,
    name: "Kids Explorer 16",
    brand: "JuniorRide",
    price: 299.99,
    category: "Kids",
    model: "2022",
    image: "/products/product-1.webp",
    inStock: false,
  },
  {
    id: 11,
    name: "Electric Mountain X1",
    brand: "PowerPedal",
    price: 2299.99,
    category: "Electric",
    model: "2023",
    image: "/products/product-1.webp",
    inStock: true,
  },
  {
    id: 12,
    name: "Hybrid Commuter 8",
    brand: "CityRider",
    price: 1199.99,
    category: "Commuter",
    model: "2023",
    image: "/products/product-1.webp",
    inStock: true,
  },
]

// Filter options
const brands = ["TrekMaster", "CityRider", "VeloRacer", "JuniorRide", "PowerPedal"]
const categories = ["Mountain", "Road", "Commuter", "Kids", "Electric"]
const models = ["2023", "2022", "2021"]


const ProductPage = () => {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || ""

  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [showInStock, setShowInStock] = useState(false)
  const [filteredBicycles, setFilteredBicycles] = useState(allBicycles)

  // Apply filters
  useEffect(() => {
    let result = allBicycles

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (bike) =>
          bike.name.toLowerCase().includes(term) ||
          bike.brand.toLowerCase().includes(term) ||
          bike.category.toLowerCase().includes(term),
      )
    }

    // Price range filter
    result = result.filter((bike) => bike.price >= priceRange[0] && bike.price <= priceRange[1])

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((bike) => selectedBrands.includes(bike.brand))
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((bike) => selectedCategories.includes(bike.category))
    }

    // Model filter
    if (selectedModels.length > 0) {
      result = result.filter((bike) => selectedModels.includes(bike.model))
    }

    // In stock filter
    if (showInStock) {
      result = result.filter((bike) => bike.inStock)
    }

    setFilteredBicycles(result)
  }, [searchTerm, priceRange, selectedBrands, selectedCategories, selectedModels, showInStock])

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleModelChange = (model: string) => {
    setSelectedModels((prev) => (prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setPriceRange([0, 3000])
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedModels([])
    setShowInStock(false)
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold mb-8">All Bicycles</h1>

    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar filters */}
      <div className="w-full md:w-64 bg-gray-50 p-4 rounded-lg">
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Search</h3>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search bicycles..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="px-2">
            <Slider
              defaultValue={[0, 3000]}
              max={3000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Brand</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandChange(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="ml-2 text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={`category-${category}`} className="ml-2 text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Model Year</h3>
          <div className="space-y-2">
            {models.map((model) => (
              <div key={model} className="flex items-center">
                <Checkbox
                  id={`model-${model}`}
                  checked={selectedModels.includes(model)}
                  onCheckedChange={() => handleModelChange(model)}
                />
                <Label htmlFor={`model-${model}`} className="ml-2 text-sm">
                  {model}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <Checkbox
              id="in-stock"
              checked={showInStock}
              onCheckedChange={(checked) => setShowInStock(checked as boolean)}
            />
            <Label htmlFor="in-stock" className="ml-2 text-sm">
              In Stock Only
            </Label>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Bicycle grid */}
      <div className="flex-1">
        {filteredBicycles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bicycles found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBicycles.map((bicycle) => (
              <BicycleCard key={bicycle.id} bicycle={bicycle} />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default ProductPage
