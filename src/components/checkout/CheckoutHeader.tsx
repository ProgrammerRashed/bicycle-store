import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
const CheckoutHeader = () => {
  return (
    <div className="py-10">
      <div
        style={{
          backgroundImage:
            "url('https://carento-nextjs.vercel.app/assets/imgs/page-header/banner.png')",
        }}
        className="rounded-xl bg-cover h-96 relative"
      >
        <div className="absolute inset-0 bg-black/60 rounded-xl ">
          <div className="flex items-center justify-center flex-col h-full pl-20">
            <h1 className="text-5xl text-white font-bold">Checkout</h1>
            <p className="text-white mt-2">Purchase your product</p>
          </div>
        </div>

        <div className="absolute -bottom-4 left-1/2 border bg-gray-100 rounded-lg px-3 py-1 text-xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="  text-md">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-md">
                  Checkout
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
