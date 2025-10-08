import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  createdBy: varchar("createdBy").notNull(),
  formData: text("formData").notNull(),
  aiResponse: text("aiResponse").notNull(),
  templateSlug: varchar("templateSlug").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

export const UserSubscription = pgTable("userSubscription", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull(),
  userName: varchar("userName"),
  active: boolean("active"),
  paymentId: varchar("paymentId"),
  joinDate: varchar("joinDate"),
});
