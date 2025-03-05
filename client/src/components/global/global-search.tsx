
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  Search,
  User,
  ShoppingCart,
  Package,
  Activity,
  BarChart,
  Settings,
  FileText,
} from "lucide-react";
import { useLocation } from "wouter";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  icon: JSX.Element;
  url: string;
}

export function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();

  // Mock search results - in a real app these would be filtered based on the query
  const searchResults: SearchResult[] = [
    // Users
    { 
      id: "user-1", 
      title: "John Doe", 
      category: "Users", 
      icon: <User className="h-4 w-4 text-blue-500" />,
      url: "/users?id=1"
    },
    {
      id: "user-2",
      title: "Jane Smith",
      category: "Users",
      icon: <User className="h-4 w-4 text-blue-500" />,
      url: "/users?id=2"
    },
    
    // Orders
    {
      id: "order-1",
      title: "Order #1234",
      category: "Orders",
      icon: <ShoppingCart className="h-4 w-4 text-green-500" />,
      url: "/orders?id=1234"
    },
    {
      id: "order-2",
      title: "Order #5678",
      category: "Orders",
      icon: <ShoppingCart className="h-4 w-4 text-green-500" />,
      url: "/orders?id=5678"
    },
    
    // Products
    {
      id: "product-1",
      title: "Premium Widget",
      category: "Products",
      icon: <Package className="h-4 w-4 text-purple-500" />,
      url: "/products?id=1"
    },
    
    // Pages
    {
      id: "page-dashboard",
      title: "Dashboard",
      category: "Pages",
      icon: <FileText className="h-4 w-4 text-gray-500" />,
      url: "/"
    },
    {
      id: "page-analytics",
      title: "Analytics",
      category: "Pages",
      icon: <BarChart className="h-4 w-4 text-gray-500" />,
      url: "/analytics"
    },
    {
      id: "page-activity",
      title: "Activity Log",
      category: "Pages",
      icon: <Activity className="h-4 w-4 text-gray-500" />,
      url: "/activity"
    },
    {
      id: "page-settings",
      title: "Settings",
      category: "Pages",
      icon: <Settings className="h-4 w-4 text-gray-500" />,
      url: "/settings"
    },
  ];

  // Filter results based on query
  const filteredResults = query.length > 0
    ? searchResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchResults;

  const handleSelect = (item: SearchResult) => {
    navigate(item.url);
    onClose();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder="Search for users, orders, products..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {["Users", "Orders", "Products", "Pages"].map(category => {
          const categoryResults = filteredResults.filter(
            result => result.category === category
          );
          
          if (categoryResults.length === 0) return null;
          
          return (
            <CommandGroup key={category} heading={category}>
              {categoryResults.map(result => (
                <CommandItem 
                  key={result.id}
                  onSelect={() => handleSelect(result)}
                >
                  <div className="flex items-center">
                    {result.icon}
                    <span className="ml-2">{result.title}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
