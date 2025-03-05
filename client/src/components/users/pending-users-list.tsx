
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  {
    id: 4,
    name: "Eco Friendly Products",
    email: "eco@friendly.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eco",
    businessType: "Sustainable Goods",
    joinDate: "Jan 11, 2025",
    location: "Boulder, CO",
    documents: ["Business License", "Product Certifications"],
    notes: "Focus on zero-waste and eco-friendly solutions",
  },
  {
    id: 5,
    name: "Handmade Jewelry",
    email: "jewelry@handmade.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jewelry",
    businessType: "Accessories",
    joinDate: "Jan 10, 2025",
    location: "Santa Fe, NM",
    documents: ["Business Registration", "Tax Documents"],
    notes: "Artisan with 10+ years of experience",
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
  {
    id: 5,
    name: "Morgan White",
    email: "morgan@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=morgan",
    joinDate: "Jan 10, 2025",
    location: "Nashville, TN",
    documents: ["ID Verification"],
    notes: "First-time online shopper",
  },
  {
    id: 6,
    name: "Riley Davis",
    email: "riley@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=riley",
    joinDate: "Jan 9, 2025",
    location: "Chicago, IL",
    documents: ["ID Verification", "Address Proof"],
    notes: "Looking for premium products",
  },
];

export function PendingUsersList({ userType = "sellers", onSelectUser }: { userType?: string, onSelectUser?: (userId: number) => void }) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const users = userType === "sellers" ? pendingSellers : pendingBuyers;
  
  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    if (onSelectUser) {
      onSelectUser(userId);
    }
  };

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
        {users.map((user) => (
          <TableRow
            key={user.id}
            className={`cursor-pointer ${selectedUserId === user.id ? 'bg-blue-50' : ''}`}
            onClick={() => handleUserSelect(user.id)}
          >
            <TableCell>
              <input type="checkbox" className="h-4 w-4" />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.businessType || 'N/A'}</TableCell>
            <TableCell>
              <div>
                <p className="text-sm">{user.email}</p>
                <p className="text-sm text-gray-500">{user.location}</p>
              </div>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded">
                {user.documents.length} {user.documents.length === 1 ? 'Document' : 'Documents'}
              </span>
            </TableCell>
            <TableCell>{user.joinDate}</TableCell>
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
