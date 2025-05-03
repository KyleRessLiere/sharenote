"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState } from "react"

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello from Tiptap 👋</p>",
  })

  const [message, setMessage] = useState("")

  const handleSave = async () => {
    if (!editor) return

    const content = editor.getHTML()

    try {
      const res = await fetch("http://localhost:3001/api/notes/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (res.ok) {
        setMessage(" Note saved!")
      } else {
        setMessage("Failed to save")
      }
    } catch (error) {
      console.error("Save error:", error)
      setMessage("❌ Error saving note")
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded p-4 space-y-4">
      <EditorContent editor={editor} />

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save Note
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  )
}
