import { Router } from "express";
import { saveNote, getNotes, noteById } from "../controller/notesController";

const router = Router();

router.post("/save", saveNote);
router.get("/:id", noteById);
router.get("/", getNotes);

export default router;
