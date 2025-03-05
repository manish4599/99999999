
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NotificationHistoryProps {
  currentTab: string;
}

interface Message {
  id: string;
  type: 'SMS' | 'Push';
  message: string;
  recipients: number;
  status: 'delivered' | 'pending' | 'failed';
  sentAt: string;
}

const statusColors = {
  delivered: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
};

const demoMessages: Message[] = [
  {
    id: "1",
    type: "SMS",
    message: "Your order #12345 has been confirmed...",
    recipients: 1234,
    status: "delivered",
    sentAt: "2025-01-20 14:30"
  },
  {
    id: "2",
    type: "Push",
    message: "New product announcement: Summer collection...",
    recipients: 2341,
    status: "pending",
    sentAt: "2025-01-20 12:15"
  },
  {
    id: "3",
    type: "SMS",
    message: "Your account has been verified...",
    recipients: 891,
    status: "failed",
    sentAt: "2025-01-20 10:45"
  },
  {
    id: "4",
    type: "Push",
    message: "Flash sale starting in 1 hour...",
    recipients: 3421,
    status: "delivered",
    sentAt: "2025-01-19 18:20"
  },
  {
    id: "5",
    type: "SMS",
    message: "Your password has been reset...",
    recipients: 1,
    status: "delivered",
    sentAt: "2025-01-19 16:45"
  }
];

export function NotificationHistory({ currentTab }: NotificationHistoryProps) {
  const filteredMessages = currentTab === 'all' 
    ? demoMessages 
    : demoMessages.filter(message => message.type.toLowerCase() === currentTab);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>TYPE</TableHead>
            <TableHead>MESSAGE</TableHead>
            <TableHead>RECIPIENTS</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>SENT AT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMessages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>
                <Badge variant="outline" className={
                  message.type === 'SMS' 
                    ? 'bg-blue-50 text-blue-600 border-blue-200' 
                    : 'bg-purple-50 text-purple-600 border-purple-200'
                }>
                  {message.type}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[300px] truncate">
                {message.message}
              </TableCell>
              <TableCell>{message.recipients}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={statusColors[message.status]}>
                  {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{message.sentAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">Showing 1-5 of 243 results.</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm" className="bg-blue-50">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
