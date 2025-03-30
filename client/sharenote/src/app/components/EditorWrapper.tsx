"use client"

import dynamic from "next/dynamic"

// Dynamically import the Editor with SSR disabled
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false })

export default function EditorWrapper() {
  return <Editor />
}
