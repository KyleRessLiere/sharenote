import db from "@/lib/db";

export async function getNoteById(id: number) {
  const result = await db.query("SELECT * FROM notes WHERE id = $1", [id]);
  return result.rows[0];
}

export async function saveNote(content: string) {
  const result = await db.query(
    "INSERT INTO notes (content) VALUES ($1) RETURNING *",
    [content]
  );
  return result.rows[0];
}
