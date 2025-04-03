import React from 'react'
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button'
import Link from 'next/link'
import { Star } from 'lucide-react'

const BicycleCard = ({ bicycle }: any) => {
    return (<div className='border rounded overflow-hidden'>
        <div key={bicycle.id} className="overflow-hidden p-0 gap-0">
            <div className="relative h-full min-h-56 w-full">
                <Image src={bicycle.image || "/products/product-1.webp"} alt={bicycle.name} fill className="h-full w-full object-cover" />
                <Badge className='rounded absolute top-2 right-2' variant={bicycle.inStock ? "default" : "destructive"}>
                    {bicycle.inStock ? "In Stock" : "Out of Stock"}
                </Badge>

                <div className='bg-white px-3 py-1 rounded absolute bottom-2 left-2 flex gap-2'>
                    <Star fill='orange' stroke='orange' size={20}/>
                    <p className='font-bold'>5</p>
                </div>
            </div>

            <div className='card-body  p-4'>
                <p className="text-xl font-bold">${bicycle.price.toFixed(2)}</p>

                <div className="flex justify-between items-start mt-2">
                    <CardTitle className="text-lg">{bicycle.name}</CardTitle>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                    <span>{bicycle.brand}</span>
                    <span>{bicycle.category}</span>
                </div>
            </div>


            <div className="card-footer pb-4 px-4">
                <Button className="w-full rounded" asChild>
                    <Link href={`/products/${bicycle.id}`}>View Details</Link>
                </Button>
            </div>
        </div>
    </div>
    )
}

export default BicycleCard