import { handleActions } from 'redux-actions';

//초기값
const initialState = {
    data: [],
    pageInfo: {}
};

//액션
export const POST_SIGN_UP = 'login/POST_SIGN_UP';


//리듀서
export const signUpReducer = handleActions(
    {
        [POST_SIGN_UP]: (state, { payload }) => {
            state.data.push( ...payload.data );
            return { ...state };
        },
    },
    initialState
);