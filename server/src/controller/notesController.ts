import { Request, Response } from "express"
import { saveNoteToDB, getAllNotesFromDB } from "../model/noteModel"

export async function saveNote(req: Request, res: Response) {
  try {
    const { content } = req.body
    const newNote = await saveNoteToDB(content)
    res.json({ success: true, note: newNote })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
}

export async function getNotes(req: Request, res: Response) {
  try {
    const notes = await getAllNotesFromDB()
    res.json({ success: true, notes })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
}
