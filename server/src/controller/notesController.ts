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
  if (!isValidNoteId(noteId)) {
    res.status(400).json({
      success: false,
      message: "Invalid ID — must be a positive whole number",
    });
  }

  try {
    const note = await fetchNoteById(noteId);
    const noteOne = note[0];
    console.log("NOTE ID FOUND " + noteId + " " + note[0].content);
    res.json({ success: true, noteOne });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}
