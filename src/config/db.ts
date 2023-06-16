import { createPool } from 'mysql2/promise';
import { DATABASE_URL } from './env';

const pool = createPool(DATABASE_URL);

export default pool;
