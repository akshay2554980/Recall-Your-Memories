const authReducer = (state = {authData:null},action) =>{
    switch(action.type){
        case "AUTH": 
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state,authData:action?.data}
        case "LOGOUT" :
            localStorage.clear()        //just clear the localstorage 
            return {...state,authData:null}
        default :
        return state;
    }
} 
export default authReducer;