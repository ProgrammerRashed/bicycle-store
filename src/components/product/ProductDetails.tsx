


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Truck, Shield, ArrowLeft, Loader } from "lucide-react"
import { toast } from "sonner"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";


export default function BicycleDetailsPage() {
  const [mainImage, setMainImage] = useState(0)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const {
    data: productResponse,
    isLoading,
  } = useGetSingleProductQuery(id as string);

  const bicycle = productResponse?.data ?? null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-green-600" />
      </div>
    );
  }


  if (!bicycle) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Bicycle not found</h1>
        <p className="mb-8">The bicycle you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Bicycles
        </Link>
      </div>
    )
  }


  const handleBuyNow = () => {
    if (!bicycle.in_stock) {
      toast.error("This bicycle is currently out of stock.");
      return;
    }

    navigate(`/checkout/${bicycle._id}`);


  }


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Bicycles
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          <div className="relative h-80 sm:h-96 md:h-[500px] w-full mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={bicycle.image_gallery[mainImage] || "/placeholder.svg"}
              alt={bicycle.name}
              className="object-cover h-full w-full"
            />
          </div>

          <div className="flex space-x-4">
            {bicycle.image_gallery?.map((image: string, index: number) => (
              <button
                key={index}
                className={`relative h-20 w-20 border-2 rounded-md overflow-hidden ${mainImage === index ? "border-primary" : "border-gray-200"
                  }`}
                onClick={() => setMainImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${bicycle.name} - view ${index + 1}`}

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
            <Badge variant={bicycle.in_stock ? "default" : "destructive"}>
              {bicycle.in_stock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold mb-2">{bicycle.name}</h1>

          <div className="flex items-center text-gray-500 mb-4">
            <span className="mr-4">Brand: {bicycle.brand}</span>
            <span>Model: {bicycle.model}</span>
          </div>

          <p className="text-3xl font-bold mb-6">${bicycle.price.toFixed(2)}</p>

          <p className="text-gray-700 mb-6">{bicycle.description}</p>


          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* onClick={handleBuyNow}  */}
            <Button className="flex-1" onClick={handleBuyNow}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Now
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
      {
        bicycle?.specifications?.length > 0 && (<div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
              bicycle?.specifications?.map((spec: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{spec.name}</h3>
                  <p>{spec.value}</p>
                </div>
              ))
            }
          </div>
        </div>)
      }


      {/* Features */}
      {
        bicycle?.key_features?.length > 0 && (<div>
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            {bicycle?.key_features.map((feature: string, index: number) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
        </div>)
      }

    </div>
  )
}
