import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'
import dotenv from "dotenv";
// dotenv.config();
const secret = "test";

export const signIn = async(req,res)=>{
     const {email,password} = req.body;
     try {
          const existingUser =await User.findOne({email}); // I get the user object
          if(!existingUser){return res.status(404).json({message:"user doesn't exist"})}
            const isPasswordCorrect = await bcrypt.compare(password,existingUser.password); 
            if(!isPasswordCorrect)
            {
                return res.status(400).json({message:"Invalid Credentials"})
            }  
            //upto here we checked the typed password with db and if all thing upto now
            // is correct then we will create a jwt token and send to front end.
            // using jwt 
            const token = jwt.sign({email:existingUser.email,id:existingUser._id},secret,{expiresIn:"1h"})
            //now sending back the signed token to user
            res.status(200).json({result:existingUser,token})            
     } catch (error) {
         res.status(500).json({message:"something went wrong"})
     }
}

export const signUp = async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName}  = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            //return null;
            return res.status(400).json({message:"user already exists"})
        }
        if(password!==confirmPassword){
            //return null;
            return res.status(400).json({message:"confirm password don't match password"})
        } 
        //hashing the password
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({email:email,password:hashedPassword,name:`${firstName} ${lastName}`})
        
        const token = jwt.sign({email:result.email,id:result._id},secret,{expiresIn:"1h"})
        //now sending back the signed token to user
        res.status(200).json({result,token})            


    } catch (error) {
        console.log(error)
        //res.status(500).json({message:"something went wrong"})       
    }


}