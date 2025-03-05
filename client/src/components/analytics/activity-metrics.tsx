
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const activityData = [
  { name: "Mon", visitors: 2100, pageViews: 4300, bounceRate: 34 },
  { name: "Tue", visitors: 2400, pageViews: 4900, bounceRate: 32 },
  { name: "Wed", visitors: 2200, pageViews: 5100, bounceRate: 30 },
  { name: "Thu", visitors: 2800, pageViews: 5600, bounceRate: 29 },
  { name: "Fri", visitors: 3100, pageViews: 6100, bounceRate: 28 },
  { name: "Sat", visitors: 2600, pageViews: 5400, bounceRate: 31 },
  { name: "Sun", visitors: 2200, pageViews: 4800, bounceRate: 33 },
];

export function ActivityMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Visitors & Page Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" name="Visitors" fill="#3b82f6" />
                <Bar dataKey="pageViews" name="Page Views" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bounce Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="bounceRate" 
                  name="Bounce Rate" 
                  stroke="#f43f5e" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
