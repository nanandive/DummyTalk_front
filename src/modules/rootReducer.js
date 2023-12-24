import { combineReducers } from 'redux';
import {
    checkReducer,
    findEmailReducer,
    googleLoginReducer,
    loginReducer,
    mailReducer,
    signUpReducer
} from './LoginModule'
import {addFriendReducer, userReducer} from "./MainModule";

const rootReducer = combineReducers({
    signUpReducer,
    loginReducer,
    mailReducer,
    checkReducer,
    googleLoginReducer,
    userReducer,
    addFriendReducer,
    findEmailReducer
})

export default rootReducer;