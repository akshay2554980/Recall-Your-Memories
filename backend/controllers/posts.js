//if we write all the logics of the route in the routes folder then it 
// get very mixed up and hard to find our route response so i 
// created this folder to solve it up.
import mongoose from 'mongoose';
import Post from '../models/postModel.js'

export const getPosts = async (req, res) => {
    try {
        const allPosts = await Post.find();      //this finding takes time so make it await and function async
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {     //as its a post request of i have access to the body of the req
    const post = req.body;
    const newPost = new Post({...post,creator:req.userId,createdAt:new Date().toISOString()});
    try {
        await newPost.save();   //this operation also  take time so await.
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}
//for this the reqest is made to 
// /posts/123    here 123 is id . and we need id to upadate.
export const updatePost =async(req,res)=>{
    const _id =req.params.id; //to get from the url
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("no element with the given id")
           const response = await Post.findByIdAndUpdate(_id,post,{new:true});  //new = true to get the updated object  ]
           res.json(response);
   
}
export const deletePost = async(req,res)=>{
    const _id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("no element with the given id")
    await Post.findByIdAndRemove(_id);   
    console.log("deleted hurry.");
    res.json({message:"deleted successfully"});
}

export const likePost = async(req,res)=>{
    const _id =req.params.id; //to get from the url

    // user not logged in 
    if(!req.userId) return res.json({message:"user unauthenticated"})
    //we have access to req.userId from middleware.
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send("no element with the given id")
    const post = await Post.findById(_id);
    const index = post.likes.findIndex((id)=>id===req.userId) 
    //checking that i had already liked the post or not
    if(index===-1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id)=>id!==String(req.userId))
    }
    // now sending the updated post to frontend
    const updatedPost = await Post.findByIdAndUpdate(_id,post,{new:true})     
    res.json(updatedPost);
}  




