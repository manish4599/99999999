
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPreview } from "@/components/users/user-preview";
import { PendingUsersList } from "@/components/users/pending-users-list";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function PendingApprovalsPage() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [userType, setUserType] = useState("sellers");

  const handleUserSelect = (userId: number) => {
    setSelectedUser(userId);
  };

  const handleClosePreview = () => {
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Pending Approvals</h1>
      </div>

      <div className="border-b border-gray-200">
        <Tabs value={userType} onValueChange={setUserType} className="w-full">
          <TabsList className="w-[400px] grid grid-cols-2">
            <TabsTrigger 
              value="sellers" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Pending Sellers
            </TabsTrigger>
            <TabsTrigger 
              value="buyers"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Pending Buyers
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Input placeholder="Search by name or email..." />
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Filter by document status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Documents</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="incomplete">Incomplete</SelectItem>
            <SelectItem value="pending">Verification Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="newest">
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PendingUsersList userType={userType} onSelectUser={handleUserSelect} />

      {/* User Preview Side Panel */}
      <Sheet open={selectedUser !== null} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] p-0">
          {selectedUser && (
            <UserPreview userId={selectedUser.toString()} onClose={handleClosePreview} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
