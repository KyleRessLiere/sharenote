import { getNoteById } from "@/services/noteServices";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = await  parseInt(params.id);
  if (isNaN(id) || id <= 0) {
    return new Response("Invalid ID", { status: 400 });
  }

  try {
    const note = await getNoteById(id);
    if (!note) {
      return new Response("Note not found", { status: 404 });
    }

    return Response.json(note);
  } catch (error) {
    console.error("DB error:", error);
    return new Response("Server error", { status: 500 });
  }
}
