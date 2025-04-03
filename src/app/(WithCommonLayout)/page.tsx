import AppDownload from "@/components/AppDownload";
import Banner from "@/components/Banner";
import DealOfTheDay from "@/components/DealOfTheDay";
import FeaturedBicycles from "@/components/FeaturedBicycles";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedBicycles />
      <DealOfTheDay/>
      <Testimonials />
      <AppDownload/>
    </main>
  );
}
