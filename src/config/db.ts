import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (
  DATABASE_URL === undefined ||
  DATABASE_URL.trim() === ''
) {
  throw new Error('Database URL no definida');
}

const pool = createPool(DATABASE_URL);

export default pool;
