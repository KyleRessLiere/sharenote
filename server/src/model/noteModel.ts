import { pool } from "../db";

export async function saveNoteToDB(content: string) {
  console.log("SAVE NOTE");
  try {
    const result = await pool.query(
      "INSERT INTO notes (content) VALUES ($1) RETURNING *",
      [content]
    );
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (e) {
    console.error(" Failed to save note:", e);
    throw e;
  }
}

export async function getAllNotesFromDB() {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY created_at DESC"
    );
    return result.rows;
  } catch (e) {
    console.error(" Failed to fetch notes:", e);
    throw e;
  }
}
export async function fetchNoteById(noteId: number) {
  console.log("fetching not by id");
  try {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [
      noteId,
    ]);
    return result.rows;
  } catch (e) {
    console.error(" Failed to fetch notes:", e);
    throw e;
  }
}
