import ChatHeader from "src/components/chat/chat-header";
import ChatInput from "src/components/chat/chat-input";
import ChatVoiceInput from "src/components/chat/chat-inputvoice";
import ChatMessages from "src/components/chat/chat-messages";
import RightBar from "../MainLayout/RightBar";
import { useEffect, useMemo, useState } from "react";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { decodeJwt } from "src/lib/tokenUtils";
import ChatEmpty from "src/components/chat/ChatEmpty";
import axios from 'axios'

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
            <div className="flex w-full flex-col h-full" style={{ backgroundColor: '#141c26', borderTop: '1px solid #a9e5db' }}>
                {/* 채널명 */}
                <ChatHeader
                    isOpen={isOpen}
                    setOpen={setOpen}
                />
                {/* 채팅방 스크롤 바 구역 */}
                <ChatMessages channelId={channelId} userInfo={userInfo} />
                {channelType === "TEXT" && (
                    <>
                        {/* 메시지 입력 */}
                        <ChatInput channelId={channelId} userInfo={userInfo} />
                    </>
                )}
                {channelType === "VOICE" && (
                    <>
                        {/* 메시지 입력 */}
                        <ChatVoiceInput channelId={channelId} userInfo={userInfo} />
                    </>
                )}
            </div>
            {isOpen && <RightBar />}
        </>
    );
}

export default Chat;
