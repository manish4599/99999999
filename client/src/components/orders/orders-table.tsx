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
            <TableCell>{order.date}</TableCell>
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
