import { pgTable, uuid, varchar, integer, timestamp, numeric, text } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  roleId: text("role_id").references(() => roles.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const students = pgTable("students", {
  id: uuid("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  address: text("address"),
  personne_a_contacter: varchar("personne_a_contacter", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
   email: varchar("email", { length: 100 }).notNull().unique(),
});

export const modules = pgTable("modules", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
});

export const enrollments = pgTable("enrollments", {
  id: uuid("id").primaryKey(),
  studentId: text("student_id").references(() => students.id),
  moduleId: text("module_id").references(() => modules.id),
  status: varchar("status", { length: 20 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey(),
  enrollmentId: text("enrollment_id").references(() => enrollments.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  method: varchar("method", { length: 50 }),
  paidAt: timestamp("paid_at").defaultNow(),
});

export const receipts = pgTable("receipts", {
  id: uuid("id").primaryKey(),
  paymentId: text("payment_id").references(() => payments.id),
  receiptNumber: varchar("receipt_number", { length: 50 }).unique().notNull(),
  pdfUrl: text("pdf_url"),
  issuedAt: timestamp("issued_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey(),
  studentId: text("student_id").references(() => students.id),
  type: varchar("type", { length: 20 }),
  message: text("message"),
  status: varchar("status", { length: 20 }).default("pending"),
  sentAt: timestamp("sent_at"),
});
