import { Router } from "express";
import { SignIn, SignOut, SignUp } from "../controllers/authController.js";

const authRouter = Router();

//To allow a user to sign In
authRouter.post("/SignIn", SignIn);

//To allow a user to SignUp
authRouter.post("/SignUp", SignUp);

//To allow a user to Log Out
authRouter.post("/SignOut", SignOut);

export default authRouter;
