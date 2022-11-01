import {Router} from 'express'
import validation from '../../middleware/validation.js'
import auth from '../../middleware/auth.js'
import {addNote, deleteNote, updateNote, getAllNotes, getUserNotes, searchNotes, getNoteByID} from './controller/notes.controller.js'
import {addNoteSchema, updateNoteSchema, deleteNoteSchema, getUserNotesSchema, searchNotesSchema, getNoteByIDSchema} from './notes.validation.js'


const notesRouter = Router();

notesRouter.post("/addnote", validation(addNoteSchema),auth(),addNote)
notesRouter.post("/updatenote", validation(updateNoteSchema),auth(),updateNote)
notesRouter.post("/deletenote", validation(deleteNoteSchema),auth(),deleteNote)
notesRouter.get("/getallnotes", auth(),getAllNotes)
notesRouter.post("/getusernotes", validation(getUserNotesSchema),auth(),getUserNotes)
notesRouter.post("/searchnotes", validation(searchNotesSchema),auth(),searchNotes)
notesRouter.post("/getnotebyid", validation(getNoteByIDSchema),auth(),getNoteByID)





export default notesRouter;