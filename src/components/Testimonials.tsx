export default function Testimonials() {
    const testimonials = [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Mountain Biking Enthusiast",
        content:
          "The Mountain Explorer Pro has completely transformed my trail riding experience. The quality and performance are unmatched!",
        avatar: "/placeholder.svg",
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Daily Commuter",
        content:
          "I've been using the Urban Glide for my daily commute for 6 months now. It's comfortable, reliable, and the customer service at BikeHub is exceptional.",
        avatar: "/placeholder.svg",
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        role: "Professional Cyclist",
        content:
          "As someone who rides professionally, I'm extremely picky about my equipment. BikeHub consistently delivers top-notch products that meet my high standards.",
        avatar: "/placeholder.svg",
      },
    ]
  
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden relative mr-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  