import {GET_USER_EMAIL, POST_SIGN_UP} from "../modules/LoginModule";

export const callPostSignUp = (user) => {
    const requestURL = `http://localhost:9999/signUp`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            // withCredentials: true, // 필요에 따라 설정
            body: JSON.stringify(user)
        }).then(response => response.json());

        /* 응답 상태 코드에 따른 처리*/
        if(result.status == "500"){
            dispatch({ type: POST_SIGN_UP, payload: result });
            alert(result.message)
        } else{
            dispatch({ type: POST_SIGN_UP, payload: result });

            alert(result.message)
        }
    }

    // export const callGetLogin = (user) => {
    //     const requestURL = `http://localhost:9999/signUp`;
    //
    //     return async (dispatch, getState) => {
    //         const result = await fetch(requestURL, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': '*/*'
    //             },
    //         }).then(response => response.json());
    //
    //         /* 응답 상태 코드에 따른 처리*/
    //         if (result.status == "500") {
    //             dispatch({type: GET_USER_EMAIL, payload: result});
    //         } else {
    //             dispatch({type: GET_USER_EMAIL, payload: result});
    //         }
    //     }
    // }
};