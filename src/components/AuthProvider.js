import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";

export const AuthProvider = () => {

    const navigate = useNavigate();

    const accessToken = window.localStorage.getItem("accessToken")

    useEffect(() => {

        if(accessToken === null){
            alert("로그인이 필요한 기능입니다.")
            navigate("/", { replace: true });
        }

    }, []);

    return <Outlet />
}