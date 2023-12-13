import { handleActions } from 'redux-actions';

//초기값
const initialState = {
    data: [],
    pageInfo: {}
};

//액션
export const GET_USER_EMAIL = 'sign/GET_USER_EMAIL';
export const POST_SIGN_UP = 'sign/POST_SIGN_UP';


//리듀서
export const signUpReducer = handleActions(
    {
        [POST_SIGN_UP] : (state, { payload }) =>{
            return payload
        },
    },
    initialState
);