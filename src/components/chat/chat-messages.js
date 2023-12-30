import axios from "axios";
import { useEffect, useRef, useState, useCallback } from "react";
import ChatItem from "src/components/chat/chat-item";
import { useChatData } from "../hooks/use-chat-data";
import { useUrlQuery } from "src/components/hooks/use-url-query";

const ChatMessages = ({ userInfo }) => {
  const query = useUrlQuery();
  const channelId = query.get("channel");

  const chatRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, setData } = useChatData();

  const fetchChatData = async (page, size) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/chat/${channelId}/${userInfo.sub}?page=${page}&size=${size}`
      );
      setData(response.data.data);
      console.log("response ", response.data);
    } catch (error) {
      console.error("채팅 리스트 뽑아보기 에러", error);
    }
  };

  const handlePagination = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleScroll = useCallback(() => {
    const chatElement = chatRef.current;
    if (chatElement && chatElement.scrollTop === 0) {
      handlePagination(currentPage - 1);
    }
  }, [currentPage]);

  useEffect(() => {
    if (!channelId || channelId === "") return;
    fetchChatData(currentPage, pageSize);

    const chatElement = chatRef.current;
    if (chatElement) {
      chatElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatElement) {
        chatElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [channelId, currentPage, pageSize, handleScroll]);

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={data.length < pageSize}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="h-3/4 flex items-end ml-3 overflow-y-auto scrollbar-hidden scroll-smooth relative">
      <div className="mt-auto w-full" ref={chatRef}>
        {data.map((chat) => (
          <ChatItem
            key={chat.chatId}
            chat={chat}
            name={chat.nickname}
            channel={channelId}
          />
        ))}
        {renderPagination()}
      </div>
    </div>
  );
};

export default ChatMessages;