import mongoose from 'mongoose'
const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    name:String,
    tags:[String],
    selectedFile:String,
    likes :{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
const Post=mongoose.model('posts',postSchema); 
//reference= (collection name , collection schema)
//later on we can run crud commands on this model.
export default Post;                        
