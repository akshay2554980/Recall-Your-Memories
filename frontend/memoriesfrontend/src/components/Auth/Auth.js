import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Avatar, Button, Paper, Grid, Container, Typography } from '@material-ui/core'
import useStyles from './style'
import {useHistory} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import Input from './Input';
import Icon from './icon'
import {signIn,signUp} from '../../actions/auth'
function Auth() {
    const history = useHistory();  //used to redirect.
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setshowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
    const [formData,setformData] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        //handling 2 types of submit -  signin and signup
        if(isSignup){
                dispatch(signUp(formData,history))   //to save the info in db and navigate once something happens.
        }
        else{
            dispatch(signIn(formData,history)) 
        }
    }
    const handleChange = (e) => {
        setformData({...formData,[e.target.name]:e.target.value});
    }
    const handleshowPassword = () => {
        setshowPassword((state) => !state);
    }
    const switchMode = () => {
        setisSignup((prevstate) => !prevstate)
        handleshowPassword(false);
    }
    const googleSuccess =  async(res)=>{         //this is  a async function
       console.log(res);
        const result = res?.profileObj;         //    ?. works to check that the res exists or not. if not its undefined not error
        const token = res?.tokenId;
        try {
            dispatch({type:"AUTH",data:{result,token}})
            // it will directly redirect me to the home page 
            history.push('/')   //using useHistory from react-router-dom
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure =() =>{
        console.log("Google Signin is unsuccessful try again later");
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Signup" : "Signin"}</Typography>
                <form classes={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleshowPassword={handleshowPassword} />
                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                        
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                            {
                                isSignup ? "Sign Up" : "Sign In"
                            }
                        </Button>
                        <GoogleLogin
                            clientId="330982893236-rgj132m0kksid10g45pvkk4hse7hr4h1.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {
                                        isSignup ? "already have an account? Signin" : "don't have an account? signup"
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
