import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Eye } from "lucide-react";
import { ActivityTable } from "@/components/activity/activity-table";

export default function ActivityLogPage() {
  const [dateRange, setDateRange] = useState<string>("");
  const [userType, setUserType] = useState<string>("all");
  const [activityType, setActivityType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Activity Log</h1>
      </div>

      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div>
            <label className="text-sm text-gray-500 mb-1.5 block">Date Range</label>
            <Input
              type="date"
              placeholder="Select date range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1.5 block">User Type</label>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger>
                <SelectValue placeholder="All Users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
                <SelectItem value="seller">Sellers</SelectItem>
                <SelectItem value="buyer">Buyers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1.5 block">Activity Type</label>
            <Select value={activityType} onValueChange={setActivityType}>
              <SelectTrigger>
                <SelectValue placeholder="All Activities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="login">Login Attempts</SelectItem>
                <SelectItem value="order">Order Activities</SelectItem>
                <SelectItem value="user">User Activities</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1.5 block">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Input
            type="search"
            placeholder="Search logs..."
            className="max-w-sm"
          />
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        <ActivityTable />
      </Card>
    </div>
  );
}
