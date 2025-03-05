import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { hashPassword, comparePassword, generateToken, authMiddleware, adminMiddleware } from "./auth";

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

  // Authentication routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      
      // Check if admin with email already exists
      const existingAdmin = await storage.findAdminByEmail(email);
      if (existingAdmin) {
        return res.status(400).json({ message: "Email already in use" });
      }
      
      // Hash the password
      const hashedPassword = await hashPassword(password);
      
      // Create the admin
      const admin = await storage.createAdmin(username, email, hashedPassword);
      
      // Generate a token
      const token = generateToken(admin.id, admin.role);
      
      // Set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
      
      return res.status(201).json({
        message: "Admin registered successfully",
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Registration failed" });
    }
  });
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // Find the admin by email
      const admin = await storage.findAdminByEmail(email);
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify the password
      const isPasswordValid = await comparePassword(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Generate a token
      const token = generateToken(admin.id, admin.role);
      
      // Set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
      
      return res.json({
        message: "Login successful",
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Login failed" });
    }
  });
  
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    res.clearCookie("token");
    return res.json({ message: "Logged out successfully" });
  });
  
  // Protected route example
  app.get("/api/profile", authMiddleware, (req: Request, res: Response) => {
    return res.json({ user: req.user });
  });
  
  // Admin only route
  app.get("/api/admin/dashboard", authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    const [users, newSignups, orders, recentOrders, topStores] = await Promise.all([
      storage.getUsers(),
      storage.getNewSignups(30),
      storage.getOrders(),
      storage.getRecentOrders(5),
      storage.getTopStores(),
    ]);

    return res.json({
      totalUsers: users.length,
      newSignups,
      totalOrders: orders.length,
      pendingApprovals: orders.filter(o => o.status === "pending").length,
      recentOrders,
      topStores,
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}