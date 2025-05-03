import { Request, Response } from "express";
import {
  saveNoteToDB,
  getAllNotesFromDB,
  fetchNoteById,
} from "../model/noteModel";
import { isValidNoteId } from "../validator/inputValidator";

export async function saveNote(req: Request, res: Response) {
  try {
    const { content } = req.body;
    const newNote = await saveNoteToDB(content);
    res.json({ success: true, note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

export async function getNotes(req: Request, res: Response) {
  try {
    const notes = await getAllNotesFromDB();
    res.json({ success: true, notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}
export async function noteById(req: Request, res: Response) {
  const noteId = Number(req.params.id);
  console.log("Gettting %d", noteById);
  if (!isValidNoteId(noteId)) {
    res.status(400).json({
      success: false,
      message: "Invalid ID — must be a positive whole number",
    });
  }

  try {
    const note = await fetchNoteById(noteId);
    res.json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}
