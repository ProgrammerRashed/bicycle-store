import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const AboutUsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">About BikeHub</h1>
          <p className="text-lg text-gray-700 mb-6">
            Founded in 2010, BikeHub has grown from a small local shop to one of the leading bicycle retailers in the
            country. Our passion for cycling drives everything we do, from curating the best selection of bikes to
            providing exceptional customer service.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We believe that cycling is more than just a mode of transportation—it's a lifestyle that promotes health,
            environmental sustainability, and community. Our mission is to make quality bicycles accessible to everyone
            and inspire more people to embrace cycling in their daily lives.
          </p>
          <Button size="lg" asChild>
            <a href="/bicycles">Explore Our Collection</a>
          </Button>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/products/product-1.webp" alt="BikeHub Store" fill className="object-cover" />
        </div>
      </div>

      <Separator className="my-16" />

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-5 shadow-none border">
            <CardContent className="p-0">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-700">
                We carefully select each bicycle and accessory in our inventory, ensuring that we only offer products
                that meet our high standards for performance, durability, and value.
              </p>
            </CardContent>
          </Card>

          <Card className="p-5 shadow-none border">
            <CardContent className="p-0">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expertise</h3>
              <p className="text-gray-700">
                Our team consists of passionate cyclists with extensive knowledge about different types of bikes and
                riding styles. We're always ready to share our expertise and help you find the perfect bike.
              </p>
            </CardContent>
          </Card>

          <Card className="p-5 shadow-none border">
            <CardContent className="p-0">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-700">
                We're committed to promoting cycling as an environmentally friendly mode of transportation. We also
                strive to minimize our ecological footprint through sustainable business practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Alex Johnson", role: "Founder & CEO", image: "/customers/customer-1.webp" },
            { name: "Sarah Chen", role: "Head of Operations", image: "/customers/customer-2.webp" },
            { name: "Michael Rodriguez", role: "Lead Mechanic", image: "/customers/customer-1.webp" },
            { name: "Emma Williams", role: "Customer Experience", image: "/customers/customer-2.webp" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      <div>
        <h2 className="text-3xl font-bold text-center mb-12">Visit Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] relative">
            {/* Replace with actual map component or embed */}
            <div className="absolute inset-0 flex items-center justify-center">
            <iframe className="h-full w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187852369!2d90.33728778500338!3d23.78097572866218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1743654517239!5m2!1sen!2sbd" ></iframe>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Store Information</h3>
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
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Store Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div>
                    <p>
                      <strong>Monday - Friday:</strong> 9:00 AM - 7:00 PM
                    </p>
                    <p>
                      <strong>Saturday:</strong> 10:00 AM - 6:00 PM
                    </p>
                    <p>
                      <strong>Sunday:</strong> 11:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full sm:w-auto">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
