import { getNotesByAccount } from "@/services/noteServices";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { accountId: string } }
) {
  const accountId = parseInt(params.accountId);

  if (isNaN(accountId) || accountId <= 0) {
    return new Response("Invalid ID", { status: 400 });
  }

  try {
    const notes = await getNotesByAccount(accountId);
    if (!notes || notes.length === 0) {
      return new Response("No notes found", { status: 404 });
    }

    return Response.json({ notes });
  } catch (error) {
    console.error("DB error:", error);
    return new Response("Server error", { status: 500 });
  }
}
