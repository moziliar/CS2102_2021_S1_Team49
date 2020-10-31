import { Client } from 'pg';

export let db: Client;

const initDB = async () => {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const dbname = 'pcs';
  var connectionString =`postgres://${user}:${password}@${host}:${port}/${dbname}`;
  if (process.env.ENV === "live" && process.env.DATABASE_URL) {
    connectionString = process.env.DATABASE_URL;
  }
  console.log('connecting to db at:', connectionString);

  db = new Client({
    connectionString: connectionString,
  });

  db.connect().then(() => {
    console.log('db initialized');
  });
}

export default initDB;
