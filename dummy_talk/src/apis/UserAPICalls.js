import { POST_SIGN_UP } from "../modules/LoginModule";

export const callPostLogin = (user) => {
    const requestURL = `http://localhost:9999/login`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json());
        dispatch({ type: POST_SIGN_UP, payload: result.data });
    }
};