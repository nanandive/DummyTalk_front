import ChatHeader from "src/components/chat/chat-header";
import ChatInput from "src/components/chat/chat-input";
import ChatMessages from "src/components/chat/chat-messages";
import RightBar from "../MainLayout/RightBar";
import { useMemo, useState } from "react";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { decodeJwt } from "src/lib/tokenUtils";

function Chat() {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState([])

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);

    return (
        <>
            <div className="flex w-full flex-col h-full">
                {/* 채널명 */}
                <ChatHeader
                    isOpen={isOpen}
                    setOpen={setOpen}
                />
                {/* 채팅방 스크롤 바 구역 */}
                <ChatMessages channelId={channelId} data={data} setData={setData} userInfo={userInfo}/>
                {/* 메시지 입력 */}
                <ChatInput channelId={channelId} setData={setData} userInfo={userInfo}/>
            </div>
            {isOpen && <RightBar />}
        </>
    );
}

export default Chat;
