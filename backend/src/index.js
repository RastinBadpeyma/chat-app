import express from "express";
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from 'cookie-parser';
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app,server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// Increase payload limits to allow base64 image uploads from the client
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}))


app.use('/api/auth' , authRoutes);
app.use('/api/messages' , messageRoutes);



server.listen(PORT , ()=> {
   console.log(`server is running on PORT:${PORT}`);
   connectDB();
})