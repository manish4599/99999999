import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositive = change > 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span
            className={cn(
              "text-sm font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="ml-2 text-sm text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
