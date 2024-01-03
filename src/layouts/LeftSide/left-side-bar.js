import axios from "axios";
import { Bell, ChevronDown, ChevronUp, LogOut, Plus, UserPlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "src/components/ui/button";
import { decodeJwt } from "src/lib/tokenUtils";
import {useModal} from "src/components/hooks/use-modal";
import {useDispatch, useSelector} from "react-redux";
import {callGetFriendRequest, callGetNickname, callPostApproval, callPostRefusal} from "src/api/MainAPICalls";
import styles from "src/layouts/LeftSide/left-side-bar.module.css"

const LeftSideBar = () => {
    const [serverList, setServerList] = useState([]);
    const [page, setPage] = useState(0);
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);
    const userId = userInfo.sub;
    const { onOpen } = useModal();

    let [btnActive, setBtnActive] = useState('');

    const [onRequest, setOnRequest] = useState(false);
    const FriendData = useSelector(state => state.requestReducer);
    const dispatch =  useDispatch()
    const { state } = useLocation();
    const navigate = useNavigate();
    const validServerList = Array.isArray(serverList) ? serverList : [];
    const slicedData =
        validServerList.length > 6
            ? validServerList.slice(page, 6 + page)
            : validServerList;

    const handleServerClick = (serverId) => {
        navigate(`/main?server=${serverId}`);
    };

    useEffect(() => {
        const fetchServers = async () => {
            if (!userId) return;
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/server/list/${userId}`
                );
                setServerList(
                    Array.isArray(response.data) ? response.data : []
                );
                console.log("요청 성공", response);
                console.log("요청 성공", setServerList);
            } catch (error) {
                console.error("서버 리스트 가져오기 실패", error);
                setServerList([]); // 오류 발생 시 빈 배열로 설정
            }
        };
        fetchServers();
    }, [state]);

    useEffect(() => {
        dispatch( callGetNickname() )
        dispatch( callGetFriendRequest() )
    }, []);

    const onClickRequest = () =>{
        setOnRequest(prev => !prev);
    }
    const onClickApproval = (friendId) =>{
        dispatch(callPostApproval(friendId))
    }
    const onClickRefusal = (friendId) =>{
        dispatch(callPostRefusal(friendId))
    }

    return (
        <div className="w-[60px] min-w-[60px] bg-[#141C26] flex flex-col gap-3 items-center">
            <div
                onClick={ () => { navigate('/')}}
                className="w-full h-[60px] flex items-center justify-center border-b-[1px] border-black cursor-pointer">
                <img
                    src="image 61.svg"
                    alt=""
                />
            </div>

            <div className="flex flex-col gap-3 items-center justify-center">
                <button
                    onClick={() => setPage((pre) => (pre > 0 ? pre - 1 : pre))}
                    className="border-2 border-teal-300" // Updated border color
                    style={serverList.length > 6 ? { display: "block"} : { display: "none" }}
                >
                    <ChevronUp className={"text-teal-300"} />
                </button>
                {slicedData.map((data, index) => (
                    <div
                        key={index}
                        onClick={() => handleServerClick(data.id)}
                    >
                        <Button
                            onClick
                            className="overflow-hidden text-lg font-bold border-2 border-teal-300 bg-transparent text-teal-300 hover:bg-teal-300 hover:text-[#0B1725]
                            active:bg-teal-300 active:text-[#0B1725]
                            focus:bg-teal-300 focus:text-[#0B1725]"
                            size="icon">
                            {data.serverName
                                ? data.serverName.slice(0, 2)
                                : "???"}
                        </Button>
                    </div>
                ))}
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="border-2 border-[#52cbb6]" // Updated border color
                    style={serverList.length > 6 && page + 6 !== serverList.length ? { display: "block"} : { display: "none" }}
                >
                    <ChevronDown className={"text-teal-300"} />
                </button>
                <div onClick={() => onOpen("createServer")}>
                    <Button className="#52cbb6 border-2 border-teal-300 text-teal-300" size="icon">
                        <Plus />
                    </Button>
                </div>

            </div>

            <div className="flex flex-col mt-auto mb-3 text-teal-300 gap-4">
                <Button size={"icon"}
                        onClick={() => onOpen("addFriend")}
                        className="border-none">
                    <UserPlus />
                </Button>
                <Button
                    onClick={ onClickRequest }
                    size={"icon"} className="border-none">
                    <Bell />
                </Button>
                <Button size={"icon"}
                        onClick={() => onOpen("logout")}
                        className="border-none" >
                    <LogOut />
                </Button>
            </div>
            <div style={
                onRequest ?
                    { width:"400px", height:"500px", top:"65%" ,left:"13%", border:"1px solid black", background:"whitesmoke",
                        transform: "translate(-50%, -50%)", position: "absolute", overflow: "auto", zIndex:"1"}
                    :
                    {display : "none"} }>
                <div className={styles.request}>
                    {FriendData.length > 0 && FriendData.map(friend =>(
                        <div style={{display:"flex"}}>
                            <div className="mr-20">
                                {friend.name}
                            </div>
                            <div>
                                {friend.userEmail}
                            </div>
                            <button onClick={() => onClickApproval({friendId: friend.userId})} className={ styles.approval}>
                                수락
                            </button>
                            <button onClick={() => onClickRefusal({friendId: friend.userId})} className={ styles.refusal}>
                                삭제
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default LeftSideBar;
