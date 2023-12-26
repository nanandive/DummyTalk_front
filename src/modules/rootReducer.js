import { combineReducers } from 'redux';
import {
    changePasswordReducer,
    checkReducer,
    findEmailReducer,
    googleLoginReducer,
    loginReducer,
    mailReducer, passwordMailReducer,
    signUpReducer
} from './LoginModule'
import {addFriendReducer, friendReducer, userReducer} from "./MainModule";

const rootReducer = combineReducers({
    signUpReducer,
    loginReducer,
    mailReducer,
    checkReducer,
    googleLoginReducer,
    userReducer,
    addFriendReducer,
    findEmailReducer,
    changePasswordReducer,
    passwordMailReducer,
    friendReducer
})

export default rootReducer;