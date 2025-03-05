
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Download, File } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { apiRequest } from "@/lib/api";

interface UserPreviewProps {
  userId: string;
  onClose: () => void;
}

export function UserPreview({ userId, onClose }: UserPreviewProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const updateStatusMutation = useMutation({
    mutationFn: async (status: 'approved' | 'rejected') => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/pending'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      toast({
        title: "Status Updated",
        description: "User status has been updated successfully.",
      });
      onClose();
    },
    onError: () => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to update user status. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Find user from the pendingSellers or pendingBuyers array
  // This is a demo implementation - in a real app you would fetch from API
  const pendingUserId = parseInt(userId, 10);
  const user = [
    ...pendingSellers,
    ...pendingBuyers
  ].find(u => u.id === pendingUserId);

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  const handleApprove = () => {
    updateStatusMutation.mutate('approved');
  };

  const handleReject = () => {
    updateStatusMutation.mutate('rejected');
  };

  return (
    <div className="h-full overflow-auto">
      <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">User Application</h3>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
            <Badge variant="outline" className="mt-2">
              Pending Approval
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Application Date</p>
              <p className="font-medium">{user.joinDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{user.location}</p>
            </div>
            {user.businessType && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Business Type</p>
                <p className="font-medium">{user.businessType}</p>
              </div>
            )}
          </div>

          <div className="pt-4">
            <h4 className="text-md font-semibold mb-2">Submitted Documents</h4>
            <div className="space-y-2">
              {user.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4 text-blue-500" />
                    <span>{doc}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {user.notes && (
            <div className="pt-4">
              <h4 className="text-md font-semibold mb-2">Notes</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{user.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-2">
        <Button 
          variant="outline" 
          className="gap-1"
          onClick={handleReject}
          disabled={isLoading}
        >
          <XCircle className="h-4 w-4 text-red-500" />
          Reject
        </Button>
        <Button 
          className="gap-1 bg-green-600 hover:bg-green-700"
          onClick={handleApprove}
          disabled={isLoading}
        >
          <CheckCircle className="h-4 w-4" />
          Approve
        </Button>
      </div>
    </div>
  );
}

// Import mock data
import { pendingSellers, pendingBuyers } from "@/components/users/pending-users-list";
