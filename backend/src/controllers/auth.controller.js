import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';

import bcrypt from 'bcryptjs';


export const register = async (req , res) =>{
     const {fullName , email , password} = req.body;
     try{
     if (!fullName || !email || !password) {
      return res.status(400).json({message: "fullName and email,password are required"});
     }
     if (password.length < 8) {
      return res.status(400).json({message: "Password must be at least 6 characters"});
     }

     const user = await User.findOne({email});
     if (user) {
       return res.status(400).json({message: "Email already exists"});
     }

     const salt = await  bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);

     const newUser = new User({
      fullName,
      email,
      password:hashedPassword
     });


     if (newUser) {
        generateToken(newUser._id,res);
        await newUser.save();
        res.status(201).json({
         _id: newUser._id,
         fullName: newUser.fullName,
         email: newUser.email,
         profilePic: newUser.profilePic,
       });
     } else {
       res.status(400).json({ message: "Invalid user data" });
     }
   } catch (error) {
     res.status(500).json({ message: "Internal Server Error" });
   }
}

export const login = async (req , res) =>{
  const {email , password} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: "Invalid credentials"});
    }

    const checkingPass = await bcrypt.compare(password , user.password);
    if (!checkingPass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    

    generateToken(user._id , res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({message: "Error in login controller"});
  }
}

export const logout = (req , res) =>{
  try {
    res.cookie("jwt" ,"", {maxAge:0 });
    res.status(200).json({message: "logged out successfully"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const UpdateProfile = async (req,res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({message:"Profile pic is required"});
    }

    const upload = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate({
       userId: req.user._id,
       profilePic: upload.secure_url ,
       new : true 
  });

  res.status(200).json(updateUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const CheckAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

