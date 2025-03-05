import { Route, Switch } from "wouter";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Dashboard from "@/pages/dashboard";
import UsersPage from "@/pages/users";
import OrdersPage from "@/pages/orders";
import ProductsPage from "@/pages/products"; // Added import, assumed to exist
import SettingsPage from "@/pages/settings"; // Added import, assumed to exist
import ActivityPage from "@/pages/activity";
import NotificationsPage from "@/pages/notifications";
import AnalyticsPage from "@/pages/analytics";
import HelpCenter from "@/pages/help"; // Added import, assumed to exist
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Loader } from "lucide-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full w-full">
    <Loader className="animate-spin h-8 w-8 text-blue-500" />
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-screen bg-background text-foreground">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto">
              <Suspense fallback={<LoadingSpinner />}>
                <ErrorBoundary>
                  <Switch>
                    <Route path="/" component={Dashboard} />
                    <Route path="/users" component={UsersPage} />
                    <Route path="/orders" component={OrdersPage} />
                    <Route path="/products" component={ProductsPage} />
                    <Route path="/settings" component={SettingsPage} />
                    <Route path="/activity" component={ActivityPage} />
                    <Route path="/notifications" component={NotificationsPage} />
                    <Route path="/analytics" component={AnalyticsPage} />
                    <Route path="/help" component={HelpCenter} />
                  </Switch>
                </ErrorBoundary>
              </Suspense>
            </main>
          </div>
        </div>
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}