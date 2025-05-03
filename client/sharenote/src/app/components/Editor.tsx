"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
  });

  const [noteIdInput, setNoteIdInput] = useState("");
  const [message, setMessage] = useState("");

  const handleLoadNote = async () => {
    const id = parseInt(noteIdInput);
    if (isNaN(id)) {
      setMessage("❌ Invalid note ID");
      return;
    }

    try {
      const res = await fetch(`/api/notes/${id}`);
      const data = await res.json();
      editor?.commands.setContent(data.noteOne.content);
      setMessage(`✅ Loaded note ID ${id}`);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to load note");
    }
  };

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex gap-2 items-center border rounded p-4 bg-gray-50 shadow">
        <input
          type="number"
          value={noteIdInput}
          onChange={(e) => setNoteIdInput(e.target.value)}
          placeholder="Enter Note ID..."
          className="border px-3 py-2 rounded w-full text-black"
        />
        <button
          onClick={handleLoadNote}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Load Note
        </button>
      </div>

      <div className="border rounded p-6 min-h-[400px] bg-white shadow text-black">
        <EditorContent editor={editor} />
      </div>

      <button
        className="bg-blue-500 text-black px-6 py-2 rounded"
        onClick={() => setMessage(" Note saved")}
      >
        Save Note
      </button>

      {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
    </div>
  );
}
