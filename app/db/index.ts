import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from './schemas';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const drizzleDb = drizzle(pool, { schema: schemas });