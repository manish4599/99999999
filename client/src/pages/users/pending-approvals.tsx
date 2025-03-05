
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingUsersList } from "@/components/users/pending-users-list";
import { UserPreview } from "@/components/users/user-preview";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function PendingApprovalsPage() {
  const [userType, setUserType] = useState("sellers");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsPreviewOpen(true);
  };

  const handleApproveUser = () => {
    // Handle user approval logic here
    console.log(`Approved user: ${selectedUserId}`);
    setIsPreviewOpen(false);
    setSelectedUserId(null);
  };

  const handleRejectUser = () => {
    // Handle user rejection logic here
    console.log(`Rejected user: ${selectedUserId}`);
    setIsPreviewOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pending Approvals</h1>
      </div>

      <Tabs defaultValue="sellers" onValueChange={(value) => setUserType(value)}>
        <TabsList>
          <TabsTrigger value="sellers">Sellers</TabsTrigger>
          <TabsTrigger value="buyers">Buyers</TabsTrigger>
        </TabsList>
        <TabsContent value="sellers">
          <PendingUsersList 
            userType="sellers" 
            selectedUserId={selectedUserId} 
            onSelectUser={handleSelectUser} 
          />
        </TabsContent>
        <TabsContent value="buyers">
          <PendingUsersList 
            userType="buyers" 
            selectedUserId={selectedUserId} 
            onSelectUser={handleSelectUser} 
          />
        </TabsContent>
      </Tabs>

      <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          {selectedUserId && (
            <div className="h-full flex flex-col">
              <UserPreview 
                userId={selectedUserId} 
                userType={userType} 
              />
              <div className="mt-auto pt-6 flex space-x-2">
                <Button 
                  variant="destructive" 
                  onClick={handleRejectUser}
                  className="flex-1"
                >
                  Reject
                </Button>
                <Button 
                  onClick={handleApproveUser}
                  className="flex-1"
                >
                  Approve
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
