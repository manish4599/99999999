import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

export default function PendingApprovalsPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userType, setUserType] = useState("sellers");

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

      <div className="flex gap-4">
        <Input
          type="search"
          placeholder="Search users..."
          className="max-w-sm"
        />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Filter by Date</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Business Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Business Type</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="service">Service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <PendingUsersList
            userType={userType}
            onSelectUser={setSelectedUser}
            selectedUserId={selectedUser}
          />
        </div>
        {selectedUser && (
          <UserPreview
            userId={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </div>
  );
}