import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  actionRequired?: boolean;
}

export default function StatsCard({ title, value, change, icon, actionRequired }: StatsCardProps) {
  const isPositive = change > 0;

  return (
    <Card className="bg-white p-6 shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">{title}</span>
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center",
            actionRequired ? "bg-orange-100" : "bg-blue-100"
          )}>
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {actionRequired ? (
            <p className="text-sm font-medium text-orange-600">Action Required</p>
          ) : (
            <p className="text-sm flex items-center gap-1">
              <span className={cn(
                "font-medium",
                isPositive ? "text-green-600" : "text-red-600"
              )}>
                {isPositive ? "+" : ""}{change}%
              </span>
              <span className="text-gray-600">vs last month</span>
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}