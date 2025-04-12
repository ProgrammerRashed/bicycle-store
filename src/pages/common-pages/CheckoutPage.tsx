import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useGetSingleProductQuery } from "@/redux/features/product/productApi"
import axios from "axios"
import { toast } from "sonner"
import { ShoppingBag, Phone, Mail, ShieldCheck, Minus, Plus, MapPin, Loader } from "lucide-react"
import UseActiveUser from "@/hook/UseActiveUser"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY as string)

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

const CheckoutPageInner = () => {
  const { id } = useParams()
  const { data: productresponse, isLoading } = useGetSingleProductQuery(id)
  const {user} = UseActiveUser()
  const product = productresponse?.data || []

  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [clientSecret, setClientSecret] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState(user?.email)
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity)
    }
  }, [product, quantity])

  useEffect(() => {
    if (totalPrice > 0) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
          amount: Math.round((totalPrice + totalPrice * 0.1) * 100),
        })
        .then(({ data }) => setClientSecret(data.clientSecret))
        .catch((err) => {
          console.error("Failed to create PaymentIntent:", err)
          toast.error("Failed to initialize payment. Try again.")
        })
    }
  }, [totalPrice])
  

  const handleQuantityChange = (value: number) => {
    if (!product) {
      toast.error("Product not found!")
      return
    }

    if (value > 0 && value <= product.stock) {
      setQuantity(value)
    }
    if (product.stock == value) {
      toast.warning(`${product.stock} stock available only!`)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setLoading(false)
      return
    }
    if (!clientSecret) {
      toast.error("Payment could not be initialized. Please refresh and try again.")
      setLoading(false)
      return
    }
    

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: name },
      },
    })

    if (error) {
      console.error(error.message)
      toast.error(error.message || "Payment failed. Please try again.")
      setLoading(false)
      return
    }

    if (!product) {
      toast.error("Product not found!")
      setLoading(false)
      return
    }

    if (paymentIntent?.status === "succeeded") {
      const orderData = {
        productId: product._id,
        productName: product.name,
        productImage: product.image_gallery[0] || "/placeholder.svg",
        productPrice: product.price,
        quantity,
        totalPrice,
        user: { name: name, email: user?.email },
        paymentStatus: "Pending",
        paymentId: paymentIntent.id,
      }

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData)
        toast.success("Order placed successfully")
        setLoading(false)
        navigate("/payment/success")
      } catch (err: any) {
        toast.error("Order could not be saved. Please try again.")
        setLoading(false)

      }
    }
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-green-600" />
      </div>
    )

  if (!product)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800">Product not found</h1>
        <p className="text-gray-600 mt-2">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    )

  return (
    <div className="bg-gray-50 min-h-screen pt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="hidden">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="john@example.com"
                        value={email}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h2>

                  <div className="border border-gray-300 rounded-lg p-4 bg-white">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                  </div>

                  <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                      Your payment information is secure and encrypted
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={loading || !stripe}
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin w-5 h-5 mr-2" />
                    </>
                  ) : (
                    <>Complete Order</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right column - Order summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={product.image_gallery[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                      <div className="mt-2 flex items-center">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-2 px-3 py-1 bg-gray-100 rounded-md text-gray-800 text-sm font-medium">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <p className="text-base font-medium text-gray-900">${product.price}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>VAT (10%)</p>
                    <p>${(totalPrice * 0.1).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
                    <p>Total</p>
                    <p>${(totalPrice + totalPrice * 0.1).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-200">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Need Help?</h3>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                      <span>123 Bike Street, Cycling City, CC 12345</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-primary" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      <span>info@bikehub.com</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Money Back Guarantee</p>
                        <p className="text-xs text-gray-500">within 30 days of purchase</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPageInner />
  </Elements>
)

export default CheckoutPage