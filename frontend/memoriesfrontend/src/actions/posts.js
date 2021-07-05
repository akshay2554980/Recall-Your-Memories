import * as api from '../api/index'
//action creaters
export  const getPosts = () => async(dispatch) => {    
   try {
       const {data} = await api.fetchPosts();      //doing changes in backend 
       dispatch({type:"FETCH_ALL",payload :data})  //dispatching a actionobject   
   } catch (error) {                                 
       console.log(error.message);
   }
}
export const createPost = (newpost) =>async(dispatch) =>{
    try {
            const {data} = await api.createPost(newpost);     
            dispatch({type:"CREATE",payload:data})         
        } catch (error) {
        console.log(error)
    }
} 
export const updatePost = (id,updatedPost) => async(dispatch)=>{
    try {
        const {data} =  await api.updatePost(id,updatedPost);
        dispatch({type:"UPDATE",payload:data})
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (id) => async(dispatch)=>{
    try {
        await api.deletePost(id)
        dispatch({type:"DELETE",payload:id})
    } catch (error) {
        console.log(error);
    }
}
export const likePost = (id) =>async(dispatch) =>{
    try {
        const {data} = await api.likePost(id)
        dispatch({type:"LIKE",payload:data})
    } catch (error) {
        console.log(error);
    }
}

//IMPORTANT
// as we now the action creators return object but with the help of thunk 
//thunk middleware i am able to return a fuction  
// => ie. async(dispatch) =>{}      