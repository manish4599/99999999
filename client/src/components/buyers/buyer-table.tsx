
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Buyer = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: "active" | "inactive" | "pending";
  lastPurchase: string;
  totalSpent: string;
  joinDate: string;
};

const buyers: Buyer[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    status: "active",
    lastPurchase: "Jan 15, 2024",
    totalSpent: "$1,245.80",
    joinDate: "Nov 12, 2023",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    status: "active",
    lastPurchase: "Jan 10, 2024",
    totalSpent: "$876.50",
    joinDate: "Dec 05, 2023",
  },
  {
    id: 3,
    name: "Carol Martinez",
    email: "carol@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
    status: "inactive",
    lastPurchase: "Dec 28, 2023",
    totalSpent: "$450.25",
    joinDate: "Oct 18, 2023",
  },
  {
    id: 4,
    name: "David Garcia",
    email: "david@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    status: "pending",
    lastPurchase: "Jan 14, 2024",
    totalSpent: "$125.00",
    joinDate: "Jan 02, 2024",
  },
  {
    id: 5,
    name: "Eva Wilson",
    email: "eva@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eva",
    status: "active",
    lastPurchase: "Jan 08, 2024",
    totalSpent: "$735.40",
    joinDate: "Sep 30, 2023",
  },
  {
    id: 6,
    name: "Frank Thompson",
    email: "frank@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank",
    status: "active",
    lastPurchase: "Jan 05, 2024",
    totalSpent: "$952.75",
    joinDate: "Aug 15, 2023",
  }
];

export function BuyerTable() {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Purchase</TableHead>
          <TableHead>Total Spent</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead className="w-[80px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {buyers.map((buyer) => (
          <TableRow key={buyer.id}>
            <TableCell className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={buyer.avatar} alt={buyer.name} />
                <AvatarFallback>
                  {buyer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{buyer.name}</div>
                <div className="text-sm text-gray-500">{buyer.email}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={statusColors[buyer.status]}
              >
                {buyer.status}
              </Badge>
            </TableCell>
            <TableCell>{buyer.lastPurchase}</TableCell>
            <TableCell>{buyer.totalSpent}</TableCell>
            <TableCell>{buyer.joinDate}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View profile</DropdownMenuItem>
                  <DropdownMenuItem>View orders</DropdownMenuItem>
                  <DropdownMenuItem>Send message</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
