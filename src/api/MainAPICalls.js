import {GET_FRIEND, GET_USER, POST_ADD_FRIEND} from "../modules/MainModule";
import {jwtDecode} from "jwt-decode";


const accessToken = window.localStorage.getItem('accessToken');
const decodedToken = accessToken ? jwtDecode(accessToken) : null;

export const callGetNickname = () => {
    const requestURL = `${process.env.REACT_APP_API_URL}/user/${decodedToken.sub}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        }).then(response => response.json());
        console.log(result.data)
        dispatch({ type: GET_USER, payload: result.data });
    }
}

export const callGetFriend = () => {
    const requestURL = `${process.env.REACT_APP_API_URL}/friend/${decodedToken.sub}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        }).then(response => response.json());
        console.log(result.data)
        dispatch({ type: GET_FRIEND, payload: result.data });
    }
}

export const callPostFriend = (email) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/friend/${decodedToken.sub}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },body: JSON.stringify(email)
        }).then(response => response.json());
        alert(result.message)
        dispatch({ type: POST_ADD_FRIEND, payload: result.data });
    }
}


