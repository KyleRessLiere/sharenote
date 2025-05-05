"use client";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function AddNoteCard() {
  const router = useRouter();

  const handleCreateNote = async () => {
    try {
      const res = await fetch("/api/notes/save", {
        method: "POST",
        body: JSON.stringify({ content: "<p></p>" }),
        headers: { "Content-Type": "application/json" },
      });
      const newNote = await res.json();
      router.push(`/editor?id=${newNote.id}`);
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  return (
    <div
      onClick={handleCreateNote}
      className="bg-white rounded-md shadow-sm border w-full aspect-[4/3] hover:shadow-md transition flex flex-col justify-between cursor-pointer"
    >
      <div className="p-4 space-y-2 flex flex-col items-center justify-center flex-grow text-gray-500">
        <FaPlus size={28} />
        <p className="text-lg font-semibold mt-2">New Note</p>
      </div>
      <div className="bg-gray-900 text-white px-4 py-2 text-right text-sm rounded-b-md mt-auto">
        <span className="bg-gray-900 px-3 py-1 rounded-full font-semibold">&nbsp;</span>
      </div>
    </div>
  );
}
