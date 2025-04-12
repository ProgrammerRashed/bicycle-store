import { useGetAlldataQuery } from "@/redux/features/admin/adminapi";
import { useGetAllOrderQuery } from "@/redux/features/orders/OrderApi";
import { Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import UseActiveUser from "@/hook/UseActiveUser";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { isAdmin } = UseActiveUser()
  const { data: staticsResponse, isLoading } = useGetAlldataQuery("")
  const statics = staticsResponse?.data || {}
  const { monthWiseSales, activeOrders, customers, inventory, lowStockItems, pendingOrders, totalSales } = statics

  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/dashboard/profile")
  }

  // const { data, error, isLoading } = useGetAlldataQuery("");
  const { data: orderResponse } = useGetAllOrderQuery("");

  const orders = orderResponse?.data || [];

  console.log(orders)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Sales</CardDescription>
            <CardTitle className="text-3xl">${totalSales.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Lifetime Sales</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-3xl">{activeOrders + pendingOrders}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">{pendingOrders} pending shipment</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Inventory</CardDescription>
            <CardTitle className="text-3xl">{inventory}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">{lowStockItems.length} items low in stock</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Customers</CardDescription>
            <CardTitle className="text-3xl">{customers.total}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">{customers.active} active, {customers.inactive} inactive</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
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
                  <BarChart data={monthWiseSales}>
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

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest {orders.slice(0,5).length} orders placed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(0,5).map((order: any) => (
                  <div key={order.paymentId} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium uppercase">
                        ID - {order.paymentId.slice(-4)}
                      </p>
                      <p className="text-sm text-muted-foreground">{order.user.name}</p>
                    </div>
                    <div className="text-right">
                      <p>{order.totalPrice.toFixed(2)}$</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>

        </TabsContent>
      </Tabs>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-5 w-60 text-center border border-gray-200">
      <div className="p-3 bg-gray-100 rounded-full mb-3">{icon}</div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default AdminDashboard;
