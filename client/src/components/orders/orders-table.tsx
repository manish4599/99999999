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

interface Order {
  id: string;
  buyer: {
    name: string;
    avatar: string;
  };
  seller: {
    name: string;
    avatar: string;
  };
  date: string;
  amount: string;
  status: "completed" | "pending" | "cancelled";
}

const statusColors = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Buyer</TableHead>
          <TableHead>Seller</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">#{order.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={order.buyer.avatar} />
                  <AvatarFallback>{order.buyer.name[0]}</AvatarFallback>
                </Avatar>
                <span>{order.buyer.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={order.seller.avatar} />
                  <AvatarFallback>{order.seller.name[0]}</AvatarFallback>
                </Avatar>
                <span>{order.seller.name}</span>
              </div>
            </TableCell>
            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
            <TableCell>${order.amount}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={statusColors[order.status]}
              >
                {order.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Demo data for orders - this can be loaded from an API in a real application
export const demoOrders = [
  {
    id: "#ORD-7845",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john"
    },
    items: 5,
    total: "$584.95",
    status: "completed",
    date: "Jan 15, 2024",
    address: "123 Main St, New York, NY 10001"
  },
  {
    id: "#ORD-7844",
    customer: {
      name: "Sarah Smith",
      email: "sarah@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    items: 2,
    total: "$244.00",
    status: "pending",
    date: "Jan 15, 2024",
    address: "456 Oak Ave, Los Angeles, CA 90001"
  },
  {
    id: "#ORD-7843",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
    },
    items: 8,
    total: "$874.20",
    status: "cancelled",
    date: "Jan 14, 2024",
    address: "789 Pine St, Chicago, IL 60007"
  },
  {
    id: "#ORD-7842",
    customer: {
      name: "Lisa Chen",
      email: "lisa@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
    },
    items: 1,
    total: "$145.50",
    status: "processing",
    date: "Jan 14, 2024",
    address: "321 Maple Rd, Boston, MA 02108"
  },
  {
    id: "#ORD-7841",
    customer: {
      name: "Robert Garcia",
      email: "robert@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert"
    },
    items: 3,
    total: "$329.99",
    status: "completed",
    date: "Jan 13, 2024",
    address: "654 Elm St, Miami, FL 33101"
  }
];