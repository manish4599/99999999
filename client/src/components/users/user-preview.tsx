import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

interface UserPreviewProps {
  userId: string;
  onClose: () => void;
}

export function UserPreview({ userId, onClose }: UserPreviewProps) {
  // This would fetch actual user data in a real implementation
  const user = {
    name: "John Smith",
    business: "Tech Solutions Ltd",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    type: "Technology",
    location: "New York, USA",
    documents: [
      { name: "Business License", url: "#" }
    ]
  };

  return (
    <div className="w-[400px] bg-white border-l border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">User Preview</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-20 w-20 mb-3">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.business}</p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Business Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Type:</span>
              <span className="text-sm">{user.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Location:</span>
              <span className="text-sm">{user.location}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Verification Documents</h4>
          <div className="space-y-2">
            {user.documents.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm">{doc.name}</span>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Admin Notes</h4>
          <Textarea
            placeholder="Add notes..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            Approve
          </Button>
          <Button variant="destructive" className="flex-1">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
