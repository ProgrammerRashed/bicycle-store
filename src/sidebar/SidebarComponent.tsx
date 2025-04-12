import React from "react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { logout } from "@/redux/features/auth/authSlice"
import { useAppDispatch } from "@/redux/hook"
import {
  Home,
  LogOut,
  ShoppingCart,
  User,
  Package,
  Users,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { toast } from "sonner"
import UseActiveUser from "@/hook/UseActiveUser"

interface SidebarComponentProps {
  children: React.ReactNode
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
  children,
}) => {
  const location = useLocation()
  const pathname = location.pathname
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logged out successfully")
  }
  const {isAdmin} = UseActiveUser()
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-white">
        <Sidebar className="bg-white fixed top-0 left-0 z-50 h-screen w-64">
          <SidebarHeader className="border-b bg-white">
            <div className="flex items-center px-4">
              <Link to="/" className="flex items-center gap-2 font-semibold">
                <img
                  src="/logo.png"
                  alt="Bicycle Store Logo"
                  width={20}
                  height={20}
                  className="h-10 w-auto"
                />
                <span className="text-primary">BikeHub</span>
              </Link>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4 py-2 bg-white">
            <SidebarMenu>
              {
                isAdmin && (   <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard"}
                  >
                    <Link to="/dashboard">
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)
              }
            

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/orders"}
                >
                  <Link to="/dashboard/orders">
                    <ShoppingCart className="h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/profile"}
                >
                  <Link to="/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isAdmin && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/products"}
                    >
                      <Link to="/dashboard/products">
                        <Package className="h-4 w-4" />
                        <span>Products</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/users"}
                    >
                      <Link to="/dashboard/users">
                        <Users className="h-4 w-4" />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-4 bg-white">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="ml-64 bg-white w-full">
          <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger />
            <div className="font-semibold">Dashboard</div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default SidebarComponent
