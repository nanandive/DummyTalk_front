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
import ToggleSwitch from "./ToggleSwitch";

const ChatInput = ({ userInfo }) => {
    const [enabled, setEnabled] = useState(false); // 채팅번역 기능
    const [summary, setSummary] = useState(false); // 채팅 요약기능
    const { socket, isConnected } = useSocket();
    const { onOpen } = useModal();
    const query = useUrlQuery();
    const channelId = query.get("channel");
    const user = useSelector((state) => state.userReducer);
    const { updateData } = useChatData();
    const sendMessageRef = useRef(null);

    const getLastMessageId = () => {
        // Retrieve and return the last message's ID
        // Placeholder implementation - replace with your actual logic
    };

    const handleChatSummarySwitch = async () => {
        console.log(!summary);
        setSummary(prev => !prev);

        const chat_id = getLastMessageId(); // Replace with your actual method to get chat_id

        if (chat_id && channelId) {
            try {
                await axios.post(`http://yourserver.com/api/endpoint`, {
                    channelId,
                    chat_id
                });
                console.log("Chat summary request sent successfully");
            } catch (error) {
                console.error("Chat summary request failed: ", error);
            }
        }
    };

    const summaryData = async () => {
        // Logic for handling summary data
        try {
            const response = await axios.post(`http://localhost:8000.com/api/summary`, {
                channelId: channelId,
                // Add other necessary data here
            });
            console.log("Summary data fetched successfully:", response.data);
            // Handle the response data
        } catch (error) {
            console.error("Failed to fetch summary data:", error);
        }
    };

    useEffect(() => {
        if (!channelId || !isConnected || !userInfo) return;

        const subscription = socket.subscribe(
            `/topic/msg/${channelId}`,
            async (msg) => {
                let result = JSON.parse(msg.body);
                console.log("result:", result);

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

    useEffect(() => {
        if (!summary) return;
        summaryData();
    }, [summary]);

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
                <Label htmlFor="summary-switch" className="font-bold text-2 self-center ">
                    채팅요약
                </Label>
                <Switch
                    id="summary-switch"
                    checked={summary}
                    onClick={handleChatSummarySwitch}
                    className={`${summary ? "bg-yellow-400 mr-1" : "bg-gray-400 mr-1"} relative inline-flex h-[25px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span aria-hidden="true" className={`${summary ? "translate-x-6" : "translate-x-0"} pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                </Switch>
                <ToggleSwitch />
            </div>

            {/* 채팅 번역 스위치 */}
            <div className="flex flex-row-reverse pb-2">
                <Label
                    htmlFor="translation-switch"
                    className="font-bold text-2 self-center "
                >
                    채팅번역
                </Label>
                <Switch
                    id="translation-switch"
                    checked={enabled}
                    onClick={() => {
                        console.log(!enabled);
                        setEnabled((prev) => !prev);
                    }}
                    className={`${enabled ? "bg-yellow-400 mr-1" : "bg-gray-400 mr-1"} relative inline-flex h-[25px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${enabled ? "translate-x-6" : "translate-x-0"} pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
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