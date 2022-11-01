import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// import joi from 'joi'
import usersModel from '../../../DB/models/users.model.js'
import transporter from '../../../services/mailer.js' // mailer
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

//1-signup


export const signUp = async (req, res) => {
    let { userName, email, password, cpassword, age, phone, profilePic } = req.body;

    // validation by joi
    let hashed= bcryptjs.hashSync(password, parseInt(process.env.saltRaound));

    // check if user exists
    let user = await usersModel.findOne({ email });
    if (user) {
        // USER EXISTs
        res.send({ message: " user exist already - try to login instead" })
    } else {
        // user not exist - validated password by joi in middleware
        // hash password
        // insert to DB
        const newUser = await usersModel({
            userName,
            email,
            password: hashed,
            isConfirmed: false,
            age,
            phone,
            profilePic
        })
        const savedUser = await newUser.save();
        // get token to confirm password
        const token = jwt.sign({ id: savedUser._id }, process.env.jwtToken, {expiresIn: 60});
        const refreshToken = jwt.sign({ id: savedUser._id }, process.env.refreshjwt, {expiresIn : 3600});
        
        // mailer setup
        let mailOptions = {
            from: 'bisho@gmail.com',
            to: `${email}`,
            subject: 'please confirm your account',
            html: `<a href= "http://localhost:3000/api/v1/auth/confirmmail/${token}"> please click here to confirm your mail</a>
            <br>link will expire after one minute
            <br> <br>
            <a href= "http://localhost:3000/api/v1/auth/refreshtoken/${refreshToken}"> please click here to refresh token</a>
            
            `
          
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
          console.log(process.env.jwtToken)
        res.json({ message: "done plz confirm mail", savedUser });
    }

}


// 1 part 2 -- confirm mail
export const confirmMail = async(req,res)=>{
  let {token} = req.params;
  try {
    const decoded = jwt.verify(token, process.env.jwtToken);
  } catch {
    res.send({message: "token is wrong or expired"})

  }
  const decoded = jwt.verify(token, process.env.jwtToken);

  // check if the token sent by mail is valid
  if(decoded){
    const user = await usersModel.findOne({_id: decoded.id, isConfirmed :false});
    if (user){
      // update user as his mail is now confirmed
      const updateUser = await usersModel.findOneAndUpdate({_id:decoded.id}, {isConfirmed : true}, {new:true})
      // success message
      res.send({message: "mail confirmed successfully"})

    
    } else{
      res.send({message: "you are already confirmed mail or your token is invalid"})

    }
  }else {
    res.send({message : "invalid token"})
  }

}



// 1 part 3 -- refresh token from mail
export const refreshMailToken = async(req,res) =>{
  let {refreshToken} = req.params;
  const decoded = jwt.verify(refreshToken, process.env.refreshjwt);
  const user = await usersModel.findOne({_id: decoded.id, isConfirmed :false});
console.log (user)
  if (user){
    // send user new mail 
    // generate new toekn 
    const newToken = jwt.sign({ id: user._id }, process.env.jwtToken, {expiresIn: 60});
    const newRefreshToken = jwt.sign({ id: user._id }, process.env.refreshjwt, {expiresIn : 3600});
        
        // mailer setup
        let mailOptions = {
            from: 'bisho@gmail.com',
            to: `${user.email}`,
            subject: 'resent - please confirm your account',
            html: `<a href= "http://localhost:3000/api/v1/auth/confirmmail/${newToken}"> please click here to confirm your mail</a>
            <br>link will expire after one minute
            <br> <br>
            <a href= "http://localhost:3000/api/v1/auth/refreshtoken/${newRefreshToken}"> please click here to refresh token</a>
            
            `
          
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
          console.log(process.env.jwtToken)
    // mailer setup for new token


    // success message
    res.send({message: "refresh mail sent successfully"})

  
  } else{
    res.send({message: "you are already confirmed mail or your token is invalid"})

  }

}

// 2- sign in

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  let user = await usersModel.findOne({ email });
  if (user) {
      // check password
      let matchPassword = bcryptjs.compareSync(password, user.password);
      if (matchPassword) {
          const token = jwt.sign({ id: user._id }, 'bs');
          if (user.isConfirmed){
            console.log(user.isConfirmed);
          res.json({ message: "welcome you are now signed in", token });

          }else {
            res.json({message : " you didn't confirm your mail"})
          }
      } else {
          res.json({ message: "password not right or you didn't confirm email" });
      }
  } else {
      res.json({ message: "user not registered" });
  }
};

// 3- refresh sign in token

export const refreshSignInToken = async (req, res) =>{

const { email, password } = req.body;
  let user = await usersModel.findOne({ email });
  if (user) {
      // check password
      let matchPassword = bcryptjs.compareSync(password, user.password);
      if (matchPassword) {
          const token = jwt.sign({ id: user._id }, 'bs');
          if (user.isConfirmed){
            console.log(user.isConfirmed);
          res.json({ message: "welcome you are now signed in", token });

          }else {
            res.json({message : " you didn't confirm your mail"})
          }
      } else {
          res.json({ message: "password not right or you didn't confirm email" });
      }
  } else {
      res.json({ message: "user not registered" });
  }
}





