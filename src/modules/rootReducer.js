import { combineReducers } from 'redux';
import {loginReducer, mailReducer, signUpReducer} from './LoginModule'

const rootReducer = combineReducers({
    signUpReducer,
    loginReducer,
    mailReducer
})

export default rootReducer;