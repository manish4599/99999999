
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { NotificationStats } from "@/components/notifications/notification-stats";
import { NotificationHistory } from "@/components/notifications/notification-history";

export default function NotificationsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("none");
  const [selectedRecipients, setSelectedRecipients] = useState<string>("all");
  const [message, setMessage] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("all");

  const handleSendMessage = () => {
    // In a real app, this would send the message to the API
    console.log("Sending message:", {
      template: selectedTemplate,
      recipients: selectedRecipients,
      message
    });
    // Reset form or show success notification
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications & SMS Management</h1>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700" onClick={handleSendMessage}>
          Send New Message
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Message Composer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Select Template</SelectItem>
                <SelectItem value="order_confirmation">Order Confirmation</SelectItem>
                <SelectItem value="shipping_update">Shipping Update</SelectItem>
                <SelectItem value="account_verification">Account Verification</SelectItem>
                <SelectItem value="password_reset">Password Reset</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={selectedRecipients} onValueChange={setSelectedRecipients}>
              <SelectTrigger>
                <SelectValue placeholder="All Users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="buyers">Buyers</SelectItem>
                <SelectItem value="sellers">Sellers</SelectItem>
                <SelectItem value="admins">Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Type your message here..."
            className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="charsLimit" />
            <label htmlFor="charsLimit" className="text-sm text-gray-500">
              0/160 characters
            </label>
          </div>
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Send Now
          </Button>
        </div>
      </Card>

      <NotificationStats />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Message History</h2>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
              <TabsTrigger value="push">Push</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <NotificationHistory currentTab={currentTab} />
      </Card>
    </div>
  );
}
