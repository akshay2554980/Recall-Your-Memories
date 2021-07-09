import axios from 'axios' 
const API =  axios.create({baseURL:'http://localhost:3001'})

//this interceptor is a funtion and is going to happen before every
// api  request 
//this will send the token back to server to verify that 
// yes i  am still the same user who signedin previously.
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

//sending requests to the backend and backend will contact to db.
export const fetchPosts = ()=> API.get('/posts');

export const createPost = (newPost) =>{
   const response=  API.post('/posts',newPost);
   return response;
}

export const updatePost = (id,updatedPost) =>{
    const response =  API.patch(`/posts/${id}`,updatedPost);
    return response;
}

export const deletePost = (id) =>{
    API.delete(`/posts/${id}`);
}

export const likePost = (id) =>{
    const response=API.patch(`/posts/${id}/likepost`);
    return response;
}

export const signIn = (formData) =>{
    const response = API.post('/user/signin',formData)
    return response;
}

export const signUp = (formData) =>{
    const response = API.post('/user/signup',formData)
    return response;
}