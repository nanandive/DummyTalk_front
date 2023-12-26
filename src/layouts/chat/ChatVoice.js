import { Switch } from "@headlessui/react";
import axios from "axios";
import { ChevronsLeft, ChevronsRight, ImagePlus } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import SockJS from "sockjs-client";
import ChatItem from "src/components/chat/chat-item";
import ChatEmpty from "src/components/chat/ChatEmpty";
import { useModal } from "src/components/hooks/use-modal";
import { useSocket } from "src/components/hooks/use-socket";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";
import { Textarea } from "src/components/ui/textarea";
import { decodeJwt } from "src/lib/tokenUtils";
import Stomp from "webstomp-client";

function Chat({ isOpen, setOpen }) {
  const { onOpen, onClose } = useModal();
  const { socket } = useSocket();
  const query = useUrlQuery();
  const channelId = query.get("channel");

  const accessToken = localStorage.getItem("accessToken");
  const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);

  const [enabled, setEnabled] = useState(false); // 채팅번역 기능
  const [data, setData] = useState([]);
  //audio message
  const [newMessage, setNewMessage] = useState([]); // 초기값으로 빈 배열을 설정
  const [onRec, setOnRec] = useState(false); // 초기값을 false로 설정

  const [isDragging, setIsDragging] = useState(false); //drag&drop
  const [isMouseOver, setIsMouseOver] = useState(false); // 마우스가 채팅창 위에 있는지 여부


  //drag & drop

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    // Handle the dropped files (e.g., send to the server)
    handleDroppedFiles(files);
  };

  const handleDroppedFiles = (files) => {
    // 파일 처리 로직 구현 (예: 서버로 전송)
    console.log("Dropped files:", files);

    // 필요한 경우 파일을 서버로 전송하는 등의 추가 작업을 수행할 수 있습니다.
  };

  // 마우스 이벤트 핸들러
  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  // 엔터키 눌렀을 때 메시지 전송
  const enter_event = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  const sendChatMessage = useCallback(() => {
    socket.send(
      `/app/${channelId}/message`,
      JSON.stringify({
        message: sendMessage.current?.value,
        sender: userInfo.sub,
        nickname: userInfo.nickname,
        language: "en",
        channelId,
      })
    );

    sendMessage.current.value = "";
    // 메시지를 전송한 후에 메시지를 초기화
    // setSendMessage("");
  }, [channelId, sendMessage]);

  const stopRecording = async (media, userInfo, channelId, socket) => {
    media.ondataavailable = function (e) {
      const audioBlob = new Blob([e.data], { type: "audio/wav" });
  
      const formData = new FormData();
      formData.append("audio", audioBlob);
  
      axios.post("http://localhost:9999/channel/audioMessage", formData)
        .then((response) => {
          console.log("오디오 업로드 성공:", response);
          const audioUrl = response.data.audioUrl; 
          sendAudioMessage(audioUrl, userInfo, channelId, socket);
        })
        .catch((error) => {
          console.error("오디오 업로드 오류:", error);
        });
    };
  };
  
  const sendAudioMessage = useCallback((audioUrl, userInfo, channelId, socket) => {
    socket.current.send(
      `/app/${channelId}/audioMessage`,
      JSON.stringify({
        message: "오디오 메시지",
        sender: userInfo.sub,
        nickname: userInfo.nickname,
        language: "en",
        channelId,
        audioUrl: audioUrl,
      })
    );
  }, []);

  // 이미지 전송
  const imageSend = () => {
    // 이미지 전송 이벤트 추가 예정
    console.log("imageSend");
  };

  const fetchChatData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/channel/chat/${channelId}`
      );
      setData(response.data.data);
      console.log(
        "===================================== response " + response
      );
    } catch (error) {
      console.error("채팅 리스트 뽑아보기 에러", error);
    }
  };

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
    if (!channelId) return;

    fetchChatData();

    const sockJs = new SockJS(`${process.env.REACT_APP_API_URL}/websocket`);
    socket.current = Stomp.over(sockJs, { debug: false });

    socket.current.connect({}, function (frame) {
      console.log("Connected: " + frame);

      stompSocket.subscribe(
        `/topic/msg/${channelId}`,
        function (msg) {
          console.log(msg);
          const result = JSON.parse(msg.body);
          if (newMessage !== null) {
            console.log(result.chat);
            setData((prevData) => [...prevData, result.chat]);
          }
        }
      );
    });

    return () => stompSocket.disconnect(() => {});
  }, [channelId, newMessage]); // 의존성 배열에 newMessage 추가

  if (!channelId) return <ChatEmpty />;

  return (
    <div className="flex w-full flex-col h-full">
      {/* 채널명 */}
      <div className="h-[50px] font-bold text-xl flex pl-5 items-center bg-[#D9D9D9] border-y-[1px] border-black justify-between">
        <div>서브방 이름</div>
        {/* 우측 사이드 닫힘 / 열림 */}
        <Button
          variant={"icon"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {isOpen ? <ChevronsRight /> : <ChevronsLeft />}
        </Button>
      </div>
      {/* 채팅방 스크롤 바 구역 */}
      <div className="h-3/4 flex items-end ml-3 overflow-y-auto scrollbar-hidden">
        <div className="h-full w-full">
          {data.map((chat) => (
            <ChatItem
              key={chat.chatId}
              content={chat.message}
              member={chat.sender}
              timestamp={"20200"}
            />
          ))}
        </div>
      </div>
      {/* 메시지 입력 */}
      <div className="flex flex-col h-1/4 relative overflow-hidden px-5 py-2 rounded-lg">
        {/* 채팅 번역 스위치 */}
        <div className="flex flex-row-reverse pb-2">
          <Label
            htmlFor="airplane-mode"
            className="font-bold text-2 self-center "
          >
            채팅번역
          </Label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-yellow-400 mr-1" : "bg-gray-400 mr-1"
            } relative inline-flex h-[25px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                enabled ? "translate-x-6" : "translate-x-0"
              } pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
        <div
          className={`flex w-full flex-col h-full ${
            isDragging ? "dragging" : ""
          }`}
        >
          {/* 메시지 입력란 */}
          <Textarea
            className={`w-full h-full resize-none top-3 outline outline-zinc-300 ${
              isMouseOver ? "sparkle" : ""
            }`}
            maxLength="500"
            onKeyPress={enter_event}
            ref={sendMessage}
            placeholder="메시지를 입력하세요."
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
          <div className="absolute right-[5%] bottom-[10%] ">
            {/* 사진 전송 버튼 */}
            <Button
              className="place-self-center"
              onClick={() => onOpen("imageSend")}
            >
              <ImagePlus />
            </Button>
            {/* 메시지 전송 버튼 */}
            <Button
              className="h-8 bg-sky-600 text-white"
              onClick={sendChatMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;