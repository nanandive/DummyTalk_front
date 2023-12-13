import { combineReducers } from 'redux';
import { signUpReducer } from './LoginModule'

const rootReducer = combineReducers({
    signUpReducer,
})

export default rootReducer;