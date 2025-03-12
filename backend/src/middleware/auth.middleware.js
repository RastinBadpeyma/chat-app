import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const auth = async (req, res, next) =>{
   try {
      
   const token = req.cookies.jwt;

   if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
   }
   
   const decoded = jwt.sign(token,process.env.JWT_SECRET);
   
   if (!decoded || !decoded.userId ) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
   }

   const user = await User.findById(decoded.userId).select('-password');

   if (!user) {
      return res.status(404).json({ message: "User not found" });
   }

   req.user = user;
   next();
   } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
         return res.status(401).json({ message: "Unauthorized - Invalid Token" });
       }
       res.status(500).json({ message: "Internal server error" });   }
}