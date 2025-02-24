
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../model/user.js";
import dotenv from 'dotenv';
import token from '../model/token.js';
dotenv.config();
export const signupuser=async (request,response)=>{
    try{
        // const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(request.body.password,10);
        const user={
            username:request.body.username,
            name:request.body.name,
            password:hashpassword
        }
        const newUser=new User(user);
        await newUser.save();
        return response.status(200).json({msg:'Signup successfull'});
    }catch(error){
        return response.status(500).json({msg:'Error while singup'});
    }
}
export const loginuser=async(request,response)=>{
    let user=await User.findOne({username:request.body.username});
    if(!user){
        return response.status(400).json({msg:'Username not found'});
    }
    
    try {
        let match=await bcrypt.compare(request.body.password,user.password);
        if(match){
             const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'2m'});
             const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
             const newtoken=new token({token:refreshToken});
            await newtoken.save();
            return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username})
        }else{
            return response.status(400).json({msg:'Password does not match'});
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login'});
    }
}