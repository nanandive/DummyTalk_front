import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import ChatItem from "src/components/chat/chat-item";

const ChatMessages = ({ data }) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    const chatRef = useRef(null);
    const bottomRef = useRef(null);

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
