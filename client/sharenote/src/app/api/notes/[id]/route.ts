import { NextRequest } from "next/server";
import db from "@/lib/db"; // Your PostgreSQL Pool instance
import { noteById } from "@/services/noteServices";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const noteId = parseInt(params.id);

  if (isNaN(noteId)) {
    return new Response("Invalid note ID", { status: 400 });
  }

  try {
    const note = await noteById(noteId);

    if (!note) {
      return new Response("Note not found", { status: 404 });
    }

    return Response.json({ noteOne: note });
  } catch (error) {
    console.error("DB error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
