
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Notification {
  id: string;
  type: "sms" | "push";
  message: string;
  recipients: string;
  status: "delivered" | "pending" | "failed";
  sentAt: string;
}

export function NotificationHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("all");

  // Mock data
  const notifications: Notification[] = [
    {
      id: "1",
      type: "sms",
      message: "Your order #17345 has been confirmed...",
      recipients: "1,234",
      status: "delivered",
      sentAt: "2023-01-20 14:30",
    },
    {
      id: "2",
      type: "push",
      message: "New product announcement: Summer collection...",
      recipients: "2,541",
      status: "pending",
      sentAt: "2023-01-20 12:15",
    },
    {
      id: "3",
      type: "sms",
      message: "Your account has been verified...",
      recipients: "891",
      status: "failed",
      sentAt: "2023-01-20 10:45",
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Message History</h3>
        <div className="flex space-x-2">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("all")}
          >
            All
          </Button>
          <Button
            variant={selectedType === "sms" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("sms")}
          >
            SMS
          </Button>
          <Button
            variant={selectedType === "push" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("push")}
          >
            Push
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications
              .filter(
                (notification) =>
                  selectedType === "all" || notification.type === selectedType
              )
              .map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="uppercase font-medium">
                    {notification.type}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {notification.message}
                  </TableCell>
                  <TableCell>{notification.recipients}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(notification.status)}
                    >
                      {notification.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{notification.sentAt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing 1-3 of 243 results.
        </p>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={currentPage === 1 ? "bg-blue-50" : ""}
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
