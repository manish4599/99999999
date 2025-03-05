import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface ActivityLog {
  id: string;
  timestamp: string;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  activity: string;
  status: "success" | "failed" | "pending";
  ipAddress: string;
}

const demoLogs: ActivityLog[] = [
  {
    id: "1",
    timestamp: "2025-01-15 14:30:25",
    user: {
      name: "John Doe",
      role: "Seller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    activity: "Login Attempt",
    status: "success",
    ipAddress: "192.168.1.1",
  },
  // Add more demo logs here
];

export function ActivityTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>TIMESTAMP</TableHead>
          <TableHead>USER</TableHead>
          <TableHead>ACTIVITY</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>IP ADDRESS</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {demoLogs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-medium">
              {log.timestamp}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={log.user.avatar} />
                  <AvatarFallback>{log.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{log.user.name}</p>
                  <p className="text-xs text-gray-500">{log.user.role}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{log.activity}</TableCell>
            <TableCell>
              <Badge 
                variant="secondary"
                className={
                  log.status === "success"
                    ? "bg-green-100 text-green-800"
                    : log.status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                {log.status}
              </Badge>
            </TableCell>
            <TableCell>{log.ipAddress}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4 text-gray-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
