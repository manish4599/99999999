import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart,
  Bell,
  History,
  UserCheck,
} from "lucide-react";
import { SiReplit } from "react-icons/si";

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  isActive?: boolean;
};

const SidebarLink: React.FC<SidebarItem> = ({
  title,
  href,
  icon: Icon,
  isActive,
}) => {
  const [location, navigate] = useLocation();
  const active = isActive || location === href;

  return (
    <button
      onClick={() => navigate(href)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-left transition-all",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {title}
    </button>
  );
};

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "User Management", href: "/users", icon: Users },
  { name: "Pending Approvals", href: "/users/pending-approvals", icon: UserCheck },
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
            <SidebarLink key={item.name} title={item.name} href={item.href} icon={item.icon} isActive={isActive} />
          );
        })}
      </nav>
    </div>
  );
}