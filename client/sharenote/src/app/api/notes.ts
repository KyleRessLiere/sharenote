// src/app/api/notes.ts
const BASE_URL = "http://localhost:3001/api/notes";

export async function saveNote(content: string) {
  const res = await fetch(`${BASE_URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("Failed to save note");
  }

  return res.json();
}

export async function getAllNotes() {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
}

export async function getNoteById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch note");
  }

  return res.json();
}
