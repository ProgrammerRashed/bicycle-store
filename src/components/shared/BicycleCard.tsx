import { useState } from "react"
import { CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const BicycleCard = ({ bicycle }: any) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <div className='border rounded overflow-hidden'>
            <div key={bicycle.id} className="overflow-hidden p-0 gap-0">
                <div className="relative h-60 w-full bg-gray-100">
                    {/* Placeholder */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 animate-pulse bg-gray-300" />
                    )}
                    
                    <img
                    src={bicycle.image_gallery[0] || "/placeholder.svg"}
                    alt={bicycle.name}
                    className={`h-full w-full object-cover transition-opacity duration-300 ${
                        imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    />

                    <Badge
                        className="rounded hover:bg-primary absolute top-2 right-2"
                        variant={bicycle.in_stock ? "default" : "destructive"}
                    >
                        {bicycle.in_stock ? "In Stock" : "Out of Stock"}
                    </Badge>

                    <div className="bg-white px-3 py-1 rounded absolute bottom-2 left-2 flex gap-2">
                        <Star fill="orange" stroke="orange" size={20} />
                        <p className="font-bold">{bicycle.reviews}</p>
                    </div>
                </div>

                <div className="card-body p-4">
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
                        <Link to={`/products/${bicycle._id}`}>View Details</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BicycleCard
