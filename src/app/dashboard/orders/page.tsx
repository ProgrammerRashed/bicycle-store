"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "ORD-001",
    date: "2023-04-15",
    status: "Delivered",
    items: [{ id: 1, name: "Mountain Explorer Pro", price: 1299.99, quantity: 1 }],
    total: 1299.99,
    shipping: {
      address: "123 Main St, Anytown, AT 12345",
      method: "Standard Shipping",
    },
    payment: {
      method: "Credit Card",
      last4: "4242",
    },
  },
  {
    id: "ORD-002",
    date: "2023-04-14",
    status: "Processing",
    items: [{ id: 2, name: "Urban Glide 7", price: 899.99, quantity: 1 }],
    total: 899.99,
    shipping: {
      address: "456 Oak Ave, Somewhere, SW 67890",
      method: "Express Shipping",
    },
    payment: {
      method: "PayPal",
      last4: "",
    },
  },
  {
    id: "ORD-003",
    date: "2023-04-13",
    status: "Shipped",
    items: [{ id: 3, name: "SpeedForce Elite", price: 2499.99, quantity: 1 }],
    total: 2499.99,
    shipping: {
      address: "789 Pine Rd, Elsewhere, EW 13579",
      method: "Standard Shipping",
    },
    payment: {
      method: "Credit Card",
      last4: "1234",
    },
  },
  {
    id: "ORD-004",
    date: "2023-04-12",
    status: "Delivered",
    items: [{ id: 5, name: "Kids Adventure 20", price: 349.99, quantity: 1 }],
    total: 349.99,
    shipping: {
      address: "321 Cedar Ln, Nowhere, NW 97531",
      method: "Standard Shipping",
    },
    payment: {
      method: "Credit Card",
      last4: "5678",
    },
  },
  {
    id: "ORD-005",
    date: "2023-04-11",
    status: "Processing",
    items: [{ id: 6, name: "Electric Commuter Plus", price: 1899.99, quantity: 1 }],
    total: 1899.99,
    shipping: {
      address: "654 Birch Blvd, Anywhere, AW 86420",
      method: "Express Shipping",
    },
    payment: {
      method: "PayPal",
      last4: "",
    },
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success"
      case "Shipped":
        return "default"
      case "Processing":
        return "warning"
      case "Cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status) as any}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => viewOrderDetails(order)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>View the details of your order.</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{selectedOrder.id}</h3>
                  <p className="text-sm text-muted-foreground">Placed on {selectedOrder.date}</p>
                </div>
                <Badge variant={getStatusColor(selectedOrder.status) as any}>{selectedOrder.status}</Badge>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">
                        Subtotal
                      </TableCell>
                      <TableCell className="text-right">${selectedOrder.total.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">
                        Shipping
                      </TableCell>
                      <TableCell className="text-right">$0.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold">${selectedOrder.total.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Shipping Information</h3>
                  <p className="text-sm">{selectedOrder.shipping.address}</p>
                  <p className="text-sm">Method: {selectedOrder.shipping.method}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Payment Information</h3>
                  <p className="text-sm">Method: {selectedOrder.payment.method}</p>
                  {selectedOrder.payment.last4 && (
                    <p className="text-sm">Card ending in: {selectedOrder.payment.last4}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

