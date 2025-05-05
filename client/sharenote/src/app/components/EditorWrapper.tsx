"use client";

import { useEffect, useState } from "react";
import Editor from "./Editor";
import { useSearchParams } from "next/navigation";

export default function EditorWrapper() {
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [initialContent, setInitialContent] = useState("<p></p>");
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) {
        console.warn("No note ID provided in search params.");
        return;
      }

      try {
        console.log("Fetching note for ID:", noteId);
        const res = await fetch(`/api/notes/${noteId}`);
        if (!res.ok) throw new Error("Failed to fetch note");
        const data = await res.json();

        console.log("Fetched note data:", data);

        const content = data?.content;
        if (!content) {
          console.warn("No content ");
        }

        setInitialContent(content || "<p></p>");
        setMessage(`Loaded note ${noteId}`);
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage("Failed to load note");
      }
    };

    fetchNote();
  }, [noteId]);

  useEffect(() => {
    if (editorInstance && initialContent) {
      console.log("Setting editor content:", initialContent);
      editorInstance.commands.setContent(initialContent);
    }
  }, [editorInstance, initialContent]);

  const handleSave = async () => {
    if (!editorInstance) return;
    const content = editorInstance.getHTML();
    console.log("Saving content:", content);
    try {
      await fetch(`/api/notes/save/${noteId}`, {
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
