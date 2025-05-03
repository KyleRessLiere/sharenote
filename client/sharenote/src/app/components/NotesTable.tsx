"use client";

import { useEffect, useState } from "react";

type Note = {
  id: number;
  content: string;
  created_at: string;
};

export default function NotesTable() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`/api/notes/1`);

        const data = await res.json();

        if (res.ok && data.success) {
          setNotes(data.notes);
        }
      } catch (error) {
        console.error(" Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4"> Saved Notes</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Content</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td className="border p-2 text-center">{note.id}</td>
              <td
                className="border p-2"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
              <td className="border p-2 text-center">
                {new Date(note.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
