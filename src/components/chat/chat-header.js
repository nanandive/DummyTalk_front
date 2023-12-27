import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import { useUrlQuery } from "src/components/hooks/use-url-query";

const ChatHeader = ({ isOpen, setOpen }) => {
    const [channelName, setChannelName] = useState("");
    const [prevChannelId, setPrevChannelId] = useState(null);
    const query = useUrlQuery();
    const channelId = query.get("channel");
    const userId = localStorage.getItem('userId'); // 사용자 ID를 localStorage에서 가져옴
    // decodedToken.sub// USERID
    const getChannelName = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/channel/${channelId}`);
            setChannelName(response.data.channelName);
        } catch (error) {
            console.error(`Error fetching channel name: ${error}`);
        }
    };

    const joinChannel = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/channel/${channelId}/join`, { userId });
        } catch (error) {
            console.error(`Error joining channel: ${error}`);
        }
    };

    const leaveChannel = async () => {
        if (!prevChannelId) return;

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/channel/${prevChannelId}/leave`, { userId });
        } catch (error) {
            console.error(`Error leaving channel: ${error}`);
        }
    };

    useEffect(() => {
        if (channelId) {
            leaveChannel();
            joinChannel();
            getChannelName();
            setPrevChannelId(channelId);
        }
    }, [channelId]);

    return (
        <div className="h-[50px] font-bold text-xl flex pl-5 items-center bg-[#D9D9D9] border-y-[1px] border-black justify-between">
            <div>{channelName}</div>
            <Button variant={"icon"} onClick={() => setOpen(prev => !prev)}>
                {isOpen ? <ChevronsRight /> : <ChevronsLeft />}
            </Button>
        </div>
    );
};

export default ChatHeader;