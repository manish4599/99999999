import { useQuery } from "@tanstack/react-query";
import StatsCard from "@/components/dashboard/stats-card";
import ActivityChart from "@/components/dashboard/activity-chart";
import OrdersTable from "@/components/dashboard/orders-table";
import TopSellers from "@/components/dashboard/top-sellers";
import { Users, ShoppingCart, Clock, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[400px]" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={data.totalUsers}
          change={2.5}
          icon={<Users className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="New Signups"
          value={data.newSignups}
          change={4.3}
          icon={<Clock className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="Total Orders"
          value={data.totalOrders}
          change={-1.2}
          icon={<ShoppingCart className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="Pending Approvals"
          value={data.pendingApprovals}
          change={0}
          icon={<AlertCircle className="h-6 w-6 text-primary" />}
        />
      </div>

      <ActivityChart />

      <div className="grid gap-6 md:grid-cols-2">
        <OrdersTable />
        <TopSellers />
      </div>
    </div>
  );
}
