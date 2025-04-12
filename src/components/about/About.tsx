import BlogCarousel from "@/pages/dashboard-pages/Blog";
import AboutFeature from "./AboutFeature";
import AboutHeader from "./AboutHeader";
import AboutTeamSection from "./AboutTeamSection";
const About = () => {
  return (
    <div className="container mx-auto px-4 pt-[72px]">
      <AboutHeader />
      <div className="flex md:flex-row flex-col justify-between items-center w-full py-10 gap-5">
        <h2 className="text-black text-4xl w-full md:w-[30%] font-bold">
          The Future of <br />
          <span className="text-green-500">Car Rental </span>is Here
        </h2>
        <p className="w-full md:w-1/2">
          Welcome to Autotrader, your trusted partner in car rentals. Since our
          founding, we have been committed to providing our customers with a
          seamless and reliable car rental experience. Whether you're planning a
          business trip, a family vacation, or just need a vehicle for everyday
          use, we offer a wide range of vehicles to meet your needs.
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-6 items-center py-10">
        <div className="">
          <img
            src="https://carento-nextjs.vercel.app/assets/imgs/section-1/img-1.png"
            alt="h"
            className="w-full h-full rounded-xl"
          />
        </div>
        <div className="">
          <img
            src="https://carento-nextjs.vercel.app/assets/imgs/section-1/img-2.png"
            alt="h"
            className="w-full h-full rounded-xl"
          />
        </div>
        <div className="grid grid-cols-auto gap-6 h-full">
          <div className="bg-primary-jext flex items-center justify-center rounded-xl gap-4 py-12">
            <h1 className="text-7xl font-extrabold">25</h1>
            <p className="text-4xl font-extrabold">
              Years <br />
              in Business
            </p>
          </div>
          <img
            src="https://carento-nextjs.vercel.app/assets/imgs/section-1/img-3.png"
            alt="car"
            className="rounded-xl w-full"
          />
        </div>
      </div>
      <AboutFeature />
      <AboutTeamSection />
      <BlogCarousel />
    </div>
  );
};

export default About;
