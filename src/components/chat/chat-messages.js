import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ChatItem from "src/components/chat/chat-item";
import { useChatData } from "../hooks/use-chat-data";

const ChatMessages = ({ channelId, userInfo }) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const { data, setData } = useChatData();
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

  useEffect(() => {
    if (!channelId) return;
    const fetchChatData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/chat/${channelId}/${userInfo.sub}`
        );

        setData(response.data.data);
        console.log("response ", response.data);
      } catch (error) {
        console.error("채팅 리스트 뽑아보기 에러", error);
      }
    };
    fetchChatData();
  }, [channelId, userInfo, setData]);

  console.log(data);

  return (
    <div className="h-3/4 flex items-end ml-3 overflow-y-auto scrollbar-hidden relative">
      <div className="mt-auto w-full" ref={chatRef}>
        {data.map((chat) => (
          <ChatItem key={chat.chatId} chat={chat} name={chat.nickname} />
        ))}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};
export default ChatMessages;
