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
    const [orders, users, stores] = await Promise.all([
      storage.getOrders(),
      storage.getUsers(),
      storage.getTopStores(),
    ]);

    const usersMap = new Map(users.map(u => [u.id, u]));
    const storesMap = new Map(stores.map(s => [s.id, s]));

    const ordersWithDetails = orders.map(order => ({
      id: order.orderId,
      buyer: {
        name: usersMap.get(order.customerId)?.username || "Unknown",
        avatar: usersMap.get(order.customerId)?.avatar || "",
      },
      seller: {
        name: storesMap.get(1)?.name || "Unknown", // For demo, using first store
        avatar: storesMap.get(1)?.avatar || "",
      },
      date: order.createdAt,
      amount: order.amount,
      status: order.status,
    }));

    const completed = orders.filter(o => o.status === "completed").length;
    const pending = orders.filter(o => o.status === "pending").length;
    const cancelled = orders.filter(o => o.status === "cancelled").length;

    res.json({
      totalOrders: orders.length,
      completedOrders: completed,
      pendingOrders: pending,
      cancelledOrders: cancelled,
      orders: ordersWithDetails,
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}