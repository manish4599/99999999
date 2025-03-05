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