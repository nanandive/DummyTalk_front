import { combineReducers } from 'redux';
import {checkReducer, loginReducer, mailReducer, signUpReducer} from './LoginModule'

const rootReducer = combineReducers({
    signUpReducer,
    loginReducer,
    mailReducer,
    checkReducer
})

export default rootReducer;