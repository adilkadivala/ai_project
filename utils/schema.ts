import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOutput", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  createdBy: varchar("createdBy").notNull(),
  formData: text("formData").notNull(),
  aiResponse: text("aiResponse").notNull(),
  templateSlug: varchar("templateSlug").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

export const UserSubscription = pgTable("userSubscription", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  email: varchar("email").notNull(),
  userName: varchar("userName"),
  active: boolean("active"),
  paymentId: varchar("paymentId"),
  joinDate: varchar("joinDate"),
  planType: text("plan_type"),
});
