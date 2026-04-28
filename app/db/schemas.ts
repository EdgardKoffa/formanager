import { pgTable, uuid, varchar, integer, timestamp, numeric, text } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  roleId: uuid("role_id").references(() => roles.id),
  createdAt: timestamp("created_at").defaultNow(),
  
});

export const students = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  address: text("address"),
  personne_a_contacter: varchar("personne_a_contacter", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
   email: varchar("email", { length: 100 }).notNull().unique(),
   genre: varchar("genre", { length: 1 }),
    date_de_naissance: timestamp("date_de_naissance"),
    lieu_de_naissance: varchar("lieu_de_naissance", { length: 100 }),
    nationalite: varchar("nationalite", { length: 50 }),
    niveau_etude: varchar("niveau_etude", { length: 50 }),
   // specialite: varchar("specialite", { length: 100 }),
    date_inscription: timestamp("date_inscription").defaultNow(),
     piece_id_number:text("piece_id_number"),
piece_id_type:text("piece_id_type"),
autre_piece_id:text("autre_piece_id"),
photo_id:text("photo_id"),
numero_matricule:text("numero_matricule").unique().notNull(),//UNIQUE NOT NULL
 vagueFormationId: uuid("vague_formation_id").references(() => vagueFormation.id),
 modulesId: uuid("modules_id").references(() => modules.id),
});
export const vagueFormation=pgTable("vague_formation", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  //price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  duree: varchar("duree", { length: 50 }),
});


export const modules = pgTable("modules", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
   code_module: varchar("code_module", { length: 100 }).notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
 // startDate: timestamp("start_date"),
  //endDate: timestamp("end_date"),
 // duree: varchar("duree", { length: 50 }),
});

export const enrollments = pgTable("enrollments", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id").references(() => students.id),
  moduleId: uuid("module_id").references(() => modules.id),
  status: varchar("status", { length: 20 }).default("pending"),// pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  enrollmentId: uuid("enrollment_id").references(() => enrollments.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  method: varchar("method", { length: 50 }),
  status_payement: varchar("status_payement", { length: 20 }).default("pending"),// pending, completed, failed
  paidAt: timestamp("paid_at").defaultNow(),
});

export const receipts = pgTable("receipts", {
  id: uuid("id").defaultRandom().primaryKey(),
  paymentId: uuid("payment_id").references(() => payments.id),
  receiptNumber: varchar("receipt_number", { length: 50 }).unique().notNull(),
  pdfUrl: text("pdf_url"),
  issuedAt: timestamp("issued_at").defaultNow(),
  employerId: uuid("employer_id").references(() => employer.id),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id").references(() => students.id),
  type: varchar("type", { length: 20 }),
  message: text("message"),
  status: varchar("status", { length: 20 }).default("pending"),
  sentAt: timestamp("sent_at"),
});

export const employer = pgTable("employers", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  companyName: varchar("company_name", { length: 100 }).notNull(),
  contactPerson: varchar("contact_person", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  address: text("address"),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
 // email: varchar("email", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  niveau_etude: varchar("niveau_etude", { length: 50 }),
  poste_occupe: varchar("poste_occupe", { length: 100 }),
  piece_id_number:text("piece_id_number"),
piece_id_type:text("piece_id_type"),
autre_piece_id:text("autre_piece_id"),
photo_id:text("photo_id"),
numero_matricule:text("numero_matricule").unique().notNull()

});

export const company=pgTable("company",{
  id:uuid("id").defaultRandom().primaryKey(),
  name:text("name").notNull().unique(),
  slogan:text("slogan"),
   logo:text("logo"),
})

export const historiques=pgTable("historiques",{
   id:uuid("id").defaultRandom().primaryKey(),
  //name:text("name").notNull().unique(),
 // slogan:text("slogan"),
 
  action:text("action"),
  startAt: timestamp("created_at").defaultNow(),
   endAt: timestamp("created_at"),
  userId: uuid("user_id").references(() => users.id),
})