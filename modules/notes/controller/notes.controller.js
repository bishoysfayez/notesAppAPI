import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// import joi from 'joi'
import notesModel from '../../../DB/models/notes.model.js'
import transporter from '../../../services/mailer.js' // mailer
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {nanoid} from 'nanoid'
import { updateNoteSchema } from '../notes.validation.js';


// 1- add note

export const addNote = async (req,res)=>{
    let {title, content} = req.body;
    let note = await notesModel({
        title,
        content,
        createdBy : req.currentID
    });
    let newNote = await note.save();
    if (newNote){
        res.send({message : "post of note success", newNote})
    }else {
        res.send({message : "note failed"})

    }
}


// 2- update note

export const updateNote = async (req,res)=>{
    let {noteID ,title, content} = req.body;
    // check on user is the creator

    let targetedNote = await notesModel.findOne({_id : noteID});

    if (targetedNote){
        if (JSON.stringify(targetedNote.createdBy) == JSON.stringify(req.currentID)){
            let updatedNote = await notesModel.findOneAndUpdate({_id : noteID}, {title,content}, {new:true})

            res.send({message : "update of note success", updatedNote})

        }else {
            res.send({message: "update failed - you are not the owner/ creator of note"})
        }

    }else {
        res.send({message : "note not found"})

    }
}




// 3- delete note

export const deleteNote = async (req,res)=>{
    let {noteID} = req.body;
    // check on user is the creator

    let targetedNote = await notesModel.findOne({_id : noteID});

    if (targetedNote){
        if (JSON.stringify(targetedNote.createdBy) == JSON.stringify(req.currentID)){
            let deleted = await notesModel.deleteOne({_id : noteID})

            res.send({message : "delete of note success", deleted})

        }else {
            res.send({message: "delete failed - you are not the owner/ creator of note"})
        }

    }else {
        res.send({message : "note not found"})

    }
}

// 4- get all notes
export const getAllNotes = async(req,res)=>{
    let notes = await notesModel.find().populate('createdBy');
    if (notes){
        res.send({message:"success", notes})

    }else {
        res.send({message:"not found"})
    }
}

// 5- get user notes
export const getUserNotes = async(req,res)=>{
    let {userID} = req.body;
    try {
        let notes = await notesModel.find({createdBy: userID}).populate('createdBy');
    
        if (notes){
        res.send({message:"success", notes})

    }else {
        res.send({message:"not found"})
    }
} catch {
    res.send({message:"wrong id "})
}
}



// 5- search notes
export const searchNotes = async(req,res)=>{
    let {keyword} = req.body;
    try {
        let notes = await notesModel.find({ $or: [
            {'title':{$regex : keyword}},
            {'content':{$regex : keyword}}
         ] }).populate('createdBy');
    
        if (notes.length){
        res.send({message:"success", notes})

    }else {
        res.send({message:"not found"})
    }
} catch {
    res.send({message:"not found "})
}
}

// 6- get note by id

export const getNoteByID = async (req,res)=>{
    let {noteID} = req.body;
    // check on user is the creator

    try {
        let targetedNote = await notesModel.findOne({_id : noteID});
        if (targetedNote){
            let note = await notesModel.findOneAndUpdate({_id : noteID}).populate('createdBy')
            if(note){
                res.send({message : "found note successfully", note})

            }else {
                res.send({message : "note not found"})
            }
        }
    } catch {
        res.send({message : "note not found"})

    }
}


