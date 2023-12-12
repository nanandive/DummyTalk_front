import { Switch } from "@headlessui/react";
import {ChevronLeft, ChevronsLeft, ChevronsRight, ImagePlus} from "lucide-react";
import {useEffect, useState} from "react";
import ChatItem from "src/components/chat/chat-item";
import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";
import { Textarea } from "src/components/ui/textarea";
import {useModal} from "src/components/hooks/use-modal";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

function Chat({ isOpen, setOpen }) {

    // isOpen, setOpen 오른쪽 사이드바

    const [enabled, setEnabled] = useState(false); // 채팅번역 기능
    const [message, setMessage] = useState(''); // 메시지 입력
    const { onOpen, onClose } = useModal()

    const members = [   // 채팅방 임시 멤버
        {
            id: 1,
            profile: {
                name: "John Doe",
                imageUrl: "./test.png",
            },
            role: "admin",
            content: "hello, My name is John Doe. What's your name?",
        }
    ];

    //********************* 소켓 통신 *********************//
    const [subscribe, setSubscribe] = useState(null);

    // stomp 옵션 설정
    const SOCKET_HOST = 'http://localhost:9999/websocket';
    const options = {
        protocols : ['v12.stomp', 'v11.stomp'],
        binary : false,             // true : 바이너리 값 사용 가능
        heartbeat : [10000, 10000], // [서버->클라이언트, 클라이언트->서버] ms
        debug : false               // true : 디버깅 모드
    }


    const sock = new SockJS(SOCKET_HOST); // 소켓 연결 'http://localhost:9999/websocket'
    const stompClient = Stomp.over(sock, options);

    stompClient.connect({}, function (frame) {
        // console.log('Connected: ' + frame);

        setSubscribe(
            stompClient.subscribe('/topic/msg', function (msg) {
                console.log('msg : ' + msg);
                // setMessages((prevMessages) => [...prevMessages, newMessage]);
                stompClient.disconnect();
            })
        );
        // stompClient.send(`/app/message`, {}, JSON.stringify( 'name': '유저 이름' "content": message})
    });



    return subscribe && (

        <div className="flex w-full flex-col h-full">
            {/* 채널명 */}
            <div
                className="h-[50px] font-bold text-xl flex pl-5 items-center bg-[#D9D9D9] border-y-[1px] border-black justify-between">
                <div>
                    서브방 이름 {subscribe}
                </div>
            </div>
            {/* 채팅방 스크롤 바 구역 */}
            <div className="h-3/4 flex items-end ml-3 overflow-y-auto scrollbar-hidden">
                <div className="h-full w-full">
                    {members.map((mem) => (
                        <ChatItem
                            key={mem.id}
                            member={mem}
                            content={mem.content}
                            timestamp={"2022"}
                        />
                    ))}
                </div>
            </div>
            {/* 메시지 입력 */}
            <div className="flex flex-col h-1/4 relative overflow-hidden px-5 py-2 rounded-lg">
                {/* 메시지 입력란 */}
                <Textarea className="w-full h-full resize-none top-3 outline outline-zinc-300"
                          maxLength="500"
                          onChange={handleChange}
                          onKeyPress={enter_event}
                          value={message}
                          placeholder="메시지를 입력하세요."/>
                <div className="absolute right-[5%] bottom-[10%] ">
                    {/* 메시지 전송 버튼 */}
                    <Button className="h-8 bg-sky-600 text-white">Send</Button>
                </div>
            </div>
        </div>
    );

}

export default Chat;
