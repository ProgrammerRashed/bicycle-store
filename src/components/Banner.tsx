"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const bannerItems = [
  {
    id: 1,
    title: "Premium Mountain Bikes",
    description: "Explore the wilderness with our high-performance mountain bikes",
    image: "/banner-1.webp",
    cta: "Shop Mountain Bikes",
    link: "/bicycles?category=mountain",
  },
  {
    id: 2,
    title: "Urban Commuter Collection",
    description: "Stylish and practical bikes for your daily commute",
    image: "/banner-2.webp",
    cta: "Shop Commuter Bikes",
    link: "/bicycles?category=commuter",
  },
  {
    id: 3,
    title: "Kids Bikes Sale",
    description: "Get 20% off on all kids bikes this month",
    image: "/banner-3.webp",
    cta: "Shop Kids Bikes",
    link: "/bicycles?category=kids",
  },
]

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerItems.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[500px] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerItems.map((item) => (
          <div key={item.id} className="min-w-full h-full relative">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
                <p className="text-xl mb-6">{item.description}</p>
                <Button size="lg" asChild>
                  <a href={item.link}>{item.cta}</a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

