import { handleActions } from 'redux-actions';

//초기값
const initialState = {
    data: [],
    pageInfo: {}
};

// 액션
export const GET_USER = 'main/GET_USER';
export const GET_FRIEND = 'main/GET_PRIEND';
export const POST_ADD_FRIEND = "main/POST_ADD_FRIEND";

export const userReducer = handleActions(
    {
        [GET_USER] : (state, { payload }) =>{
            return payload
        },
    },
    initialState
);

export const friendReducer = handleActions(
    {
        [GET_FRIEND] : (state, { payload }) =>{
            return payload
        },
    },
    initialState
);

export const addFriendReducer = handleActions(
    {
        [POST_ADD_FRIEND] : (state, { payload }) =>{
            return payload
        },
    },
    initialState
);
