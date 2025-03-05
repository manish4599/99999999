
import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NotificationStats } from "@/components/notifications/notification-stats";
import { NotificationHistory } from "@/components/notifications/notification-history";
import { Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function NotificationsPage() {
  const [message, setMessage] = useState("");
  const [templateType, setTemplateType] = useState("");
  const [audience, setAudience] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessage(text);
    setCharacterCount(text.length);
  };

  const handleSendMessage = () => {
    // Implementation for sending messages would go here
    console.log({
      message,
      templateType,
      audience
    });
    // Reset form
    setMessage("");
    setCharacterCount(0);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications & SMS Management</h1>
        <Button 
          size="sm"
          className="flex items-center gap-1"
          onClick={handleSendMessage}
          disabled={!message || !audience}
        >
          <Send className="h-4 w-4" />
          Send New Message
        </Button>
      </div>

      <NotificationStats />

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Message Composer</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1.5 block">Select Template</label>
                <Select value={templateType} onValueChange={setTemplateType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order_confirmation">Order Confirmation</SelectItem>
                    <SelectItem value="shipping_update">Shipping Update</SelectItem>
                    <SelectItem value="promotion">Promotional Message</SelectItem>
                    <SelectItem value="account_update">Account Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1.5 block">Target Audience</label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="new">New Users</SelectItem>
                    <SelectItem value="active">Active Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Textarea 
              placeholder="Type your message here..." 
              className="min-h-[120px]"
              value={message}
              onChange={handleMessageChange}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="sms" />
                <label htmlFor="sms" className="text-sm font-medium leading-none">
                  Send as SMS
                </label>
              </div>
              <div className="text-sm text-gray-500">
                {characterCount}/160 characters
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSendMessage} disabled={!message || !audience}>
                Send Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <NotificationHistory />
    </div>
  );
}
