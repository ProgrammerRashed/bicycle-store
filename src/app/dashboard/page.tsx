"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Mock data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
]

const visitsData = [
  { name: "Mon", visits: 500 },
  { name: "Tue", visits: 600 },
  { name: "Wed", visits: 800 },
  { name: "Thu", visits: 1200 },
  { name: "Fri", visits: 900 },
  { name: "Sat", visits: 1500 },
  { name: "Sun", visits: 1000 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Sales</CardDescription>
            <CardTitle className="text-3xl">$24,780</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+12.5% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Orders</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">3 pending shipment</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Inventory</CardDescription>
            <CardTitle className="text-3xl">142</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">8 items low in stock</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Customers</CardDescription>
            <CardTitle className="text-3xl">573</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+6.2% from last month</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="visits">Website Visits</TabsTrigger>
        </TabsList>
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visits">
          <Card>
            <CardHeader>
              <CardTitle>Website Traffic</CardTitle>
              <CardDescription>Daily visits for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visits" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders placed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "ORD-001", customer: "John Doe", date: "2023-04-15", status: "Delivered", amount: "$1,299.99" },
                { id: "ORD-002", customer: "Jane Smith", date: "2023-04-14", status: "Processing", amount: "$899.99" },
                {
                  id: "ORD-003",
                  customer: "Robert Johnson",
                  date: "2023-04-13",
                  status: "Shipped",
                  amount: "$2,499.99",
                },
                { id: "ORD-004", customer: "Emily Davis", date: "2023-04-12", status: "Delivered", amount: "$349.99" },
                {
                  id: "ORD-005",
                  customer: "Michael Brown",
                  date: "2023-04-11",
                  status: "Processing",
                  amount: "$1,899.99",
                },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p>{order.amount}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>Top selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Mountain Explorer Pro", category: "Mountain", sales: 24, stock: 15 },
                { name: "Urban Glide 7", category: "Commuter", sales: 18, stock: 8 },
                { name: "Kids Adventure 20", category: "Kids", sales: 15, stock: 12 },
                { name: "Electric Commuter Plus", category: "Electric", sales: 12, stock: 6 },
                { name: "Trail Blazer X3", category: "Mountain", sales: 10, stock: 9 },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p>{product.sales} sold</p>
                    <p className="text-sm text-muted-foreground">{product.stock} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

