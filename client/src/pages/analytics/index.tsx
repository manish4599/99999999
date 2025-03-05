
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PerformanceMetrics } from "@/components/analytics/performance-metrics";
import { ActivityMetrics } from "@/components/analytics/activity-metrics";
import { ConversionFunnel } from "@/components/analytics/conversion-funnel";
import { RevenueMetrics } from "@/components/analytics/revenue-metrics";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("weekly");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <Tabs defaultValue="weekly" value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <PerformanceMetrics />
      
      <ActivityMetrics />
      
      <RevenueMetrics />
      
      <ConversionFunnel />
    </div>
  );
}
