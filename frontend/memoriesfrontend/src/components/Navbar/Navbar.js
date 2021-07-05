import React, { useState,useEffect } from 'react'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import makeStyles from './styles'
import {Link,useHistory,useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import memories from '../images/memories.png'
function Navbar() {
    const [user,setuser] =  useState( JSON.parse( localStorage.getItem('profile') ));  //setting into localstorage.
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation(); //gives access to change in url .. now we have access to the location i.e url

    //for changing to new token
    useEffect(() => {
        const token =  user?.token; 
        //jwt 
        setuser(JSON.parse( localStorage.getItem('profile') )); //setting the user to new user in localstorage
    },[location]) // '/auth' -> '/' 
    //when ever there is change in url(location) we do the side effect.here 
    const classes = makeStyles();

    const logout = () =>{
        dispatch({type:'LOGOUT'});
        setuser(null);
        history.push('/');
        
    }



    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>            
            <Typography component={Link} to="/" variant="h2" align="center" className={classes.heading} > Memories </Typography>
            <img src={memories} alt="memories" className={classes.image} height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            {
                user? (
                    <div className={classes.profile}>
                    <Avatar src={user.result.imageUrl}  alt={user.result.name} className={classes.purple}>{user.result.name.charAt(0)}</Avatar>
                    <Typography variant="h6" className={classes.userName}>{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>                        
                    </div>
                )  :  (
                    <Button component={Link} to="/auth" variant="contained" color="primary"> 
                        Signin
                    </Button>
                )
            }  
        </Toolbar>
        </AppBar>
    )
}

export default Navbar











