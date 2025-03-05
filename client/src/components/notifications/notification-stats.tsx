
import { Card, CardContent } from "@/components/ui/card";
import { Send, CheckCheck, Clock, AlertCircle } from "lucide-react";

interface NotificationStat {
  title: string;
  value: string;
  icon: React.ReactNode;
  className: string;
}

export function NotificationStats() {
  const stats: NotificationStat[] = [
    {
      title: "Total Sent",
      value: "24,123",
      icon: <Send className="h-5 w-5 text-blue-500" />,
      className: "bg-blue-50"
    },
    {
      title: "Delivered",
      value: "23,492",
      icon: <CheckCheck className="h-5 w-5 text-green-500" />,
      className: "bg-green-50"
    },
    {
      title: "Pending",
      value: "412",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      className: "bg-amber-50"
    },
    {
      title: "Failed",
      value: "219",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      className: "bg-red-50"
    }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="flex p-6">
            <div className={`p-2 rounded-full mr-4 ${stat.className}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
