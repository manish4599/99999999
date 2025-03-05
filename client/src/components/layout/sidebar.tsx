import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart,
  Bell,
  History,
} from "lucide-react";
import { SiReplit } from "react-icons/si";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "User Management", href: "/users", icon: Users },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Analytics", href: "/analytics", icon: BarChart },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Activity Logs", href: "/activity", icon: History },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="h-full w-64 bg-[#f8fafc] border-r border-gray-200">
      <div className="flex h-14 items-center px-4 border-b border-gray-200">
        <SiReplit className="h-6 w-6 text-blue-600 mr-2" />
        <span className="text-lg font-semibold text-gray-900">Admin Panel</span>
      </div>
      <nav className="p-3 space-y-1">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-lg",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5",
                  isActive ? "text-blue-600" : "text-gray-400"
                )} />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}