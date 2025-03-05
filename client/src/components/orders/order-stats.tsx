import { Card } from "@/components/ui/card";
import { ShoppingCart, CheckCircle, Clock, XCircle } from "lucide-react";

interface OrderStatsProps {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
}

export default function OrderStats({
  totalOrders,
  completedOrders,
  pendingOrders,
  cancelledOrders,
}: OrderStatsProps) {
  const stats = [
    {
      name: "Total Orders",
      value: totalOrders,
      change: 12.5,
      icon: <ShoppingCart className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-100",
    },
    {
      name: "Completed Orders",
      value: completedOrders,
      change: 8.3,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-100",
    },
    {
      name: "Pending Orders",
      value: pendingOrders,
      change: -4.2,
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      bgColor: "bg-yellow-100",
    },
    {
      name: "Cancelled Orders",
      value: cancelledOrders,
      change: 2.1,
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">{stat.name}</span>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stat.bgColor}`}>
              {stat.icon}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-gray-900">
              {stat.value.toLocaleString()}
            </p>
            <p className="text-sm flex items-center gap-1">
              <span className={stat.change >= 0 ? "text-green-600" : "text-red-600"}>
                {stat.change >= 0 ? "+" : ""}{stat.change}%
              </span>
              <span className="text-gray-600">vs last month</span>
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
