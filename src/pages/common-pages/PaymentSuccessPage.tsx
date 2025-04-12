import { CheckCircle, Home, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Payment Successful!</h1>
          <p className="text-gray-600 text-center">
            Thank you for your purchase. We've sent a confirmation email with all the details.
          </p>



          <div className="w-full border-t border-gray-200 my-4"></div>

          <div className="flex flex-col lg:flex-row w-full gap-3">
            <Link
              to="/dashboard/orders"
              className="flex-1 bg-primary hover:bg-primary text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              View Order
            </Link>
            <Link
              to="/products"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

