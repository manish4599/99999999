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