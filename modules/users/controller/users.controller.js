import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// import joi from 'joi'
import usersModel from '../../../DB/models/users.model.js'
import transporter from '../../../services/mailer.js' // mailer
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {nanoid} from 'nanoid'


// 4- update password
export const updatePassword = async (req,res)=>{
// password matched from joi
// auth middleware success with user token
let { oldPassword, newPassword, newcPassword} = req.body;
let hashedNewPassword = bcryptjs.hashSync(newPassword, parseInt(process.env.saltRaound));

// check on old password
let user = await usersModel.findOne({_id : req.currentID});
// match old password with DB password 
let matchPassword = bcryptjs.compareSync(oldPassword, user.password);
console.log(matchPassword);
console.log(user);

if (matchPassword){
    // update password
    const updatedUser = await usersModel.findOneAndUpdate({_id : req.currentID},{password : hashedNewPassword}, {new :true})
    res.send({message : " updated password successfully", updatedUser})

    }else {
        res.send({message : "old password is wrong"})
    }

// try{
//     res.send({message : " updated password successfully"}, updatedUser)
// } catch{
//     res.send({message :" error"})
// }

}

export const sendOTPForgetPassword = async(req,res)=>{
    let {email} = req.body;
    let user = await usersModel.findOne({email});
    console.log(user)
    if (user){
        // genereate otp
        let OTP = nanoid();
        let OTPToDB = await usersModel.findOneAndUpdate({email}, {OTP}, {new : true})
        console.log(OTPToDB)
        // mailer setup
        let mailOptions = {
            from: 'bisho@gmail.com',
            to: `${user.email}`,
            subject: 'reset password',
            html: `<p> your OTP is  ${OTP}</p>`
          
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
    // mailer setup for new token


    // success message
    res.send({message: "password reset mail sent successfully"})

  
  } else{
    res.send({message: "mail not sent plz check again"})

  }

}
// 4- reset password from OTP
export const resetPasswordFromOTP = async(req,res)=> {
  let {email, OTP, newPassword, newcPassword} =req.body;
  // find user in DB
  if (!OTP){
    res.send ({message : "you didn't request OTP - Null"})
  } else {
    let user = await usersModel.findOne({email, OTP});
    // check if user exist 
    if (user){
      // reset password
      let hashed =  bcryptjs.hashSync(newPassword, parseInt(process.env.saltRaound));
      let updatedUser = await usersModel.findOneAndUpdate({email:email}, {password : hashed}, {new: true})
      res.send({message : 'updated password successfully', updatedUser})
    } else {
    res.send({message : "email or OTP is wrong"})
  }
  
  }
}


// 5- delete user

export const deleteUser = async(req,res)=> {
  // let {} =req.body;
  // find user in DB

  let user = await usersModel.findOne({_id : req.currentID});
    // check if user exist 
    if (user){
      // reset password 
      let deleteUser = await usersModel.deleteOne({_id: req.currentID})
      res.send({message : "deleted user successfully ", deleteUser});

    } else {
    res.send({message : "you can' t delete user"})
  }
  
  }

  // 6- get all users 
  export const getAllUsers = async(req,res)=>{
    
    try {
      let allUsers = await usersModel.find();
    if (allUsers.length){
      res.send({message: "found all users",allUsers})
    } else {
      res.send({message :"error no users exist"})
    }
  }
    catch {
      res.send({message :"error wrong id"})

    }
    }
    

  // 7- get user by id 
  export const getUserById = async(req,res)=>{

    let {id} = req.body;
    console.log(id)
    let user = await usersModel.find({_id:id});
    console.log(user)
    if (user.length){
      res.send({message: "found user",user})
    } else {
      res.send({message :"error no users exist"})
    }


  }