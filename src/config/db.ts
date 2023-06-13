import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (typeof databaseUrl === 'undefined') {
  throw new Error('Database URL no definida');
}

const pool = createPool(databaseUrl);

export default pool;
