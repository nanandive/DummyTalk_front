import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";

export const AuthProvider = () => {

    const accessToken = window.localStorage.getItem("accessToken")
        if(accessToken === null){
            alert("로그인이 필요한 기능입니다.")
            return <Navigate to={'/sign-up'} replace={true} />
        }
    return <Outlet />
}