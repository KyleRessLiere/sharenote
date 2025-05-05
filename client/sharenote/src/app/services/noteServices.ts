import db from "@/lib/db";

export async function getNoteById(id: number) {
  const result = await db.query(
    "SELECT * FROM notes WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export async function getNotesByAccount(accountId: number) {
  const result = await db.query(
    "SELECT * FROM notes ORDER BY created_at DESC"
  );
  return result.rows;
}

export async function saveNote(content: string, id?: number) {
  console.log("NOTE ID", id, content);

  if (id !== undefined && !isNaN(id)) {
    console.log("Updating note with ID:", id);
    const result = await db.query(
      "UPDATE notes SET content = $1 WHERE id = $2 RETURNING *",
      [content, id]
    );
    console.log("Updated note:", result.rows[0]);
    return result.rows[0];
  } else {
    console.log("Inserting new note");
    const result = await db.query(
      "INSERT INTO notes (content) VALUES ($1) RETURNING *",
      [content]
    );
    console.log("Inserted note:", result.rows[0]);
    return result.rows[0];
  }
}
