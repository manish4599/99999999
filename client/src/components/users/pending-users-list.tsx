import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface PendingUsersListProps {
  userType: string;
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export function PendingUsersList({ userType, selectedUserId, onSelectUser }: PendingUsersListProps) {
  // This would fetch actual pending users in a real implementation
  const users = [
    {
      id: "1",
      name: "John Smith",
      business: "Tech Solutions Ltd",
      type: "Technology",
      contact: {
        email: "john@techsolutions.com",
        phone: "+1 234 567 890"
      },
      documents: "Complete",
      date: "Jan 15, 2025",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john"
    }
  ];

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
            onClick={() => onSelectUser(user.id)}
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
                  <p className="text-sm text-gray-500">{user.business}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.type}</TableCell>
            <TableCell>
              <div>
                <p className="text-sm">{user.contact.email}</p>
                <p className="text-sm text-gray-500">{user.contact.phone}</p>
              </div>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded">
                {user.documents}
              </span>
            </TableCell>
            <TableCell>{user.date}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                Complete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
