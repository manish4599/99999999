import { users, orders, stores, type User, type Order, type Store, type InsertUser, type InsertOrder, type InsertStore } from "@shared/schema";

export interface IStorage {
  // Users
  getUsers(): Promise<User[]>;
  getNewSignups(days: number): Promise<number>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getRecentOrders(limit: number): Promise<Order[]>;
  
  // Stores
  getTopStores(): Promise<Store[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private orders: Map<number, Order>;
  private stores: Map<number, Store>;
  
  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.stores = new Map();
    
    // Initialize with mock data
    this.initializeMockData();
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getNewSignups(days: number): Promise<number> {
    const now = new Date();
    const threshold = new Date(now.setDate(now.getDate() - days));
    return Array.from(this.users.values()).filter(
      user => new Date(user.createdAt) >= threshold
    ).length;
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getRecentOrders(limit: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getTopStores(): Promise<Store[]> {
    return Array.from(this.stores.values())
      .sort((a, b) => Number(b.revenue) - Number(a.revenue))
      .slice(0, 3);
  }

  private initializeMockData() {
    // Mock Users
    this.users.set(1, {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      role: "user",
      createdAt: new Date("2024-01-01"),
    });
    // Add more mock users...

    // Mock Orders
    this.orders.set(1, {
      id: 1,
      orderId: "ORD-7845",
      customerId: 1,
      amount: "584.95",
      status: "completed",
      createdAt: new Date("2024-01-15"),
    });
    // Add more mock orders...

    // Mock Stores
    this.stores.set(1, {
      id: 1,
      name: "Tech Store",
      category: "Electronics",
      revenue: "45254.00",
      growth: "12.5",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=tech",
    });
    // Add more mock stores...
  }
}

export const storage = new MemStorage();
