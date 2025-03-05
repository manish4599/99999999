
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { NotificationStats } from "@/components/notifications/notification-stats";
import { NotificationHistory } from "@/components/notifications/notification-history";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notifications & SMS Management</h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Message Composer</h3>
            <div className="flex justify-between mb-4">
              <div className="w-1/3 mr-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Message</SelectItem>
                    <SelectItem value="order-confirm">Order Confirmation</SelectItem>
                    <SelectItem value="password-reset">Password Reset</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                    <SelectItem value="sellers">Sellers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Textarea 
              placeholder="Type your message here..." 
              className="min-h-[100px] mb-4"
            />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="char-count" />
                <label htmlFor="char-count" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  0/160 characters
                </label>
              </div>
              
              <Button>Send Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <NotificationStats />
      
      <Card>
        <CardContent className="pt-6">
          <NotificationHistory />
        </CardContent>
      </Card>
    </div>
  );
}
