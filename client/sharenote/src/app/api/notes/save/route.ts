import { saveNote } from "@/services/noteServices";

export async function POST(req: Request) {
  const { content, id } = await req.json();
console.log("Received content:", content);
  if (typeof content !== "string" || content.trim() === "") {
    return new Response("Invalid content", { status: 400 });
  }

  try {
    const note = await saveNote(content, id);
    return Response.json(note);
  } catch (error) {
    console.error("DB error:", error);
    return new Response("Server error", { status: 500 });
  }
}
