// Channels.js
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useModal } from "src/components/hooks/use-modal";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import "./css/Channels.css";
import {Settings2} from "lucide-react";

const Channels = () => {

    const [channels, setChannels] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const { onOpen, onClose, data } = useModal();
    const query = useUrlQuery();
    const { state } = useLocation()
    const serverId = query.get("server");
    const channelId = query.get("channel");

    /* 채널 리스트 함수 */
    useEffect(() => {
        const channelList = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/server/${serverId}/channel/list`
                );
                setChannels(response.data);
                console.log("채널 리스트 성공 >>>>>>>> : ", response.data);
            } catch (error) {
                console.log("채널 리스트 실패 >>>>>>>> : ", error);
            }
        };
        channelList();
    }, [serverId, state]);

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



    return (
        <>
            {/* 채널 리스트 */}
            {/* 채널 리스트 렌더링 */}
            <div className="channels-container">
                <div className="channels-list text-zinc-300">
                    <h1 className="text-zinc-300 text-lg">채널 목록</h1>

                    {/* 채널 설정*/}
                    <button
                        className="color-teal-300 "
                        onClick={() => onOpen("channelSettingModal", { channelId })}
                    ><Settings2 />
                    </button>

                    <div className="flex flex-col">
                        {channels.map((channel, index) => (
                            <Link
                                to={`/main?server=${serverId}&channel=${channel.channelId}`}
                                key={channel.channelId}
                                onClick={handleChannelClick}
                            >
                                {channel.channelName}
                            </Link>
                        ))}
                    </div>

                    <button
                        className="create-channel-btn"
                        onClick={() => onOpen("createChannel", { serverId })}
                        disabled={channels.length >= 10}
                    >
                        채널 생성
                    </button>
                </div>

            </div>
        </>
    );
};

export default Channels;
