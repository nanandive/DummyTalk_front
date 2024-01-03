import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Channels from "src/components/channel/Channel";
import Friends from "src/components/channel/Friends";
import ChannelHeader from "src/components/channel/channel-header";
import UserSetting from "src/components/channel/user-settings";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { Separator } from "src/components/ui/separator";

function LeftSide() {
    const query = useUrlQuery();
    const serverId = query.get("server");
    const [serverData, setServerData] = useState(null);
    const { state } = useLocation();
    useEffect(() => {
        const fetchServerDetail = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/server/${serverId}`
                );
                setServerData(response.data);
            } catch (error) {
                console.log("서버 불러오기 실패", error);
            }
        };

        fetchServerDetail();
    }, [serverId, state]);

    if (!serverId || !serverData) return null;

    return (
        <section className="w-60 min-w-[240px] h-full bg-[#112033] flex flex-col">
            <ChannelHeader server={serverData} />
            <Channels server={serverData} />
            <Separator className="my-4 bg-black" />
            <Friends className=" overflow-y-scroll" />
            <Separator className="my-4 bg-black" />
            <UserSetting />
        </section>
    );
}

export default LeftSide;
