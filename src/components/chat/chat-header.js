import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import { useUrlQuery } from "src/components/hooks/use-url-query";

const ChatHeader = ({ isOpen, setOpen }) => {
    const [channelName, setChannelName] = useState("");
    const [channelCount, setChannelCount] = useState(0); // 채널 참여자 수를 저장하기 위한 상태
    const [prevChannelId, setPrevChannelId] = useState(null);
    const query = useUrlQuery();
    const channelId = query.get("channel");
    const userId = localStorage.getItem('userId'); // 사용자 ID를 localStorage에서 가져옴

    const getChannelInfo = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/channel/${channelId}`);
            const { channelName, channelCount } = response.data;
            setChannelName(channelName || "");
            setChannelCount(channelCount || 0);
        } catch (error) {
            console.error(`Error fetching channel info: ${error}`);
        }
    };

    const joinChannel = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/channelParti/join`, { userId, channelId });
            getChannelInfo();
        } catch (error) {
            console.error(`Error joining channel: ${error}`);
        }
    };

    const leaveChannel = async () => {
        if (!prevChannelId) return;

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/channelParti/leave`, { userId, channelId: prevChannelId });
            getChannelInfo();
        } catch (error) {
            console.error(`Error leaving channel: ${error}`);
        }
    };

    useEffect(() => {
        if (channelId) {
            leaveChannel();
            joinChannel();
            setPrevChannelId(channelId);
        }
    }, [channelId]);

    return (
        <div className="h-[50px] font-bold text-xl flex pl-5 items-center bg-[#D9D9D9] border-y-[1px] border-black justify-between">
            <div>{`${channelName} (${channelCount} participants)`}</div>
            <Button variant={"icon"} onClick={() => setOpen(prev => !prev)}>
                {isOpen ? <ChevronsRight /> : <ChevronsLeft />}
            </Button>
        </div>
    );
};

export default ChatHeader;