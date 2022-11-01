import { Router } from "express";
// import { auth } from "../../middleware/auth.js";
import { confirmMail, signUp, refreshMailToken, signIn, refreshSignInToken } from "../auth/controller/auth.controller.js";
import { signInSchema, signUpSchema } from "./auth.validation.js";
import validation from '../../middleware/validation.js'


const authRouter = Router();

authRouter.post("/signup", validation(signUpSchema),signUp);
authRouter.get("/confirmmail/:token", confirmMail)
authRouter.get("/refreshtoken/:refreshToken", refreshMailToken)
authRouter.post("/signin",validation(signInSchema), signIn)
authRouter.post("/signinreftoken",refreshSignInToken);





export default authRouter;