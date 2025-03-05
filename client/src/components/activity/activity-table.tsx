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
  {
    id: "2",
    timestamp: "2025-01-15 14:28:10",
    user: {
      name: "Sarah Smith",
      role: "Buyer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    activity: "Product Purchase",
    status: "success",
    ipAddress: "192.168.1.42",
  },
  {
    id: "3",
    timestamp: "2025-01-15 13:45:32",
    user: {
      name: "Mike Johnson",
      role: "Buyer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
    activity: "Profile Update",
    status: "success",
    ipAddress: "192.168.2.15",
  },
  {
    id: "4",
    timestamp: "2025-01-15 12:22:18",
    user: {
      name: "Emma Davis",
      role: "Admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    activity: "User Approval",
    status: "success",
    ipAddress: "192.168.1.10",
  },
  {
    id: "5",
    timestamp: "2025-01-15 11:54:05",
    user: {
      name: "Alex Wong",
      role: "Seller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    activity: "Store Creation",
    status: "pending",
    ipAddress: "192.168.3.22",
  },
  {
    id: "6",
    timestamp: "2025-01-15 10:18:47",
    user: {
      name: "Rachel Green",
      role: "Buyer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel",
    },
    activity: "Login Attempt",
    status: "failed",
    ipAddress: "192.168.4.87",
  },
  {
    id: "7",
    timestamp: "2025-01-15 09:35:12",
    user: {
      name: "David Chen",
      role: "Seller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
    activity: "Payment Processing",
    status: "success",
    ipAddress: "192.168.2.32",
  },
  {
    id: "8",
    timestamp: "2025-01-14 18:42:33",
    user: {
      name: "Olivia Martin",
      role: "Admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
    },
    activity: "System Backup",
    status: "success",
    ipAddress: "192.168.1.5",
  },
  {
    id: "9",
    timestamp: "2025-01-14 16:15:20",
    user: {
      name: "James Wilson",
      role: "Buyer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    },
    activity: "Order Cancellation",
    status: "success",
    ipAddress: "192.168.5.63",
  },
  {
    id: "10",
    timestamp: "2025-01-14 14:50:08",
    user: {
      name: "Sophia Garcia",
      role: "Seller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
    },
    activity: "Product Update",
    status: "success",
    ipAddress: "192.168.3.91",
  }
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
