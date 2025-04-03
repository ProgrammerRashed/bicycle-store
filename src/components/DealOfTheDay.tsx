"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, ShoppingCart } from "lucide-react"

// Mock data for deal of the day
const dealOfTheDay = {
  id: 201,
  name: "Premium Carbon Road Bike",
  brand: "VeloRacer",
  originalPrice: 3499.99,
  salePrice: 2799.99,
  discount: 20, // percentage
  description:
    "Experience the ultimate road performance with our premium carbon fiber road bike. Featuring aerodynamic design, Shimano Ultegra components, and hydraulic disc brakes for superior control.",
  features: [
    "Full carbon fiber frame and fork",
    "Shimano Ultegra 22-speed drivetrain",
    "Hydraulic disc brakes",
    "Tubeless-ready wheelset",
    "Internal cable routing",
  ],
  image: "/products/product-1.webp",
  endTime: new Date(new Date().setHours(23, 59, 59, 999)), // End of today
}

export default function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = dealOfTheDay.endTime.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Deal has ended
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  const savings = dealOfTheDay.originalPrice - dealOfTheDay.salePrice

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Deal of the Day</h2>
          <p className="text-gray-500 mt-2">Special offer valid until midnight</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-80 lg:h-auto">
              <Image
                src={dealOfTheDay.image || "/placeholder.svg"}
                alt={dealOfTheDay.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-lg">
                  {dealOfTheDay.discount}% OFF
                </Badge>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{dealOfTheDay.name}</h3>
                  <p className="text-gray-500 mb-4">{dealOfTheDay.brand}</p>

                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-primary mr-2">${dealOfTheDay.salePrice.toFixed(2)}</span>
                    <span className="text-xl text-gray-500 line-through">${dealOfTheDay.originalPrice.toFixed(2)}</span>
                    <span className="ml-2 text-green-600 font-medium">Save ${savings.toFixed(2)}</span>
                  </div>

                  <p className="text-gray-700 mb-4">{dealOfTheDay.description}</p>

                  <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-1">
                    {dealOfTheDay.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Offer ends in:</span>
                    </div>
                    <div className="flex justify-center space-x-3">
                      <div className="bg-primary text-white rounded-md px-3 py-2 w-16 text-center">
                        <span className="text-xl font-bold">{formatTime(timeLeft.hours)}</span>
                        <p className="text-xs">Hours</p>
                      </div>
                      <div className="bg-primary text-white rounded-md px-3 py-2 w-16 text-center">
                        <span className="text-xl font-bold">{formatTime(timeLeft.minutes)}</span>
                        <p className="text-xs">Minutes</p>
                      </div>
                      <div className="bg-primary text-white rounded-md px-3 py-2 w-16 text-center">
                        <span className="text-xl font-bold">{formatTime(timeLeft.seconds)}</span>
                        <p className="text-xs">Seconds</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1" asChild>
                      <Link href={`/products/${dealOfTheDay.id}`}>View Details</Link>
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

