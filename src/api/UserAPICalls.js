import {POST_LOGIN, POST_SIGN_UP, GET_TEST, POST_MAIL} from "../modules/LoginModule";

export const callPostSignUp = (user) => {

    const requestURL = `${process.env.REACT_APP_API_URL}/signUp`;

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
            // console.log(result);
        } else{
            dispatch({ type: POST_SIGN_UP, payload: result });
            // console.log(resul3t);
            alert(result.message)
        }
    }
}

// 로그인
export const callPotLogin = (user) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/login`;
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

        dispatch({ type: POST_LOGIN, payload: result });
        if(result.status == 200){

            window.localStorage.setItem('accessToken', result.data.accessToken); // key : value
            console.log(localStorage.getItem('accessToken'))
            dispatch({ type: POST_LOGIN, payload: result });
            alert(result.message)
            window.location.reload();

        } else{
            dispatch({ type: POST_LOGIN, payload: result });
            alert(result.message)
        }
    }
}

export const callPostMail = (userEmail) => {
    const requestURL = `${process.env.REACT_APP_API_URL}/userEmail/{}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body : JSON.stringify(userEmail)
        }).then(response => response.json());

        dispatch({ type: POST_MAIL, payload: result });
    }
}
