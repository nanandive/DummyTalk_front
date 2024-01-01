import axios from "axios";
import {Bell, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, LogOut, Plus, UserPlus} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "src/components/ui/button";
import { decodeJwt } from "src/lib/tokenUtils";
import {useModal} from "src/components/hooks/use-modal";

const LeftSideBar = () => {
    const [serverList, setServerList] = useState([]);
    const [page, setPage] = useState(0);
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);
    const userId = userInfo.sub;
    const { onOpen } = useModal();

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

    return (
        <div className="w-[100px] bg-[#141C26] flex flex-col gap-3 items-center">
            <div className="w-[100px] h-[80px] flex items-center justify-center border-b-[1px] border-black">
                <img
                    src="image 61.svg"
                    alt=""
                />
            </div>

            <div className="flex flex-col gap-3 items-center justify-center mt-3">
                <button
                    onClick={() => setPage((pre) => (pre > 0 ? pre - 1 : pre))}
                    className="border-2 border-[#52cbb6]" // Updated border color
                    style={serverList.length > 6 ? { display: "block"} : { display: "none" }}
                >
                    <ChevronUp className={"text-teal-300"} />
                </button>
                {slicedData.map((data, index) => (
                    <div
                        key={index}
                        onClick={() => handleServerClick(data.id)}
                    >
                        <Button className="overflow-hidden text-lg font-bold border-2 border-teal-300  w-[60px] h-[60px] bg-transparent text-teal-300">
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
                <Button size={"icon"} className="border-none">
                    <UserPlus />
                </Button>
                <Button size={"icon"} className="border-none">
                    <Bell />
                </Button>
                <Button size={"icon"} className="border-none">
                    <LogOut />
                </Button>
            </div>
        </div>
    );
};
export default LeftSideBar;
