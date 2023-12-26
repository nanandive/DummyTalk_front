import ChatHeader from "src/components/chat/chat-header";
import ChatInput from "src/components/chat/chat-input";
import ChatMessages from "src/components/chat/chat-messages";
import RightBar from "../MainLayout/RightBar";
import { useMemo, useState } from "react";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { decodeJwt } from "src/lib/tokenUtils";
import ChatEmpty from "src/components/chat/ChatEmpty";

function Chat() {
    const [isOpen, setOpen] = useState(false);

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);

    if (!channelId) return <ChnatEmpty />;

                return (
                <>
                    <div className="flex w-full flex-col h-full">
                        {/* 채널명 */}
                        <ChatHeader
                            isOpen={isOpen}
                            setOpen={setOpen}
                        />
                        {/* 채팅방 스크롤 바 구역 */}
                        <ChatMessages chanelId={channelId} userInfo={userInfo}/>
                {/* 메시지 입력 */}
                <ChatInput channelId={channelId} userInfo={userInfo}/>
            </div>
            {isOpen && <RightBar isOpen={isOpen}/>}
        </>
    );
}

export default Chat;
