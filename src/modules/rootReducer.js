import { combineReducers } from 'redux';
import {checkReducer, googleLoginReducer, loginReducer, mailReducer, signUpReducer} from './LoginModule'

const rootReducer = combineReducers({
    signUpReducer,
    loginReducer,
    mailReducer,
    checkReducer,
    googleLoginReducer
})

export default rootReducer;