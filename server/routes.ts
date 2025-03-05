import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard metrics
  app.get("/api/dashboard", async (_req, res) => {
    const [users, newSignups, orders, recentOrders, topStores] = await Promise.all([
      storage.getUsers(),
      storage.getNewSignups(30),
      storage.getOrders(),
      storage.getRecentOrders(5),
      storage.getTopStores(),
    ]);

    res.json({
      totalUsers: users.length,
      newSignups,
      totalOrders: orders.length,
      pendingApprovals: orders.filter(o => o.status === "pending").length,
      recentOrders,
      topStores,
    });
  });

  // Orders data
  app.get("/api/orders", async (_req, res) => {
    const orders = await storage.getOrders();
    const completed = orders.filter(o => o.status === "completed").length;
    const pending = orders.filter(o => o.status === "pending").length;
    const cancelled = orders.filter(o => o.status === "cancelled").length;

    res.json({
      totalOrders: orders.length,
      completedOrders: completed,
      pendingOrders: pending,
      cancelledOrders: cancelled,
      orders: orders.slice(0, 10) // Return first 10 orders for the table
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}