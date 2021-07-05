import React from 'react'
import {Container,Grow,Grid} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import {useDispatch} from 'react-redux'
import { useEffect,useState } from 'react'
import {getPosts} from '../../actions/posts'
import makeStyles from './styles'
function Home() {

    const classes = makeStyles();


  const dispatch = useDispatch();     //gives me reference to dispatch method

  const [currentId,setcurrentId ] = useState(null); 
  //now changing current id based on that the post is updating or creating.
  // passing the currentid and setcurrentid in required childs

  useEffect(()=>{
    dispatch(getPosts())           // dispatching the action creator to update ui
  },[dispatch,currentId]);            
  // using useeffect to run this part when ever there is change in dispatch and currentid 
  // so that ui can be updated corresponding to updated posts.
    return (
        <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setcurrentId={setcurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setcurrentId={setcurrentId}/>
            </Grid>  
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home
