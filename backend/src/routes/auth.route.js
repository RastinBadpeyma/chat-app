import express from "express";
import {
   register,
   login,
   logout,
   UpdateProfile,
} from  "../controllers/auth.controller.js"
import { auth } from "../middleware/auth.middleware.js";

const authRouter = express.Router();


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post('/logout' , logout)

authRouter.put('/update-profile' , auth ,UpdateProfile);


export default authRouter;