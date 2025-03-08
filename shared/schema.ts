import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  role: text("role").default("user"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull(),
  customerId: integer("customer_id").references(() => users.id),
  amount: decimal("amount").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  revenue: decimal("revenue").notNull(),
  growth: decimal("growth").notNull(),
  avatar: text("avatar"),
});

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string(),
  role: z.enum(["admin", "seller"]),
  status: z.enum(["active", "inactive"]),
  createdAt: z.date(),
});

export const createUserSchema = userSchema.omit({ 
  id: true, 
  avatar: true,
  status: true,
  createdAt: true 
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertStoreSchema = createInsertSchema(stores).omit({ id: true });

export type User = typeof users.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Store = typeof stores.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
