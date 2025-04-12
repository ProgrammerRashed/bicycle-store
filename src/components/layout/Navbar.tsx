import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, ShoppingCart, User, LogIn, UserIcon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import UseActiveUser from "@/hook/UseActiveUser"
import { logout } from "@/redux/features/auth/authSlice"
import { useAppDispatch } from "@/redux/hook"
import { toast } from "sonner"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname
  const dispatch = useAppDispatch()
  const { isAdmin, isLoggedIn } = UseActiveUser()
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logged out successfully");
    navigate("/signin");
  }

  const isActive = (path: string) =>
    pathname === path
      ? "border-primary text-primary"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/logo.png"
                alt="Bicycle Store Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-primary">
                BikeHub
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                  "/"
                )}`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                  "/products"
                )}`}
              >
                All Bicycles
              </Link>
              <Link
                to="/about-us"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(
                  "/about-us"
                )}`}
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {
              !isLoggedIn && (<div className="flex items-center gap-2" >
                <Link to="/signin"> <Button variant="outline" size="sm" className="ml-2">
                  <LogIn className="h-4 w-4 mr-2" />
                  SignIn
                </Button></Link>
                <Link to="/signup"> <Button variant="default" size="sm" className="ml-2">
                  <UserIcon className="h-4 w-4 mr-2" />
                  SignUp
                </Button></Link>
              </div>)
            }


            {
              isLoggedIn && (
                <Button  onClick={handleLogout} variant="outline" size="sm" className="ml-2">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>)
            }
            {
              isAdmin && (
                <Link to="/dashboard">
                  <Button variant="default" size="sm" className="ml-2">
                    Dashboard
                  </Button>
                </Link>)
            }


            {
              isLoggedIn && !isAdmin && (<Link to="/dashboard/profile">
                <Button variant="default" size="sm" className="ml-2">
                  Profile
                </Button>
              </Link>)
            }


          </div>
          <div className="flex items-center md:hidden">

            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(
                "/"
              )}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(
                "/products"
              )}`}
            >
              All Bicycles
            </Link>
            <Link
              to="/about-us"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(
                "/about-us"
              )}`}
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Button variant="outline" size="sm" className="mr-2">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
                <Button variant="default" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
