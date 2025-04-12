import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AppDownload() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter a valid email address.")
      return
    }

    // Here you could send the email to your API/server
    toast.success("Thank you for subscribing!")
    setEmail("")
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-6">Download the App</h2>

          <div className="flex justify-center gap-4 mb-16">
            <a href="#" className="flex bg-primary text-white rounded-lg px-4 py-3 items-center">
              <svg viewBox="0 0 24 24" width="24" height="24" className="mr-3 fill-current">
                <path d="M18.71 19.5c-..." />
              </svg>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-base font-semibold">App Store</div>
              </div>
            </a>

            <a href="#" className="flex bg-primary text-white rounded-lg px-4 py-3 items-center">
              <svg viewBox="0 0 24 24" width="24" height="24" className="mr-3 fill-current">
                <path d="M3,20.5V3.5C3..." />
              </svg>
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-base font-semibold">Google Play</div>
              </div>
            </a>
          </div>

          <h3 className="text-2xl font-bold mb-4">Stay in touch with us</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our mailing list or follow us & stay informed about our news and updates.
          </p>

          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto mb-8 bg-white">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address here"
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none bg-primary">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
