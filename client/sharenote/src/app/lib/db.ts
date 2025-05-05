import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_7lIXo6JgWrKn@ep-dry-night-a4eeqi1r-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

export default pool;
