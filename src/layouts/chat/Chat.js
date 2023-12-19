import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ChatHeader from "src/components/chat/chat-header";
import ChatInput from "src/components/chat/chat-input";
import ChatMessages from "src/components/chat/chat-messages";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { useSocket } from "src/components/providers/sock-provider";
import { decodeJwt } from "src/lib/tokenUtils";

function Chat({isOpen, setOpen}) {

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);

    const [enabled, setEnabled] = useState(false); // 채팅번역 기능
    const [data, setData] = useState([]);

    const {socket, isConnected} = useSocket()

    /***
     * 1. 채팅방 입장시 채팅방의 채팅 리스트를 불러온다.
     * - 채팅 리스트는 채팅방 입장시 한번만 불러온다.
     * - userId, channelId, message, language, timestamp, page
     * -- @RequestBody : { SendChatDto : sender, message, language, channelId }
     * -- @DestinationVariable : channelId
     * -- @Header : UserId
     * -- @RequestParam : page
     * endpoint : /websocket
     * subscribe : /topic/msg/{channelId}
     * send : /app/{channelId}/message
     */
    // stomp 옵션 설정
    useEffect(() => {
        if (!channelId || !isConnected) return;

        socket.subscribe(`/topic/msg/${channelId}`, function (msg) {
            console.log(msg)

            const result = JSON.parse(msg.body);

            console.log("subscribe: ", result.chat);

            if (enabled && result.chat.sender !== parseInt(userInfo.sub)) {
                // if (enabled) {
                axios({
                    url: `${process.env.REACT_APP_API_URL}/chat/trans/${userInfo.national_language}`,
                    method: "POST",
                    data: {
                        ...result.chat,
                    },
                })
                    .then((res) => res.data)
                    .then((data) =>
                        setData((prevData) => [...prevData, data.chat])
                    );
            } else {
                setData((prevData) => [...prevData, result.chat]);
            }
        });
    }, [channelId, enabled, isConnected]);

    

    return (
        <div className="flex w-full flex-col h-full">
            {/* 채널명 */}
            {<ChatHeader isOpen={isOpen} setOpen={setOpen}/>}
            {/* 채팅방 스크롤 바 구역 */}
            <ChatMessages data={data} setData={setData} />
            {/* 메시지 입력 */}
            <ChatInput enabled={enabled} setEnabled={setEnabled} channelId={channelId} userInfo={userInfo} />
        </div>
    );
}

export default Chat;
