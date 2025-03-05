import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import StatsCard from "@/components/dashboard/stats-card";
import ActivityChart from "@/components/dashboard/activity-chart";
import OrdersTable from "@/components/dashboard/orders-table";
import TopSellers from "@/components/dashboard/top-sellers";
import { Users, ShoppingCart, Clock, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardData {
  totalUsers: number;
  newSignups: number;
  totalOrders: number;
  pendingApprovals: number;
  recentOrders: any[];
  topStores: any[];
}

export default function Dashboard() {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
  });

  if (isLoading || !data) {
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
          value={data.totalUsers.toLocaleString()}
          change={2.5}
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />
        <StatsCard
          title="New Signups"
          value={data.newSignups.toLocaleString()}
          change={4.3}
          icon={<Clock className="h-5 w-5 text-blue-600" />}
        />
        <StatsCard
          title="Total Orders"
          value={data.totalOrders.toLocaleString()}
          change={-1.2}
          icon={<ShoppingCart className="h-5 w-5 text-blue-600" />}
        />
        <Link href="/users/pending-approvals" className="block transition-transform hover:scale-[1.02]">
          <StatsCard
            title="Pending Approvals"
            value={data.pendingApprovals}
            change={0}
            icon={<AlertCircle className="h-5 w-5 text-orange-600" />}
            actionRequired
          />
        </Link>
      </div>

      <ActivityChart />

      <div className="grid gap-6 md:grid-cols-2">
        <OrdersTable />
        <TopSellers />
      </div>
    </div>
  );
}