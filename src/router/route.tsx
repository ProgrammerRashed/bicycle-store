//REACT NATIVE IMPORTS 
import { createBrowserRouter } from "react-router-dom";

// PAGES IMPORT 
// COMMON PAGES 
import App from "@/App"; //Homepage
import SignIn from "@/pages/auth-pages/SignIn";
import SignUp from "@/pages/auth-pages/SignUp";
import ProductsPage from "@/pages/common-pages/ProductsPage";
import ProductDetails from "@/components/product/ProductDetails";
import AboutUsPage from "@/pages/common-pages/AboutUsPage";
import CheckoutPage from "@/pages/common-pages/CheckoutPage";
import NotFoundPage from "@/pages/common-pages/NotFoundPage";

// DASHBOARD PAGES
import ProfilePage from "@/pages/dashboard-pages/ProfilePage";
import DashboardProductsPage from "@/pages/dashboard-pages/DashboardProductsPage";
import PaymentSuccessPage from "@/pages/common-pages/PaymentSuccessPage";
import OrdersPage from "@/pages/dashboard-pages/OrdersPage";



import Dashboard from "@/pages/dashboard-pages/Dashboard";

// ROUTE CONTROLE 
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

// LAYOUT IMPORTS
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import DashboardUserPage from "@/pages/dashboard-pages/DashboardUserPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/checkout/:id",element: (<PrivateRoute><CheckoutPage /></PrivateRoute>)},
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
     
    
      {
        path: "products",
        element: (
          <AdminRoute>
            <DashboardProductsPage />
          </AdminRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <DashboardUserPage />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  { path: "/payment/success", element: <PaymentSuccessPage /> },
  {
    path: "/signup",
    element: <SignUp />,
  },
  //404 Page
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
