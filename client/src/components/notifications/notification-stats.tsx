
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle, Send } from "lucide-react";

// Stats component for notification dashboard
export function NotificationStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex flex-col items-center justify-center">
          <Send className="h-5 w-5 text-blue-500 mb-2" />
          <p className="text-sm text-gray-500">Total Sent</p>
          <h3 className="text-2xl font-bold">24,123</h3>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex flex-col items-center justify-center">
          <CheckCircle className="h-5 w-5 text-green-500 mb-2" />
          <p className="text-sm text-gray-500">Delivered</p>
          <h3 className="text-2xl font-bold">23,492</h3>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex flex-col items-center justify-center">
          <Clock className="h-5 w-5 text-yellow-500 mb-2" />
          <p className="text-sm text-gray-500">Pending</p>
          <h3 className="text-2xl font-bold">412</h3>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex flex-col items-center justify-center">
          <XCircle className="h-5 w-5 text-red-500 mb-2" />
          <p className="text-sm text-gray-500">Failed</p>
          <h3 className="text-2xl font-bold">219</h3>
        </div>
      </Card>
    </div>
  );
}
