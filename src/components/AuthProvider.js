import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";

export const AuthProvider = () => {


    const navigate = useNavigate();

    const token = jwtDecode(window.localStorage.getItem("accessToken"));


    useEffect(()=> {

        if (token === null) {
            alert('로그인이 필요합니다.');
            navigate("/sign-up", { replace: true });
        }

        else {

            const verified =  TokenExpiration(token);

            if (verified === false) {
                alert('로그인 세션시간이 만료되었습니다.');
                navigate("/sign-up", {replace: true});
            }
        }

    },[])


    return <Outlet />
}


const TokenExpiration = (token) => {


    if (token.exp*1000 < Date.now()) {
        window.localStorage.removeItem("accessToken")
        return false;
    }
    else {  // 엑세스 만료되지 않음

        return true;
    }


};
