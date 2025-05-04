import { saveNote } from "@/services/noteServices";

export async function POST(req: Request) {
  const { content } = await req.json();

  if (typeof content !== "string" || content.trim() === "") {
    return new Response("Invalid content", { status: 400 });
  }

  try {
    const note = await saveNote(content);
    return Response.json(note);
  } catch (error) {
    console.error("DB error:", error);
    return new Response("Server error", { status: 500 });
  }
}
