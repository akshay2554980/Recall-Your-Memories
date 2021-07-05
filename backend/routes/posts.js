//remember to give js extension to imports
import express from "express"; 
import auth from '../middleware/auth.js'                
import { getPosts ,createPost,updatePost,deletePost,likePost} from  "../controllers/posts.js"   
const router = express.Router();
// here i am going to handle all the routes related to post from app

//this is handling the route 
// localhost:3001/posts    not  localhost:3001/  => check the server.js
router.get('/',getPosts);       //calling controller getposts
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likepost',auth,likePost)
export default router;

//here i added the auth middleware to check that the user is 
// having a valid token or not and to do the specific action the user 
// need to first verify the token in the middleware.

// as we can like only one time/post 
//so its functionality is in backend and the update and delete post button
// is edited on front end.
