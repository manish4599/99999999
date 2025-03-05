import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import UsersPage from "@/pages/users";
import OrdersPage from "@/pages/orders";
import PendingApprovalsPage from "@/pages/users/pending-approvals";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import ActivityLogPage from "@/pages/activity";
import NotificationsPage from "@/pages/notifications"; // Added import


function Router() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/users" component={UsersPage} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/users/pending-approvals" component={PendingApprovalsPage} />
            <Route path="/activity" component={ActivityLogPage} />
            <Route path="/notifications" component={NotificationsPage} /> {/* Added notifications route */}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

// Placeholder components for the notifications page (replace with actual implementation)
export const NotificationsPage = () => (
  <div>
    <h1>Notifications Page</h1>
    {/* Add notification stats and history components here */}
    <NotificationStats />
    <NotificationHistory />
  </div>
);

export const NotificationStats = () => <p>Notification Stats Placeholder</p>;
export const NotificationHistory = () => <p>Notification History Placeholder</p>;