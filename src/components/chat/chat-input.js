import { Switch } from "@headlessui/react";
import axios from "axios";
import { ImagePlus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { Textarea } from "src/components/ui/textarea";
import { useChatData } from "../hooks/use-chat-data";
import { useModal } from "../hooks/use-modal";
import { useSocket } from "../hooks/use-socket";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const ChatInput = ({ userInfo }) => {
    const [enabled, setEnabled] = useState(false); // 채팅번역 기능
    const { socket, isConnected } = useSocket();
    const { onOpen } = useModal();
    const query = useUrlQuery();
    const channelId = query.get("channel");
    const [summary, setSummary] = useState(false); // 채팅 요약기능;

    const user = useSelector((state) => state.userReducer);
    const { updateData } = useChatData();

    const sendMessageRef = useRef(null);
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
    useEffect(() => {
        if (!channelId || !isConnected || !userInfo) return;

        const subscription = socket.subscribe(
            `/topic/msg/${channelId}`,
            async (msg) => {
                let result = JSON.parse(msg.body);
                console.log("result   :", result);

                if (enabled && result.chat.sender !== parseInt(userInfo?.sub)) {
                    const apiUrl = `${process.env.REACT_APP_API_URL}/chat/trans/${userInfo?.national_language}`;
                    const axiosConfig = {
                        url: apiUrl,
                        method: "POST",
                        data: { ...result.chat },
                    };

                    const { data } = await axios(axiosConfig);
                    result = data;
                }

                updateData(result.chat);
            }
        );
        return () => subscription.unsubscribe();
    }, [enabled, isConnected, channelId, socket, userInfo]);

    /* 채팅 요약 */
    const summaryData = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/chatdata/summary`,
                {
                    channelId: channelId,
                }
            );
            console.log("summary 요청 성공 : ", channelId);
        } catch (error) {
            console.log("summary 요청 실패 : ", error, channelId);
        }
    };
    useEffect(() => {
        if (!summary) return;
        summaryData();
    }, [summary]);

    // 엔터키 눌렀을 때 메시지 전송
    const enter_event = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    };

    const sendChatMessage = useCallback(() => {
        if (!isConnected || sendMessageRef.current?.value === "" || !userInfo)
            return;

        socket.send(
            `/app/${channelId}/message`,
            // `/app/audioMessage` //오디오로 담는부분
            JSON.stringify({
                message: sendMessageRef.current?.value,
                sender: userInfo?.sub,
                nickname: user?.nickname,
                channelId,
                type: "TEXT",
            })
        );
        sendMessageRef.current.value = "";
    }, [channelId, isConnected, socket, userInfo]);

    return (
        <div className="flex flex-col mt-auto relative overflow-hidden px-5 pb-2 rounded-lg">
            {/* 채팅 요약 스위치 */}
            <div className="flex flex-row-reverse pb-2">
                <Label
                    htmlFor="airplane-mode"
                    className="font-bold text-2 self-center "
                >
                    채팅요약
                </Label>
                <Switch
                    id={"airplane-mode"}
                    checked={summary}
                    onClick={() => {
                        console.log(!summary);
                        setSummary((prev) => !prev);
                    }}
                    className={`${
                        summary ? "bg-yellow-400 mr-1" : "bg-gray-400 mr-1"
                    } relative inline-flex h-[25px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${
                            summary ? "translate-x-6" : "translate-x-0"
                        } pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
            </div>

            {/* 채팅 번역 스위치 */}
            <div className="flex flex-row-reverse pb-2">
                <Label
                    htmlFor="airplane-mode"
                    className="font-bold text-2 self-center "
                >
                    채팅번역
                </Label>
                <Switch
                    id={"airplane-mode"}
                    checked={enabled}
                    onClick={() => {
                        console.log(!enabled);
                        setEnabled((prev) => !prev);
                    }}
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
            {/* 메시지 입력란 */}
            <Textarea
                className="w-full h-full resize-y top-3 outline outline-zinc-300 bg-[#f2f3f5] bg-opacity-10 text-[#DBDEE1] font-semibold"
                maxLength="150"
                onKeyDown={enter_event}
                ref={sendMessageRef}
                placeholder="메시지를 입력하세요."
            />
            <div className="absolute right-[5%] bottom-[10%] ">
                {/* 사진 전송 버튼 */}
                <Button
                    className="absolute right-[95%] bottom-[-20%] border-none"
                    onClick={() =>
                        onOpen("imageSend", { channelId, socket, isConnected })
                    }
                >
                    <ImagePlus />
                </Button>
                {/* 메시지 전송 버튼 */}
                <Button
                    className="h-8 bg-sky-600 text-white "
                    onClick={sendChatMessage}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};
export default ChatInput;
