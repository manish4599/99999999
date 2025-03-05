
import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/auth/login");
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return user ? <>{children}</> : null;
}
