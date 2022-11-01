import mongoose from 'mongoose'


const notesSchema = new mongoose.Schema({
    title:{type: String},
    content:{type:String},
    createdBy:{type : mongoose.Schema.Types.ObjectId, ref: 'users'}
});


const notesModel = new mongoose.model('notes',notesSchema)


export default notesModel;