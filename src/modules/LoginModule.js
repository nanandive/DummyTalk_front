import { handleActions } from 'redux-actions';

//초기값
const initialState = {
    data: [],
    pageInfo: {}
};

//액션
export const POST_LOGIN = 'login/POST_LOGIN'
export const POST_SIGN_UP = 'sign/POST_SIGN_UP';
export const GET_TEST = 'test/GET_TEST'


//리듀서
export const signUpReducer = handleActions(
    {
        [POST_SIGN_UP] : (state, { payload }) =>{
            return payload
        },
    },
    initialState
);

export const loginReducer = handleActions(
    {
        [POST_LOGIN] : (state, { payload }) =>{
            return payload
        },
    },
    initialState
);

export const testReducer = handleActions(
    {
        [GET_TEST] : (state, { payload }) =>{
            return payload
        },
    },
    initialState
);