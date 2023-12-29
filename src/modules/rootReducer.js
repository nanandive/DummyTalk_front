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
import {
    addFriendReducer,
    approvalReducer,
    chageUserReducer, chatReducer,
    friendReducer, refusalReducer,
    requestReducer,
    userReducer
} from "./MainModule";

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
    friendReducer,
    chageUserReducer,
    requestReducer,
    approvalReducer,
    refusalReducer,
    chatReducer
})

export default rootReducer;