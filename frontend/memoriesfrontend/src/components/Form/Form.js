import React, { useState,useEffect } from 'react'
import {TextField,Button,Typography,Paper} from '@material-ui/core'
import makeStyles from './styles'
import FileBase from 'react-file-base64'
import {useDispatch} from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import {useSelector} from 'react-redux'
function Form({currentId,setcurrentId}) {
  const classes = makeStyles();
  //creating a state for the posts in the ui 
  const [postData, setpostData] = useState({
   title:'',message:'',tags:'',selectedFile:''
})
const dispatch=useDispatch();
//use seletor to access the store.
const post = useSelector((state)=>currentId?state.postreducer.find((p)=>p._id===currentId):null);    //getting access to the whole state and returning the posts only from store
//if currentid is present means i am updating the post and i need to place the previous data in the form otherwise null
// to repopulate the form by clicking on the 3 dots.
const handleSubmit=(e)=>{
      e.preventDefault();
      if(currentId){     //based on currentid u dispatch a action 
          dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
      }else{
        dispatch(createPost({...postData,name:user?.result?.name}));      
      }
      clear();    //now clearing the form this is very IMPORTANT 
                  //we set the currentid to null and
                  //this will trigger the useeffect in the app.js
                  //and that will dispatch getpost action and will change the ui
  }
  const clear = () =>{
       setcurrentId(null);   //this helps me to trigger the useeffect in app.js
        setpostData({        // empty the form after using.
             title:'',message:'',tags:'',selectedFile:''
        })      
  }

 useEffect(()=>{
    if(post) setpostData(post);
 },[post])  
//if i am updating a post so to show the previous data of the post in ui
// i set the postdata to post 


const user = JSON.parse(localStorage.getItem('profile'));

// useEffect(()=>{
//  setuser(JSON.parse(localStorage.getItem('profile')));
// },[user])
//JSON.parse(localStorage.getItem('profile'));

if(!user?.result?.name){
    return(
        <Paper className={classes.paper}>
            <Typography variant="h6" align="center">Please SignIn to create your own memories and like others memories</Typography>
        </Paper>
    )
}
  return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId?"Editing":"Creating"} a Memory</Typography>
                <TextField name="title" label="Title" variant="outlined" fullWidth value={postData.title} onChange={(e)=>setpostData({...postData , title:e.target.value})}   />
                <TextField name="message" label="Message" variant="outlined" fullWidth value={postData.message} onChange={(e)=>setpostData({...postData , message:e.target.value})}  /> 
                <TextField name="tags" label="Tags" variant="outlined" fullWidth value={postData.tags} onChange={(e)=>setpostData({...postData , tags:e.target.value.split(',')})}   />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64})=>setpostData({...postData,selectedFile:base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="primary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper> 
    )
}

export default Form
