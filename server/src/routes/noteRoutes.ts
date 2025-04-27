import { Router } from "express"
import { saveNote, getNotes } from "../controller/notesController"

const router = Router()

router.post("/save", saveNote)
router.get("/", getNotes)

export default router
