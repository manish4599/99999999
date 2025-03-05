import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import OrderStats from "@/components/orders/order-stats";
import OrderTrends from "@/components/orders/order-trends";
import OrdersTable from "@/components/orders/orders-table";

interface OrdersData {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  orders: any[];
}

export default function OrdersPage() {
  const [period, setPeriod] = useState("daily");

  const { data, isLoading } = useQuery<OrdersData>({
    queryKey: ["/api/orders"],
  });

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i} className="h-32 animate-pulse bg-gray-100" />
          ))}
        </div>
        <Card className="h-[400px] animate-pulse bg-gray-100" />
        <Card className="h-[400px] animate-pulse bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
      </div>

      <OrderStats
        totalOrders={data.totalOrders}
        completedOrders={data.completedOrders}
        pendingOrders={data.pendingOrders}
        cancelledOrders={data.cancelledOrders}
      />

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Order Trends</h2>
            <Tabs value={period} onValueChange={setPeriod}>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <OrderTrends period={period} />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <div className="flex gap-2">
              <Input
                type="search"
                placeholder="Search orders..."
                className="w-[300px]"
              />
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          <OrdersTable orders={data.orders} />
        </Card>
      </div>
    </div>
  );
}