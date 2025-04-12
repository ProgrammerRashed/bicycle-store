
import { useDeleteOrderMutation, useGetAllOrderQuery, useUpdateorderMutation } from "@/redux/features/orders/OrderApi"
import { CheckCircle, Clock, Loader, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import UseActiveUser from "@/hook/UseActiveUser"

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { user, isAdmin } = UseActiveUser()
  const { data: ordersResponse, isLoading, isError, refetch } = useGetAllOrderQuery("")

  const [deletedata] = useDeleteOrderMutation()
  const [updateOrder] = useUpdateorderMutation()

  const orders = (ordersResponse?.data || []).filter((order: any) => {
    // If user is admin, show all orders
    if (isAdmin) return true;
    // If not admin, only show orders belonging to the current user
    return order.user.email === user?.email;
  });

  const filteredOrders = orders.filter(
    (order: any) =>
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteProduct = async (id: string) => {
    try {
      await deletedata(id)
      refetch()
      toast.success("Order deleted successfully!")
    } catch (err) {
      toast.error("Cannot delete order!")
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Success" ? "Pending" : "Success"

    try {
      await updateOrder({
        productId: id,
        updatedProduct: { paymentStatus: newStatus },
      })
      refetch()

      toast.success(`Order marked as ${newStatus}!`)
    } catch (err) {
      toast.error("Failed to update order status")
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-destructive/10 p-6 rounded-lg text-center max-w-md">
          <h3 className="text-lg font-semibold text-destructive mb-2">Error Loading Orders</h3>
          <p className="text-muted-foreground mb-4">We couldn't retrieve your orders. Please try again later.</p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="border-none p-0 shadow-sm">
      <CardHeader className="p-0 mb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Orders</CardTitle>
            {
              isAdmin &&  <CardDescription>Manage and track all customer orders</CardDescription>
            }
           
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 ">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {
                  isAdmin && (<>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>

                  </>)
                }

                <TableHead>Transaction ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Price</TableHead>
                {
                  isAdmin && (<TableHead className="w-[80px]"></TableHead>)
                }

              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    {searchTerm ? "No matching orders found" : "No orders found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order: any) => (
                  <TableRow key={order._id}>
                    {
                      isAdmin && (<>
                        <TableCell className="font-medium">{order.user.name}</TableCell>
                        <TableCell className="font-medium">{order.user.email}</TableCell>
                      </>)
                    }

                    <TableCell className="font-mono text-xs">{order.paymentId}</TableCell>
                    <TableCell className="font-medium">{order.productName}</TableCell>
                    <TableCell className="text-center">{order.quantity}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={order.paymentStatus === "Success" ? "default" : "destructive"}
                        className="inline-flex items-center gap-1"
                      >
                        {order.paymentStatus === "Success" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${Number.parseFloat(order.totalPrice).toFixed(2)}
                    </TableCell>

                    {
                      isAdmin && (<TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(order._id, order.paymentStatus)}
                              className={order.paymentStatus === "Success" ? "text-yellow-500" : "text-green-500"}
                            >
                              {order.paymentStatus === "Success" ? (
                                <>
                                  <Clock className="mr-2 h-4 w-4" />
                                  Mark as Pending
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Success
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteProduct(order._id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>)
                    }

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrdersPage