import mongoose from 'mongoose';


const usersSchema = new mongoose.Schema({
    userName : {type: String},
    email : {type : String},
    password:{type : String},
    isConfirmed:{
        type : Boolean,
        default : false
    },
    age: {type: Number},
    phone : {type : String},
    profilePic : {type: String}, // link to profile pic to be uploaded to 
    OTP : {type : String, default: null}
});

const usersModel = new mongoose.model('users', usersSchema);

export default usersModel;