//nextpublic requre to use env props
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const NOTES_ENDPOINT = `${BASE_URL}notes`;

export async function saveNote(id: number, content: string) {
  const res = await fetch(`${NOTES_ENDPOINT}/save`, {
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
  const res = await fetch(`${NOTES_ENDPOINT}`);
  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
}

export async function getNoteById(id: number) {
  const res = await fetch(`${NOTES_ENDPOINT}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch note");
  }

  return res.json();
}
