import joi from "joi"


export const addNoteSchema = {
    body: joi.object().keys({
        title: joi.string().required(),
        content: joi.string().required()

    })
}

export const updateNoteSchema = {
    body: joi.object().keys({
        noteID: joi.string().required(),
        title: joi.string().required(),
        content: joi.string().required()

    })
}

export const deleteNoteSchema = {
    body: joi.object().keys({
        noteID: joi.string().required()
        })
}

export const getUserNotesSchema = {
    body: joi.object().keys({
        userID: joi.string().required()
        })
}

export const searchNotesSchema = {
    body: joi.object().keys({
        keyword: joi.string().required()
        })
}


export const getNoteByIDSchema = {
    body: joi.object().keys({
        noteID: joi.string().required()
        })
}


