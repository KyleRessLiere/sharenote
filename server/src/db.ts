import { Pool } from "pg"

// Directly hardcoded Neon database URL
export const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_7lIXo6JgWrKn@ep-dry-night-a4eeqi1r-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false }, 
})
