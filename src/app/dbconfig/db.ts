import { Pool } from 'pg';

const pool = new Pool ({
  max: 20,
  connectionString: 'postgres://user:password@localhost:5432/pcs',
  idleTimeoutMillis: 30000
});

export default pool;
