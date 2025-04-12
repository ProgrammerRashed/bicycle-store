import { cn } from "@/lib/utils";
import { Product } from "@/redux/features/product/productApi";
import {
  Star,
  MapPin,
  Gauge,
  Fuel,
  Settings,
  Users,
  DoorOpen,
  ArrowRight,
  HelpCircle,
  BookmarkCheck,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
interface ReviewsProps {
  product: Product & { _id: string };
}
const CarDetails: React.FC<ReviewsProps> = ({ product }) => {
  return (
    <div className="my-5 p-5 bg-white  rounded-lg shadow-md">
      <div className="flex items-center text-green-600 font-medium">
        <Star className="text-green-500 w-5 h-5" />
        <span className="ml-1 text-lg">{product.rating}</span>
        <span className="ml-1 text-gray-500">({product.reviews})</span>
        <div
          className={cn(
            "ml-4 flex items-center space-x-2 px-3 py-1 rounded-full border",
            product.quantity > 0
              ? "'bg-green-100 text-green-700 border-green-300'"
              : "bg-red-100 text-red-700 border-red-300"
          )}
        >
          {product.quantity > 0 ? (
            <>
              <BookmarkCheck className="w-4 h-4" />
              <span className="text-sm font-medium">In Stock</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Unavailable</span>
            </>
          )}
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mt-2">
        {product.name} - Modern compact sedan in blue color on beautiful dark
        wheels
      </h1>

      <div className="flex items-center text-gray-600 mt-2 space-x-4 text-sm">
        <span className="flex items-center">
          <MapPin className="mr-1 w-4 h-4" />
          {product.location}
        </span>
        <a href="#" className="text-blue-600 underline">
          Show on map
        </a>
        <span>|</span>
        <span className="flex items-center">
          <span className="font-medium">Fleet Code:</span>
          <a href="#" className="text-blue-600 underline ml-1">
            LVA-4125
          </a>
        </span>
      </div>

      <div className="flex gap-2 justify-between lg:flex-row flex-col">
        <div className="mt-4 p-4 bg-gray-100 rounded-lg grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4 w-full lg:w-[70%]">
          <div className="flex items-center bg-green-100 text-gray-800 p-3 rounded-md">
            <span className="text-lg mr-2 w-5 h-5">
              <Gauge />
            </span>
            {product.miles}
          </div>
          <div className="flex items-center bg-green-100 text-gray-800 p-3 rounded-md">
            <span className="text-lg mr-2 w-5 h-5">
              <Fuel />
            </span>
            {product.fuel}
          </div>
          <div className="flex items-center bg-green-100 text-gray-800 p-3 rounded-md">
            <span className="text-lg mr-2 w-5 h-5">
              <Settings />
            </span>
            {product.transmission}
          </div>
          <div className="flex items-center bg-green-100 text-gray-800 p-3 rounded-md">
            <span className="text-lg mr-2 w-5 h-5">
              <Users />
            </span>
            {product.seats}
          </div>
          <div className="flex items-center bg-green-100 text-gray-800 p-3 rounded-md">
            <span className="text-lg mr-2 w-5 h-5">
              <DoorOpen />
            </span>
            4 doors
          </div>
        </div>
        <div className="rounded-lg border w-full lg:w-[30%] mt-4">
          <h1 className="px-5  py-2 bg-gray-50 text-lg font-semibold border-b border-b-gray-200 ">
            Rent this Car
          </h1>

          <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
            <div className="bg-green-300 px-3 py-1 rounded-full mb-1 w-fit   text-sm">
              {product.quantity} cars Available
            </div>
            <div className="flex justify-between items-center text-lg font-medium text-gray-900">
              <span>Total Payable</span>
              <span className="text-xl font-bold text-black">
                ${product.price}
              </span>
            </div>

            <Link to={`/checkout/${product._id}`}>
              <button
                className="disabled:cursor-not-allowed w-full mt-4 bg-green-400 hover:bg-green-500 text-black font-medium py-3 rounded-lg flex items-center justify-center space-x-2 transition"
                disabled={product.quantity == 0}
              >
                <span>Book Now</span>
                <ArrowRight size={20} />
              </button>
            </Link>

            <div className="mt-4 flex justify-center items-center text-gray-600 text-sm">
              <HelpCircle className="mr-1" size={16} />
              <span className="hover:underline cursor-pointer">
                Need some help?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
