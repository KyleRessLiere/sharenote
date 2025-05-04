"use client";

import { useState } from "react";
import Editor from "./Editor";

export default function EditorWrapper() {
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [noteId, setNoteId] = useState("");
  const [message, setMessage] = useState("");

  const handleLoad = async () => {
    try {
      const res = await fetch(`/api/notes/${noteId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      editorInstance?.commands.setContent(data.content);
      setMessage(`Loaded note ${noteId}`);
    } catch {
      setMessage("Failed to load note");
    }
  };

  const handleSave = async () => {
    if (!editorInstance) return;
    const content = editorInstance.getHTML();
    try {
      await fetch("/api/notes/save", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Note saved!");
    } catch {
      setMessage("Failed to save note");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          className="border px-3 py-1 rounded"
          placeholder="Note ID"
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
        />
        <button onClick={handleLoad} className="bg-green-600 px-4 py-1 rounded text-white">
          Load
        </button>
      </div>

      <Editor content="<p></p>" onReady={setEditorInstance} />

      <button onClick={handleSave} className="bg-blue-600 px-4 py-2 rounded text-white">
        Save
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}
