import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './app/db/schemas.ts',
  dialect: 'postgresql',
  
  dbCredentials: {
    url: process.env.DATABASE_URL!, // ex: "postgresql://user:password@host:5432/dbname"
  },

});

/* database:process.env.DATABASE_NAME!,
    host:process.env.DATABASE_HOST!,
    port:Number(process.env.DATABASE_PORT!),
    user:process.env.DATABASE_USER!,
    password:process.env.DATABASE_PWD !, */
