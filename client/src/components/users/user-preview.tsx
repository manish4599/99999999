
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface UserPreviewProps {
  userId: string;
  userType: string;
}

// Mock function to get user data
const getUserData = (userId: string, userType: string) => {
  // This would be replaced with an actual API call
  const mockSellers = [
    {
      id: "1",
      name: "Tech Innovations Inc",
      email: "contact@techinnovations.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech",
      businessType: "Electronics",
      joinDate: "Jan 15, 2025",
      location: "San Francisco, CA",
      documents: ["Business License", "Tax Documents", "Product Certifications"],
      phone: "+1 (555) 123-4567",
      notes: "Specializes in eco-friendly tech products",
      createdAt: "2025-01-15T08:00:00.000Z",
      username: "techinnovations",
      role: "seller"
    },
    {
      id: "2",
      name: "Organic Delights",
      email: "hello@organicdelights.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=organic",
      businessType: "Food & Beverages",
      joinDate: "Jan 14, 2025",
      location: "Portland, OR",
      documents: ["Health Certification", "Business Registration", "Product Listings"],
      phone: "+1 (555) 987-6543",
      notes: "Family-owned business focusing on organic products",
      createdAt: "2025-01-14T10:30:00.000Z",
      username: "organicdelights",
      role: "seller"
    },
  ];

  const mockBuyers = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      joinDate: "Jan 15, 2025",
      location: "New York, NY",
      documents: ["ID Verification", "Address Proof"],
      phone: "+1 (555) 123-4567",
      notes: "Frequent purchaser of electronics",
      createdAt: "2025-01-15T08:00:00.000Z",
      username: "johnsmith",
      role: "buyer"
    },
    {
      id: "2",
      name: "Emma Johnson",
      email: "emma.j@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      joinDate: "Jan 14, 2025",
      location: "Chicago, IL",
      documents: ["ID Verification", "Payment Verification"],
      phone: "+1 (555) 987-6543",
      notes: "Interested in home goods and decor",
      createdAt: "2025-01-14T10:30:00.000Z",
      username: "emmaj",
      role: "buyer"
    },
  ];

  const users = userType === "sellers" ? mockSellers : mockBuyers;
  return users.find(user => user.id === userId) || null;
};

export function UserPreview({ userId, userType }: UserPreviewProps) {
  const user = getUserData(userId, userType);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle>User Details</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.phone}</p>
          <Badge variant="outline" className="mt-1">
            {user.role === "seller" ? "Seller" : "Buyer"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {user.role === "seller" && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-1 text-sm">
                <dt className="text-gray-500">Type:</dt>
                <dd>{(user as any).businessType || 'N/A'}</dd>
                <dt className="text-gray-500">Location:</dt>
                <dd>{user.location}</dd>
                <dt className="text-gray-500">Joined:</dt>
                <dd>{user.joinDate}</dd>
              </dl>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm">
              {user.documents.map((doc: string, index: number) => (
                <li key={index} className="text-gray-700">{doc}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {user.notes && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{user.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
