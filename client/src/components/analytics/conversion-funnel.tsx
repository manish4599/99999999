
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bar, 
  BarChart, 
  Cell, 
  Funnel, 
  FunnelChart, 
  LabelList, 
  ResponsiveContainer, 
  Tooltip
} from "recharts";

const funnelData = [
  { name: "Visitors", value: 10000, fill: "#3b82f6" },
  { name: "Sign-ups", value: 4500, fill: "#10b981" },
  { name: "Cart Additions", value: 2200, fill: "#eab308" },
  { name: "Checkout", value: 1100, fill: "#f97316" },
  { name: "Purchases", value: 950, fill: "#8b5cf6" },
];

const conversionByDeviceData = [
  { name: "Desktop", conversion: 5.3 },
  { name: "Mobile", conversion: 3.8 },
  { name: "Tablet", conversion: 4.5 },
];

const colors = ["#3b82f6", "#10b981", "#eab308"];

export function ConversionFunnel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList
                    position="right"
                    fill="#888"
                    stroke="none"
                    dataKey="name"
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Conversion by Device</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionByDeviceData}>
                <Tooltip formatter={(value) => [`${value}%`, "Conversion Rate"]} />
                <Bar dataKey="conversion" name="Conversion Rate" radius={[4, 4, 0, 0]}>
                  {conversionByDeviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
