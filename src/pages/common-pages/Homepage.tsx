import AppDownload from "@/components/home/AppDownload"
import Banner from "@/components/home/Banner"
import DealOfTheDay from "@/components/home/DealOfTheDay"
import FeaturedBicycles from "@/components/home/FeaturedBicycles"
import NewArrival from "@/components/home/NewArrival"
import Testimonials from "@/components/home/Testimonials"

const Homepage = () => {
  return (<>
  <Banner />
  <FeaturedBicycles/>
  <DealOfTheDay/>
  <NewArrival/>
  <Testimonials />
  <AppDownload/>
  </>
  )
}

export default Homepage