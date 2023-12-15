import { combineReducers } from 'redux';
import {loginReducer, signUpReducer, testReducer} from './LoginModule'

const rootReducer = combineReducers({
    signUpReducer,
    loginReducer,
    testReducer
})

export default rootReducer;