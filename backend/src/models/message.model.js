import {mongoose} from "mongoose";
import User from "./user.model";

const messageSchema = new mongoose.Schema({
   senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
   },

   receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
   },

   text: {
      type: String
   },

   image: {
      type: String,
   },
},
{timestamps: true}
);

const Message = mongoose.model(Message , messageSchema);

export default Message;