import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: 1,
    type: "SMS",
    message: "Your order #12345 has been confirmed...",
    recipients: "1,234",
    status: "delivered",
    sentAt: "2023-01-20 14:30"
  },
  {
    id: 2,
    type: "Push",
    message: "New product announcement: Summer collection...",
    recipients: "2,341",
    status: "pending",
    sentAt: "2023-01-20 12:15"
  },
  {
    id: 3,
    type: "SMS",
    message: "Your account has been verified...",
    recipients: "891",
    status: "failed",
    sentAt: "2023-01-20 10:45"
  }
];

export function NotificationHistory() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Message History</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer">All</Badge>
          <Badge variant="outline" className="cursor-pointer">SMS</Badge>
          <Badge variant="outline" className="cursor-pointer">Push</Badge>
        </div>
      </div>

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
          {notifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell className="font-medium text-blue-500">{notification.type}</TableCell>
              <TableCell className="max-w-[300px] truncate">{notification.message}</TableCell>
              <TableCell>{notification.recipients}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    notification.status === "delivered" ? "default" :
                    notification.status === "pending" ? "outline" : "destructive"
                  }
                >
                  {notification.status}
                </Badge>
              </TableCell>
              <TableCell>{notification.sentAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Showing 1 to 3 of 243 results.</span>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}