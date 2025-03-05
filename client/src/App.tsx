import { createContext, useContext, useState, useEffect } from 'react';
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

// Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data from local storage or API
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


// Import login and register pages
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";


//Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Route path="/auth/login" component={LoginPage} />;
  }
  return children;
};


function Router() {
  return (
    <Switch>
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/auth/register" component={RegisterPage} />
      <Route path="*">
        <ProtectedRoute>
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
                  <Route component={NotFound} />
                </Switch>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;