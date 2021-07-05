import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
const app = express();
import postsroute from './routes/posts.js'               //remember to give js extension to imports in node no need to do it in reactjs
import userRoutes from './routes/user.js'


app.use(bodyParser.json({limit:"30mb",extended:"true"}))        //as we are gettting images here so limit is imp
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true"}))  //so that we can properly send our request
app.use(cors());
app.use('/posts',postsroute);                                   // now handle the request inside posts.js -> routes handling
app.use('/user',userRoutes);
//put this after cors.

//i use cloud version of mongodb -> mongodb atlas here
//lets make connection of our backend to the db.
const CONNECTION_URL = "mongodb+srv://akshay:Cluster0@cluster0.mgikw.mongodb.net/memories?retryWrites=true&w=majority" 
const PORT =   process.env.PORT || 3001 
//for the deployment of application
//let make the connection to mongoose
mongoose.connect(CONNECTION_URL,{useNewUrlParser:"true",useUnifiedTopology:"true"})
.then(()=>{                     //now if connection to the db is successfull then listen to port 
     app.listen(PORT,()=>{
        console.log("node server has started on 3001");
    })
})
.catch((err)=>{                         // now if connection to the db is not successful then print this
    console.log(err.message);
})

mongoose.set('useFindAndModify',false);  //using findandmodify gives warning so to remove that warning we use this.

