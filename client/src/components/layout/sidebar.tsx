
import { useMemo } from "react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  Bell, 
  Activity,
  BarChart,
  Settings,
  HelpCircle
} from "lucide-react";
import { useLocation } from "wouter";
import { SiReplit } from "react-icons/si";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();
  
  const navigation = useMemo(() => [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Users", href: "/users", icon: Users },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Products", href: "/products", icon: Package },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Activity", href: "/activity", icon: Activity },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ], []);

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
            <a
              key={item.name}
              href={item.href}
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
          );
        })}
      </nav>
    </div>
  );
}
