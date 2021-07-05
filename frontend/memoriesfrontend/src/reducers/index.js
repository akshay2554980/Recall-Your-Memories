import {combineReducers} from 'redux'

import postreducer from './posts'
import authReducer from './auth'
const  reducers = combineReducers({postreducer,authReducer})
export default reducers;

// i can have only one reducer so combining all.












