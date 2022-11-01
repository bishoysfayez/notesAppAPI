import {Router} from 'express'
import {updatePassword, sendOTPForgetPassword, resetPasswordFromOTP,getUserById, deleteUser, getAllUsers }  from './controller/users.controller.js'
import { resetPasswordFromOTPSchema, updatePasswordSchema, getUserByIdSchema } from './users.validation.js';
import validation from '../../middleware/validation.js'
import auth from '../../middleware/auth.js'




const usersRouter = Router();

// authRouter.get("/forgetpassword",forgetPassword)
usersRouter.post("/updatepassword",validation(updatePasswordSchema), auth(),updatePassword)
usersRouter.post("/resetpasswordrequest",sendOTPForgetPassword)
usersRouter.post("/resetpassword",validation(resetPasswordFromOTPSchema),resetPasswordFromOTP)
usersRouter.post("/deleteuser", auth(), deleteUser);
usersRouter.get("/getallusers",auth(), getAllUsers)
usersRouter.post("/getuserbyid",auth(),validation(getUserByIdSchema), getUserById)






export default usersRouter