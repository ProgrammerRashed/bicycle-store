"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreVertical, Eye, UserCog, UserX, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

// Mock data for customers
const initialCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    joinDate: "2023-01-15",
    orders: 8,
    totalSpent: 3249.95,
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    joinDate: "2023-02-20",
    orders: 5,
    totalSpent: 1899.99,
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "(555) 456-7890",
    joinDate: "2023-03-10",
    orders: 3,
    totalSpent: 2499.99,
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "(555) 234-5678",
    joinDate: "2023-03-25",
    orders: 2,
    totalSpent: 699.98,
    status: "inactive",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "(555) 876-5432",
    joinDate: "2023-04-05",
    orders: 1,
    totalSpent: 1899.99,
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "(555) 345-6789",
    joinDate: "2023-04-12",
    orders: 4,
    totalSpent: 1249.96,
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "(555) 654-3210",
    joinDate: "2023-04-18",
    orders: 0,
    totalSpent: 0,
    status: "inactive",
    avatar: "/placeholder.svg",
  },
]

// Mock data for customer orders
const customerOrders = [
  {
    id: "ORD-001",
    date: "2023-04-15",
    status: "Delivered",
    total: 1299.99,
    items: ["Mountain Explorer Pro"],
  },
  {
    id: "ORD-002",
    date: "2023-03-22",
    status: "Delivered",
    total: 899.99,
    items: ["Urban Glide 7"],
  },
  {
    id: "ORD-003",
    date: "2023-02-18",
    status: "Delivered",
    total: 349.99,
    items: ["Kids Adventure 20"],
  },
  {
    id: "ORD-004",
    date: "2023-01-05",
    status: "Delivered",
    total: 699.98,
    items: ["Trail Blazer X3", "Accessories Bundle"],
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const viewCustomerDetails = (customer: any) => {
    setSelectedCustomer(customer)
    setIsDetailsOpen(true)
  }

  const openDeactivateDialog = (customer: any) => {
    setSelectedCustomer(customer)
    setIsDeactivateDialogOpen(true)
  }

  const toggleCustomerStatus = () => {
    if (!selectedCustomer) return

    const newStatus = selectedCustomer.status === "active" ? "inactive" : "active"

    setCustomers(
      customers.map((customer) =>
        customer.id === selectedCustomer.id ? { ...customer, status: newStatus } : customer,
      ),
    )

    setIsDeactivateDialogOpen(false)

    toast.success(`${selectedCustomer.name} has been ${newStatus === "active" ? "activated" : "deactivated"} successfully`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customers</h1>

      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
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
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={customer.avatar || "/placeholder.svg"}
                        alt={customer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell className="text-right">{customer.orders}</TableCell>
                  <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "active" ? "outline" : "secondary"}>
                      {customer.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewCustomerDetails(customer)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeactivateDialog(customer)}
                          className={customer.status === "active" ? "text-destructive" : "text-primary"}
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          {customer.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>View detailed information about this customer.</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={selectedCustomer.avatar || "/placeholder.svg"}
                    alt={selectedCustomer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedCustomer.name}</h3>
                  <p className="text-sm text-muted-foreground">Customer since {selectedCustomer.joinDate}</p>
                </div>
                <Badge variant={selectedCustomer.status === "active" ? "outline" : "secondary"} className="ml-auto">
                  {selectedCustomer.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Customer Information</TabsTrigger>
                  <TabsTrigger value="orders">Order History</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <div className="p-2 border rounded-md">{selectedCustomer.email}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <div className="p-2 border rounded-md">{selectedCustomer.phone}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Total Orders</Label>
                      <div className="p-2 border rounded-md">{selectedCustomer.orders}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Total Spent</Label>
                      <div className="p-2 border rounded-md">${selectedCustomer.totalSpent.toFixed(2)}</div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Account Status</Label>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={selectedCustomer.status === "active"}
                          onCheckedChange={(checked : any) => {
                            setSelectedCustomer({
                              ...selectedCustomer,
                              status: checked ? "active" : "inactive",
                            })
                          }}
                        />
                        <span>{selectedCustomer.status === "active" ? "Active" : "Inactive"}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="orders">
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customerOrders.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">
                              No orders found
                            </TableCell>
                          </TableRow>
                        ) : (
                          customerOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>{order.items.join(", ")}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{order.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    View All Orders
                  </Button>
                  <Button>
                    <UserCog className="h-4 w-4 mr-2" />
                    Edit Customer
                  </Button>
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Deactivate/Activate Customer Dialog */}
      <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCustomer?.status === "active" ? "Deactivate" : "Activate"} Customer</DialogTitle>
            <DialogDescription>
              {selectedCustomer?.status === "active"
                ? "Are you sure you want to deactivate this customer? They will no longer be able to log in or place orders."
                : "Are you sure you want to activate this customer? They will be able to log in and place orders again."}
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="py-4">
              <p className="font-medium">{selectedCustomer.name}</p>
              <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeactivateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={selectedCustomer?.status === "active" ? "destructive" : "default"}
              onClick={toggleCustomerStatus}
            >
              {selectedCustomer?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

