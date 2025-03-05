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
import { Eye, Pencil, Trash2, Star } from "lucide-react";

interface Seller {
  id: number;
  name: string;
  email: string;
  avatar: string;
  businessType: string;
  status: "active" | "inactive";
  rating: number;
  sales: string;
}

const demoSellers: Seller[] = [
  {
    id: 1,
    name: "Tech Store",
    email: "tech@store.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech",
    businessType: "Electronics",
    status: "active",
    rating: 4.8,
    sales: "2.4k",
  },
  // Add more demo sellers here
];

export function UserTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seller Details</TableHead>
          <TableHead>Business Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Performance</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {demoSellers.map((seller) => (
          <TableRow key={seller.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={seller.avatar} />
                  <AvatarFallback>{seller.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{seller.name}</p>
                  <p className="text-sm text-gray-500">{seller.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{seller.businessType}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={
                  seller.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {seller.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{seller.rating}</span>
                <span className="text-gray-500 ml-2">{seller.sales} sales</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
