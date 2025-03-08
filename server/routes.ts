import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createUserSchema } from "@shared/schema";
import { hash } from "bcrypt";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create user
  app.post("/api/users/create", async (req, res) => {
    try {
      const result = createUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid user data", 
          errors: result.error.errors 
        });
      }

      const { username, email, password, role } = result.data;
      
      // Check if user already exists
      const existingUsers = await storage.getUsers();
      if (existingUsers.some(u => u.email === email)) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await hash(password, 10);

      // Create user
      await storage.createUser({
        username,
        email,
        password: hashedPassword,
        role,
        status: "active"
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

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

  // Update user status
  app.post("/api/users/:userId/update-status", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { status } = req.body;

    if (!userId || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid request" });
    }

    try {
      await storage.updateUserStatus(userId, status);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user status" });
    }
  });

  // Get pending users
  app.get("/api/users/pending", async (_req, res) => {
    const users = await storage.getUsers();
    const pendingUsers = users.filter(user => user.status === "pending");
    res.json(pendingUsers);
  });

  const httpServer = createServer(app);
  return httpServer;
}