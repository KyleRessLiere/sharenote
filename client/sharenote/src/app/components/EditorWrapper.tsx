"use client";

import { useEffect, useState } from "react";
import Editor from "./Editor";
import { useSearchParams } from "next/navigation";

export default function EditorWrapper() {
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [initialContent, setInitialContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) {
        console.warn("No note ID provided in search params.");
        return;
      }

      try {
        const res = await fetch(`/api/notes/${noteId}`);
        if (!res.ok) throw new Error("Failed to fetch note");
        const data = await res.json();

        const content = data?.content || "<p></p>";
        setInitialContent(content);
        setMessage(`Loaded note ${noteId}`);
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage("Failed to load note");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  useEffect(() => {
    if (editorInstance && initialContent !== null) {
      editorInstance.commands.setContent(initialContent);
    }
  }, [editorInstance, initialContent]);

  const handleSave = async () => {
    if (!editorInstance) return;
    const content = editorInstance.getHTML();

    try {
      await fetch("/api/notes/save", {
        method: "POST",
        body: JSON.stringify({ content, id: noteId }),
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Note saved!");
    } catch {
      setMessage("Failed to save note");
    }
  };

  // Don't render anything until loading finishes
  if (isLoading) return null;

  return (
    <div className="p-6 space-y-4 h-[80vh]">
      <div className="border rounded h-full">
        <Editor content="<p></p>" onReady={setEditorInstance} />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Save
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}
