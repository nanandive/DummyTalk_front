// Channels.js
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useModal } from "src/components/hooks/use-modal";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { decodeJwt } from "src/lib/tokenUtils";
import "./css/Channels.css";
import { ScrollArea } from "../ui/scroll-area";
import ChannelSection from "./channel-section";
import ChannelItem from "./channel-item";

export const ChannelType = {
    VOICE: "VOICE",
    TEXT: "TEXT",
};

const Channels = () => {
    const [channels, setChannels] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const { onOpen, onClose, data } = useModal();
    const query = useUrlQuery();
    const { state } = useLocation();
    const serverId = query.get("server");
    const channelId = query.get("channel");

    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);
    const userId = userInfo.sub;

    /* 채널 리스트 함수 */
    useEffect(() => {
        const channelList = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/server/${serverId}/channel/list/${userId}`
                );
                setChannels(response.data);
                console.log("채널 리스트 성공 >>>>>>>> : ", response.data);
            } catch (error) {
                console.log("채널 리스트 실패 >>>>>>>> : ", error.message);
                if (error.message == "Request failed with status code 404") {
                    navigate(-1);
                }
            }
        };
        channelList();
    }, [serverId]);

    const handleChannelClick = () => {
        const selectedChannel = channels;
        // setChannelId(selectedChannel);
    };

    const handleJoinChannel = () => {
        setChannels((prevChannels) => {
            const updatedChannels = prevChannels.map((channel) => ({
                ...channel,
                connectedUsers:
                    channel === channelId
                        ? connectedUsers
                        : channel.connectedUsers,
            }));
            console.log(`Joining Channel: ${channelId.name}`);
            console.log(`Connected Users: ${connectedUsers.length}`);
            return updatedChannels;
        });
    };

    const textChannels = channels.filter(
        (channel) => channel.channelType === ChannelType.TEXT
    );
    const audioChannels = channels.filter(
        (channel) => channel.channelType === ChannelType.VOICE
    );

    console.log("channel 렌더링");
    return (
        <>
            {/* 채널 리스트 */}
            {/* 채널 리스트 렌더링 */}
            {/* <div className="h-[80px] font-bold text-xl border-b-[1px] border-black text-teal-300 flex items-center p-4">
            </div> */}
            <div className="flex flex-col text-zinc-300 font-thin overflow-y-scroll scrollbar-hidden">
                <ScrollArea className="flex-1 px-3">
                    {!!textChannels?.length && (
                        <div className="mb-2">
                            <ChannelSection
                                channelType={ChannelType.TEXT}
                                label="텍스트 채널"
                            />
                            <div className="space-y-[2px]"></div>
                            {textChannels.map((channel) => (
                                <ChannelItem
                                    key={channel.channelId}
                                    serverId={serverId}
                                    channel={channel}
                                />
                            ))}
                        </div>
                    )}
                    {!!audioChannels?.length && (
                        <div className="mb-2">
                            <ChannelSection
                                channelType={ChannelType.TEXT}
                                label="음성 채널"
                            />
                            <div className="space-y-[2px]"></div>
                            {audioChannels.map((channel) => (
                                <ChannelItem
                                    key={channel.channelId}
                                    serverId={serverId}
                                    channel={channel}
                                />
                            ))}
                        </div>
                    )}
                    
                </ScrollArea>
                {/* {channels.map((channel, index) => (
                    <Link
                        to={`/main?server=${serverId}&channel=${channel.channelId}`}
                        key={channel.channelId}
                        onClick={handleChannelClick}
                        className="hover:text-zinc-400"
                    >
                        {channel.channelName}
                    </Link>
                ))} */}
            </div>
        </>
    );
};

export default Channels;
