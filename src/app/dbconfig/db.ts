import { Pool } from 'pg';

const initDB = () => {
  const host = process.env.DB_HOST
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const dbname = 'pcs'

  const pool = new Pool({
    max: 20,
    connectionString: `postgres://${user}:${password}@${host}:5432/${dbname}`,
    idleTimeoutMillis: 30000
  });

  return pool;
}

export default initDB;
