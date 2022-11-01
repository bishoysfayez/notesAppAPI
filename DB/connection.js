import mongoose from "mongoose";
const connection = async()=>{
    return await mongoose.connect('mongodb://localhost:27017/notes')
    .then (()=>{
        console.log('db connected');
    })
    .catch (()=>{
        console.log('DB error')
    })
}

export default connection