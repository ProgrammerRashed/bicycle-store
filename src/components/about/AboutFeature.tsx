import { Car, Wallet, Hand, Headphones } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Car size={40} strokeWidth={1.5} />,
    title: "Choose a Location",
    description:
      "Select the ideal destination to begin your journey with ease.",
  },
  {
    id: 2,
    icon: <Wallet size={40} strokeWidth={1.5} />,
    title: "Transparent Pricing",
    description:
      "Enjoy clear and upfront pricing with no surprises, ensuring you know exactly what you're paying for.",
  },
  {
    id: 3,
    icon: <Hand size={40} strokeWidth={1.5} />,
    title: "Convenient Booking",
    description:
      "Benefit from a variety of rental options, including short-term, long-term, and weekend specials.",
  },
  {
    id: 4,
    icon: <Headphones size={40} strokeWidth={1.5} />,
    title: "24/7 Customer Support",
    description:
      "Get assistance whenever you need it with our dedicated support team available around the clock.",
  },
];

const AboutFeature = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center">
            <div className="text-green-500  mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutFeature;
