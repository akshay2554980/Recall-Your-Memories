//(state,actionType)=> new state
const postreducer = (posts=[],action)=>{         
    switch(action.type){
        case 'FETCH_ALL' :
            return action.payload;
        case 'CREATE' :
            return [...posts,action.payload]
        case 'UPDATE' :
            {
                const updatedarray =  posts.map((post)=>post._id === action.payload._id ?  action.payload: post )
                return updatedarray;   
            }
        case 'DELETE' :
            {
                const updatedarray =  posts.filter((post)=>post._id!==action.payload) 
                return updatedarray;
            }
        case 'LIKE' :
            {
                const updatedarray =  posts.map((post)=>post._id === action.payload._id ?  action.payload: post )
                return updatedarray;   
            }    
        
        default :
            return posts;   
    }
}

export default postreducer;
//for worst case setting initial array empty so that it will so spinning wheel