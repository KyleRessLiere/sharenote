import EditorWrapper from "./components/EditorWrapper"
import NotesTable from "./components/NotesTable"

export default function Home() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 My Notion Clone</h1>
      <EditorWrapper />
      <NotesTable />
    </main>
  )
}
