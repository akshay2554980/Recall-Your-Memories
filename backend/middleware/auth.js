//the user get the token when he signs up or sign in
// so now when he wants to do something he will send the req along with  
// the token and then we will check that the user is valid to do that or not

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//dotenv.config();
const secret = "test";

//eg. i want to like a post.
//click the like button => auth middleware(next) => like controller.
// auth middleware
//to check that the user who logged in is still the same user or not .
// to check we have the token having user info and sign which is coded by us.
// now if all thing is correct then we send to next in middleware.
const auth = async(req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        //now token can be from the google auth or a custom auth
        const isCustomAuth = token.length<500;
        // as we know the token itself has the data of user so we decode it.
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,secret) 
            req.userId = decodedData?.id;
        } 
        else{
            decodedData = jwt.decode(token);
            req.userId  =  decodedData?.sub;  //id name for google id
        }
        next();
    } catch (error) {
        console.log(error)
    }
}
export default auth;

// now in controllers(next) we have access to userId.
