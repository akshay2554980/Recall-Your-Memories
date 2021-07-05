import React from 'react'
import Post from './Post/Post'
import makeStyles from './styles'
import {Grid,CircularProgress} from '@material-ui/core'
import {useSelector} from 'react-redux'                   
function Posts({setcurrentId}) {
  const classes = makeStyles();
  const posts=useSelector((state)=>state.postreducer);   //use store state with the help of useSelector hook
    return (
        !posts.length ? <CircularProgress />:
        (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setcurrentId={setcurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts



