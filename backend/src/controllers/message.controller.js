import User from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';
import Message from "../models/message.model.js";


export const SidebarUsers = async (req , res) => {
  try {
   const loggedInUser = req.user._id;
   const filteringUser =  await User.find({_id: {$ne: loggedInUser}}).select("-password");

   res.status(200).json(filteringUser);
  } catch (error) {
   console.error("Error in getUsersForSidebar: ", error.message);
   res.status(500).json({ error: "Internal server error" });
  }
};


export const getMessage = async (req , res) => {
   try {
      const myID = req.user._id;
      const{ id: userToChatID }  =req.params;
    
       const message = await Message.find({
          $or : [
             {senderID: myID, receiverID: userToChatID},
             {senderID: userToChatID, receiverID: myID},
          ],
       });
       res.status(200).json(message);
   } catch (error) {
      console.log("Error in getMessage controller" , error.message);
      res.status(500).json({ error: "Internal server error" });
   }
}


   export const sendMessage = async (req, res) => {
      try {
         const {text , image} = req.body;
         const {id : receiverID} = req.params;
         const senderID = req.user._id;

         let imageUrl;
         if (image) {
            const uploadImage  = await cloudinary.uploader.upload(image);
            imageUrl = uploadImage.secure_url;
         }

         const newMessage = new Message({
            senderID,
            receiverID,
            text,
            image: imageUrl,
         });

         await Message.save();

         res.status(200).json(newMessage);
      } catch (error) {
         console.log(errror.message);
         res.status(500).json({ error: "Internal server error" });      }

   }


