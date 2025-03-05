
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeInfo,
  Clock,
  RefreshCw,
  ShoppingBag,
  Users,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  className?: string;
}

function StatCard({ title, value, subtitle, icon, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export function PerformanceMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="User Retention"
        value="68.7%"
        subtitle="+2.4% from last month"
        icon={<Users className="h-4 w-4 text-blue-600" />}
      />
      <StatCard
        title="Avg. Session Duration"
        value="3m 42s"
        subtitle="+12s from last month"
        icon={<Clock className="h-4 w-4 text-green-600" />}
      />
      <StatCard
        title="Cart Abandonment"
        value="24.3%"
        subtitle="-1.2% from last month"
        icon={<ShoppingBag className="h-4 w-4 text-orange-600" />}
      />
      <StatCard
        title="Page Load Time"
        value="1.2s"
        subtitle="-0.3s from last month"
        icon={<RefreshCw className="h-4 w-4 text-purple-600" />}
      />
    </div>
  );
}
