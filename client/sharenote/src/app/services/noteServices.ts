import db from "@/lib/db";

export async function noteById(id: number) {
  const result = await db.query("SELECT * FROM notes WHERE id = $1", [id]);
  return result.rows[0];
}
