//import { drizzle } from "drizzle-orm/node-postgres";
//import { Pool } from "pg";
import {drizzleDb} from '@/app/db'
import bcrypt from "bcryptjs";
import { roles, users } from "@/app/db/schemas"; // adapte le chemin
import { eq } from 'drizzle-orm';

/* const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
}); */

const db =drizzleDb// drizzle(pool);

async function seedAdmin() {
  // 1. Créer le rôle admin s’il n’existe pas
  const [adminRole] = await db
    .insert(roles)
    .values({
      name: "admin",
      description: "Administrateur du système",
    })
    .onConflictDoNothing()
    .returning();

  // 2. Récupérer l’ID du rôle admin
  let roleId = adminRole?.id;
  if (!roleId) {
    const existing = await db.select().from(roles).where(eq(roles.name,"admin"));
    roleId = existing[0].id;
  }

  // 3. Générer un hash bcrypt pour le mot de passe
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  // 4. Créer l’utilisateur admin
  await db
    .insert(users)
    .values({
      email: "admin@localhost.com",
      passwordHash,
      roleId,
    })
    .onConflictDoNothing();

  console.log("✅ Rôle et compte admin seedés avec succès !");
}

seedAdmin()
  .catch((err) => {
    console.error("❌ Erreur lors du seed admin :", err);
  })
 /*  .finally(() => {
    pool.end();
  }); */
