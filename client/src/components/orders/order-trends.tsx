import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = {
  daily: [
    { date: "Mon", orders: 145 },
    { date: "Tue", orders: 132 },
    { date: "Wed", orders: 164 },
    { date: "Thu", orders: 142 },
    { date: "Fri", orders: 158 },
    { date: "Sat", orders: 119 },
    { date: "Sun", orders: 127 },
  ],
  weekly: [
    { date: "Week 1", orders: 980 },
    { date: "Week 2", orders: 1240 },
    { date: "Week 3", orders: 1100 },
    { date: "Week 4", orders: 1380 },
  ],
  monthly: [
    { date: "Jan", orders: 3200 },
    { date: "Feb", orders: 3800 },
    { date: "Mar", orders: 4100 },
    { date: "Apr", orders: 3900 },
    { date: "May", orders: 4600 },
    { date: "Jun", orders: 4200 },
  ],
};

interface OrderTrendsProps {
  period: "daily" | "weekly" | "monthly";
}

export default function OrderTrends({ period }: OrderTrendsProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data[period]}>
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorOrders)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
