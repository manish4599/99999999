
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Area, 
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const revenueData = [
  { date: "Jan", revenue: 12500, profit: 4500, expenses: 8000 },
  { date: "Feb", revenue: 14200, profit: 5100, expenses: 9100 },
  { date: "Mar", revenue: 15800, profit: 5700, expenses: 10100 },
  { date: "Apr", revenue: 16800, profit: 6100, expenses: 10700 },
  { date: "May", revenue: 19200, profit: 7200, expenses: 12000 },
  { date: "Jun", revenue: 21500, profit: 8400, expenses: 13100 },
  { date: "Jul", revenue: 22100, profit: 8800, expenses: 13300 },
];

const averageOrderData = [
  { date: "Jan", value: 75 },
  { date: "Feb", value: 83 },
  { date: "Mar", value: 86 },
  { date: "Apr", value: 92 },
  { date: "May", value: 95 },
  { date: "Jun", value: 98 },
  { date: "Jul", value: 102 },
];

export function RevenueMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, undefined]}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#f43f5e" 
                  fillOpacity={1} 
                  fill="url(#colorExpenses)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Average Order Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={averageOrderData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, "Average Order"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
