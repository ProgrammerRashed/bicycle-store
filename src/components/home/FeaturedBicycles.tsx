import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import BicycleCard from "../shared/BicycleCard"
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { Product } from "@/utils/Interfaces";



export default function FeaturedBicycles() {
const SPECIAL_CATEGORIES = ["Featured"];

const {
  data: productsResponse,
} = useGetAllProductsQuery("");

const products: Product[] = productsResponse?.data || [];

// Extract special category products
const specialCategoryProducts = products.filter((product) =>
  product.special_category?.some((category) => SPECIAL_CATEGORIES.includes(category))
);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Bicycles</h2>
          <Button variant="outline" asChild>
            <Link to="/products">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialCategoryProducts.map((bicycle: any) => (
           <BicycleCard key={bicycle._id} bicycle={bicycle} />
          ))}
        </div>
      </div>
    </section>
  )
}

