import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import ChatEmpty from "src/components/chat/ChatEmpty";
import ChatHeader from "src/components/chat/chat-header";
import ChatInput from "src/components/chat/chat-input";
import ChatVoiceInputTest from "src/components/chat/chat-inputvoiceTest";
import ChatMessages from "src/components/chat/chat-messages";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import RightBar from "../MainLayout/RightBar";
import {decodeJwt} from "src/lib/tokenUtils";

function Chat() {
    const [isOpen, setOpen] = useState(false);
    const [channelType, setChannelType] = useState(null);

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/channel/type?channelId=${channelId}`)
        .then(response => {
                setChannelType(response.data.channelType);
            })
            .catch(error => {
                console.error('Error fetching channel type', error);
            });
    }, [channelId]);

    if (!channelId) return <ChatEmpty />;

    return (
        <>
            <div className="flex w-full flex-col h-full bg-[#172A46]">
                {/* 채널명 */}
                <ChatHeader
                    isOpen={isOpen}
                    setOpen={setOpen}
                />
                {/* 채팅방 스크롤 바 구역 */}
                <ChatMessages userInfo={userInfo} />
                {channelType === "TEXT" && (
                    <>
                        {/* 메시지 입력 */}
                        <ChatInput userInfo={userInfo}/>
                    </>
                )}
                {channelType === "VOICE" && (
                    <>
                        {/* 메시지 입력 */}
                        <ChatVoiceInputTest />
                    </>
                )}
            </div>
            {isOpen && <RightBar />}
        </>
    );
}

export default Chat;
