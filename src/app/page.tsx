import Banner from "@/components/Banner";
import FeaturedBicycles from "@/components/FeaturedBicycles";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Banner />
      <FeaturedBicycles />
      <Testimonials />
    </main>
  );
}
