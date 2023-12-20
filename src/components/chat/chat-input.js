import { ImagePlus } from "lucide-react";
import { forwardRef, useCallback, useRef } from "react";
import { useModal } from "../hooks/use-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useSocket } from "../providers/sock-provider";

const ChatInput = ({ enabled, setEnabled, channelId, userInfo }) => {
    const { onOpen, onClose } = useModal();
    const { socket, isConnected } = useSocket();

    const sendMessage = useRef(null);

    // 엔터키 눌렀을 때 메시지 전송
    const enter_event = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    };

    const sendChatMessage = useCallback(() => {
        if (!isConnected) return;

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
    }, [channelId, sendMessage, isConnected]);

    return (
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
                    id={"airplane-mode"}
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
            {/* 메시지 입력란 */}
            <textarea
                className="w-full h-full resize-none top-3 outline outline-zinc-300"
                maxLength="500"
                onKeyPress={enter_event}
                ref={sendMessage}
                placeholder="메시지를 입력하세요."
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
    );
};
export default ChatInput;
