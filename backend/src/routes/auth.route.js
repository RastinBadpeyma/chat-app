import express from "express";
import {
   register,
   login,
   logout,
   UpdateProfile,
   CheckAuth,
} from  "../controllers/auth.controller.js"
import { auth } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

// authRouter.get('/cookie' , function (req,res) {
//    console.log('Cookies:' , req.cookies);
// })
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post('/logout' , logout)

authRouter.put('/update-profile' , auth ,UpdateProfile);

authRouter.get('/check' , auth , CheckAuth);

export default authRouter;