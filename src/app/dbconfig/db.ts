import { Pool } from 'pg';

const initDB = () => {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const dbname = 'pcs';
  var connectionString =`postgres://${user}:${password}@${host}:${port}/${dbname}`;
  if (process.env.ENV === "live") {
    connectionString = process.env.DATABASE_URL;
  }
  console.log("connecting to db at:", connectionString);

  const pool = new Pool({
    max: 20,
    connectionString: connectionString,
    idleTimeoutMillis: 30000
  });

  return pool;
}

export default initDB;
