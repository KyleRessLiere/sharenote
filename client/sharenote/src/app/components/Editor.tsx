"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface Props {
  content: string;
  onReady: (editor: any) => void;
}

export default function Editor({ content, onReady }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
  });

  useEffect(() => {
    if (editor) {
      onReady(editor);
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <EditorContent
      editor={editor}
      className="h-full w-full p-4 border rounded overflow-auto editor-container"
    />
  );
}
