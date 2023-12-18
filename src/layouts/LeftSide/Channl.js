// Channels.js

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useModal } from "src/components/hooks/use-modal";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import "./css/Channels.css";

const Channels = () => {
    const [channels, setChannels] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const { onOpen, onClose, data } = useModal();
    const query = useUrlQuery();
    const { state } = useLocation()
    const serverId = query.get("server");
    const channelId = query.get("channel");
    const currentChannel = useMemo(() => channels.filter(channel => channel.channelId == channelId)[0], [channelId]);

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

    /* 접속중인 유저 정보 */

    const addChannel = (newChannelName) => {
        if (channels.length <= 10) {
            setChannels([
                ...channels,
                { name: newChannelName, connectedUsers: [] },
            ]);
        } else {
            alert("더 이상 채널을 추가할 수 없습니다. (최대 10개)");
        }
    };

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

    /* 채널 삭제 */
    const channelDelete = async () => {
        if (channelId) {
            try {
                const response = await axios.delete(
                    `${process.env.REACT_APP_API_URL}/server/${serverId}/channel/${channelId}/delete`
                );
                console.log(`채널 삭제 성공:`, response.data);
                setChannels(
                    channels.filter((channel) => channel.channelId != channelId)
                );
                // setChannelId(null); // 선택된 채널 초기화
            } catch (error) {
                console.error(`채널 삭제 실패: ${error}`);
            }
        } else {
            console.log("삭제할 채널이 선택되지 않았습니다.");
        }
    };

    return (
        <>
            {/* 채널 리스트 */}
            {/* 채널 리스트 렌더링 */}
            <div className="channels-container">
                <div className="channels-list">
                    <div className="channels-title">채널 목록</div>
                    <div className="flex flex-col">
                        {channels.map((channel, index) => (
                            <Link
                                to={`/main?server=${serverId}&channel=${channel.channelId}`}
                                key={channel.channelId}
                                onClick={handleChannelClick}
                            >
                                {channel.channelName}{" "}
                                {/* 채널의 이름을 렌더링 */}
                                {/* 추후 1:1채팅 색상 변경 */}

                            </Link>
                        ))}
                    </div>

                    {/* 채널 생성 */}
                    <button
                        className="create-channel-btn"
                        onClick={() => onOpen("createChannel", { serverId })}
                        disabled={channels.length >= 3}
                    >
                        채널 생성
                    </button>
                </div>

                {currentChannel && (
                    <div>
                        <button
                            className="join-channel-btn"
                            onClick={handleJoinChannel}
                        >
                            채널명: {currentChannel.channelName}
                            <br />
                            접속중인 사람: {connectedUsers.channelCount}
                        </button>
                        <button
                            className="delete-channel-btn"
                            onClick={channelDelete}
                        >
                            채널삭제
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Channels;
