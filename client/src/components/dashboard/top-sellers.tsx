import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Store {
  name: string;
  category: string;
  revenue: string;
  growth: string;
  avatar: string;
}

const stores: Store[] = [
  {
    name: "Tech Store",
    category: "Electronics",
    revenue: "$45,254",
    growth: "+12.5%",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=tech",
  },
  {
    name: "Fashion Hub",
    category: "Clothing",
    revenue: "$38,124",
    growth: "+8.3%",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=fashion",
  },
  {
    name: "Sports World",
    category: "Sports Gear",
    revenue: "$28,985",
    growth: "-2.1%",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=sports",
  },
];

export default function TopSellers() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Sellers</CardTitle>
        <Button variant="link">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stores.map((store) => (
            <div key={store.name} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={store.avatar} />
                  <AvatarFallback>{store.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{store.name}</p>
                  <p className="text-sm text-muted-foreground">{store.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{store.revenue}</p>
                <p
                  className={
                    store.growth.startsWith("+")
                      ? "text-sm text-green-600"
                      : "text-sm text-red-600"
                  }
                >
                  {store.growth}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
