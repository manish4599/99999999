import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusColors = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

interface Order {
  orderId: string;
  customer: string;
  status: keyof typeof statusColors;
  amount: string;
  date: string;
}

const orders: Order[] = [
  {
    orderId: "#ORD-7845",
    customer: "John Doe",
    status: "completed",
    amount: "$584.95",
    date: "Jan 15, 2024",
  },
  {
    orderId: "#ORD-7844",
    customer: "Sarah Smith",
    status: "pending",
    amount: "$244.00",
    date: "Jan 15, 2024",
  },
  {
    orderId: "#ORD-7843",
    customer: "Mike Johnson",
    status: "cancelled",
    amount: "$874.20",
    date: "Jan 14, 2024",
  },
];

export default function OrdersTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="link">View All</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
