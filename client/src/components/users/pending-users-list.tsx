import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

interface PendingUsersListProps {
  userType: string;
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export function PendingUsersList({ userType, selectedUserId, onSelectUser }: PendingUsersListProps) {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['/api/users/pending'],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredUsers = users.filter(user => 
    userType === 'sellers' ? user.role === 'seller' : user.role === 'buyer'
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <input type="checkbox" className="h-4 w-4" />
          </TableHead>
          <TableHead>USER</TableHead>
          <TableHead>BUSINESS</TableHead>
          <TableHead>CONTACT</TableHead>
          <TableHead>DOCUMENTS</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>STATUS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.map((user) => (
          <TableRow
            key={user.id}
            className={`cursor-pointer ${selectedUserId === user.id ? 'bg-blue-50' : ''}`}
            onClick={() => onSelectUser(user.id)}
          >
            <TableCell>
              <input type="checkbox" className="h-4 w-4" />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.businessType || 'N/A'}</TableCell>
            <TableCell>
              <div>
                <p className="text-sm">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone || 'N/A'}</p>
              </div>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded">
                Complete
              </span>
            </TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <span className="px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded">
                Pending
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface PendingUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  businessType?: string;
  joinDate: string;
  location: string;
  documents: string[];
  notes?: string;
}

// Demo data for pending sellers
const pendingSellers: PendingUser[] = [
  {
    id: 1,
    name: "Creative Crafts Shop",
    email: "crafts@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=crafts",
    businessType: "Handcrafted Goods",
    joinDate: "Jan 14, 2025",
    location: "Portland, OR",
    documents: ["Business License", "ID Verification", "Tax Documents"],
    notes: "Previous experience selling on Etsy for 3 years",
  },
  {
    id: 2,
    name: "Gourmet Delights",
    email: "gourmet@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gourmet",
    businessType: "Food & Beverages",
    joinDate: "Jan 13, 2025",
    location: "Chicago, IL",
    documents: ["Food Handling Certificate", "Business Registration"],
    notes: "Family-owned business since 2010",
  },
  {
    id: 3,
    name: "Tech Innovations",
    email: "tech@innovations.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=innovations",
    businessType: "Electronics",
    joinDate: "Jan 12, 2025",
    location: "San Jose, CA",
    documents: ["Company Registration", "Product Certifications"],
  },
];

// Demo data for pending buyers
const pendingBuyers: PendingUser[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    joinDate: "Jan 14, 2025",
    location: "Miami, FL",
    documents: ["ID Verification"],
  },
  {
    id: 2,
    name: "Taylor Williams",
    email: "taylor@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=taylor",
    joinDate: "Jan 13, 2025",
    location: "Denver, CO",
    documents: ["ID Verification", "Address Proof"],
    notes: "Interested in bulk purchases for business",
  },
  {
    id: 3,
    name: "Jordan Smith",
    email: "jordan@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    joinDate: "Jan 12, 2025",
    location: "Seattle, WA",
    documents: ["ID Verification"],
  },
  {
    id: 4,
    name: "Casey Brown",
    email: "casey@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=casey",
    joinDate: "Jan 11, 2025",
    location: "Austin, TX",
    documents: ["ID Verification", "Address Proof"],
  },
];

export function PendingUsersList({ userType = "sellers" }: { userType?: string }) {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  
  const users = userType === "sellers" ? pendingSellers : pendingBuyers;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Card key={user.id} className={selectedUser === user.id ? "ring-2 ring-blue-500" : ""}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {user.businessType && (
                <div className="flex justify-between">
                  <span className="font-medium">Business Type:</span>
                  <span>{user.businessType}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Application Date:</span>
                <span>{user.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Location:</span>
                <span>{user.location}</span>
              </div>
              <div className="mt-3">
                <span className="font-medium">Documents:</span>
                <ul className="mt-1 list-disc pl-5">
                  {user.documents.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
              {user.notes && (
                <div className="mt-3">
                  <span className="font-medium">Notes:</span>
                  <p className="mt-1 text-gray-600">{user.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedUser(user.id)}
            >
              Review Details
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 text-red-600 hover:bg-red-50"
              >
                <XCircle className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 text-green-600 hover:bg-green-50"
              >
                <CheckCircle className="h-5 w-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
