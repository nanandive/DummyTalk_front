import { format } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import ChatItem from "src/components/chat/chat-item";
import { useUrlQuery } from "../hooks/use-url-query";
import axios from "axios";
import { decodeJwt } from "src/lib/tokenUtils";
import ChatEmpty from "./ChatEmpty";

const ChatMessages = ({data, setData}) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    const chatRef = useRef(null);
    const bottomRef = useRef(null);

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);

    const fetchChatData = async () => {
        try {
            console.log("===================================== fetchChatData");
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/chat/${channelId}/${userInfo.sub}`
            );
            setData(response.data.data);
            console.log(
                "===================================== response " + response
            );
        } catch (error) {
            console.error("채팅 리스트 뽑아보기 에러", error);
        }
    };

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef.current;
        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }

            if (!topDiv) {
                return false;
            }

            const distanceFromBottom =
                topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <= 100;
        };

        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth",
                });
            }, 100);
        }
    }, [bottomRef, chatRef, hasInitialized, data]);

    useEffect(() => {
        if (channelId) fetchChatData();
    }, [channelId]);

    if (!channelId) return <ChatEmpty />;

    return (
        <div className="h-3/4 flex items-end ml-3 overflow-y-auto scrollbar-hidden relative">
            <div
                className="mt-auto w-full"
                ref={chatRef}
            >
                {data.map((chat) => (
                    <ChatItem
                        key={chat.chatId}
                        content={chat.message}
                        member={chat.sender}
                        name={chat.nickname}
                        timestamp={format(new Date(), "yyyy MMM d, HH:mm:ss")}
                    />
                ))}
                <div ref={bottomRef}></div>
            </div>
        </div>
    );
};
export default ChatMessages;
