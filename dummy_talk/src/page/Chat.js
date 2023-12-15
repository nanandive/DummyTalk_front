import {Switch} from "@headlessui/react";
import {ChevronLeft, ChevronsLeft, ChevronsRight, icons, ImagePlus} from "lucide-react";
import {useEffect, useState} from "react";
import ChatItem from "src/components/chat/chat-item";
import {Button} from "src/components/ui/button";
import {Label} from "src/components/ui/label";
import {Textarea} from "src/components/ui/textarea";
import {useModal} from "src/components/hooks/use-modal";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import {useUrlQuery} from "src/components/hooks/use-url-query";
import axios from "axios";
import ChatEmpty from "src/components/chat/ChatEmpty";
import {json} from "react-router-dom";

function Chat({isOpen, setOpen}) {
    const query = useUrlQuery()
    const [channelId, setChannel] = useState(1);
    // const channelId = query.get("channel")
    // isOpen, setOpen 오른쪽 사이드바

    const [enabled, setEnabled] = useState(false); // 채팅번역 기능
    const [data, setData] = useState([]);
    const {onOpen, onClose} = useModal();
    const [sendMessage, setSendMessage] = useState('');

    const [messages, setMessages] = useState([]);
    const SOCKET_HOST = 'http://localhost:9999/websocket';
    const sock = new SockJS(SOCKET_HOST); // 소켓 연결 'http://localhost:9999/websocket'
    const socket = Stomp.over(sock);
    const USERREPLY = '/topic/' + channelId; // 구독할 주소 ['/topic/'+ channelId]
    const WEBSOCKLOGIN = '/app/message/' + channelId;  // 메시지 전송할 주소 [`/app/message/'+ channelId]


    // 메시지를 입력할 때마다 메시지를 업데이트
    const handleChange = (e) => {
        console.log(e);
        setSendMessage(e.target.value);
    };

    // 엔터키 눌렀을 때 메시지 전송
    const enter_event = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            console.log('엔터 키 눌림');
            e.preventDefault();
            // 메세지 전송 이벤트 추가 예정

            console.log('메시지 전송:', sendMessage);
            // 메시지를 전송한 후에 메시지를 초기화
            setSendMessage('');
            console.log(sendMessage);
        }
    }

    // 이미지 전송
    const imageSend = () => {
        // 이미지 전송 이벤트 추가 예정
        console.log('imageSend');
    }


    const fetchChatData = async () => {
        // const { id } = useParams();
        try {
            const response = await axios.get(`http://localhost:9999/channel/chat/1`);
            console.log(response);
            setData(response.data.data);
            console.log("===================================== response.data.data ")

            console.log(response.data.data);
            console.log("===================================== data ")
            console.log(data);
        } catch (error) {
            console.error("채팅 리스트 뽑아보기 에러", error);
        }
    }

    useEffect(() => {
        fetchChatData();
    }, []);

    console.log(data)

    /***
     * 1. 채팅방 입장시 채팅방의 채팅 리스트를 불러온다.
     * - 채팅 리스트는 채팅방 입장시 한번만 불러온다.
     * - userId, channelId, message, language, timestamp, page
     * -- @RequestBody : { SendChatDto : sender, message, language, channelId }
     * -- @DestinationVariable : channelId
     * -- @Header : UserId
     * -- @RequestParam : page
     * endpoint : /websocket
     * subscribe : /topic/{channelId}
     * send : /app/message/{channelId}
     */
    console.log('socket =====================================: ' + socket)
    socket.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        socket.subscribe(USERREPLY, function (msg) {
            console.log('msg : ' + msg);
            // setMessages((prevMessages) => [...prevMessages, newMessage]);
            // stompClient.disconnect();
        });

        socket.send(WEBSOCKLOGIN, {}, JSON.stringify({
            message: {
                sender: 1,
                message: sendMessage,
                language: "ko",
                channelId: 1
            }
        }));

        // const [subscribe, setubscribe] = useState([]);

    // stomp 옵션 설정
    // const options = {
    //     protocols : ['v12.stomp', 'v11.stomp'],
    //     binary : false,             // true : 바이너리 값 사용 가능
    //     heartbeat : [10000, 10000], // [서버->클라이언트, 클라이언트->서버] ms
    //     debug : true               // true : 디버깅 모드
    // }

    // const onConnected  = (frame) => {
    //     console.log('Connected ===================================== ' + frame);
    //
    //     socket.subscribe('/topic/msg', function (msg) {
    //         console.log('msg : ' + msg);
    //         const newMessage = JSON.parse(msg.body);
    //         setMessages((prevMessages) => [...prevMessages, newMessage]);
    //     });
    //
    //     // return () => {
    //     //     // Cleanup and disconnect websocket when component unmounts
    //     //     socket.disconnect();
    //     // };
    // }

    //******************************* 소켓 통신 *******************************//



    // useEffect(() => {
    //
    //     const SOCKET_HOST = 'http://localhost:9999/websocket';
    //     const socket = Stomp.over(new SockJS(SOCKET_HOST));
    //
    //
    //     console.log('socket =====================================: ' + socket)
    //
    //     socket.connect({}, function (frame) {
    //         console.log('Connected ===================================== frame: ' + frame);
    //         socket.subscribe(USERREPLY, function (msg) {
    //             console.log('msg : ' + msg);
    //             // setMessages((prevMessages) => [...prevMessages, newMessage]);
    //             // stompClient.disconnect();
    //         });
    //         // socket.subscribe(WEBSOCKLOGIN);
    //         socket.send(WEBSOCKLOGIN, {
    //             sender: 1,
    //             message: sendMessage,
    //             language: "ko",
    //             channelId: 1
    //         });
    //     });
    //     const onMessage = (msg) => {
    //         console.log('msg =====================================: ', msg);
    //         const newMessage = JSON.parse(msg.body);
    //         setMessages((prevMessages) => [...prevMessages, newMessage]);
    //     }
    //
    //     // const onConnected = () => {
    //     //     console.log('Connected ===================================== ');
    //     //     socket.subscribe(USERREPLY, onMessage);
    //     //     socket.subscribe(WEBSOCKLOGIN);
    //     //     socket.send(WEBSOCKLOGIN, {
    //     //             "sender": 1,
    //     //             "message": "test message",
    //     //             "language": "ko",
    //     //             "channelId": 1
    //     //         }
    //     //     );
    //     // }
    //     const onError = (err) => console.error('Alarm Websocket - Error', err);
    //
    //     // message: {'"sender": 1,"message": "test message","language": "ko"}',channelId: 1});
    //     // socket.connect({}, function (frame) {
    //     //     console.log('Connected ===================================== ');
    //     //     socket.subscribe(USERREPLY, onMessage);
    //     //     socket.subscribe(WEBSOCKLOGIN);
    //     //     socket.send(WEBSOCKLOGIN, {
    //     //         sender: 1,
    //     //         message: sendMessage,
    //     //         language: "ko",
    //     //         channelId: 1
    //     //     } );
    //     // }, onError);
    //
    //     return () => {
    //         // Cleanup 함수에서 disconnect를 호출하여 컴포넌트가 unmount 될 때 WebSocket을 닫을 수 있도록 합니다.
    //         console.log('Disconnected ===================================== ');
    //         socket.disconnect();
    //     };
    // }, []); // channelId가 변경될 때마다 useEffect가 다시 실행


    // socket.send(`/app/message`, {"message": message, "channelId": channelId}, JSON.stringify({}));

    return (
        messages.length === 0 ? <ChatEmpty/> : (
            <div className="flex w-full flex-col h-full">
                {/* 채널명 */}
                <div
                    className="h-[50px] font-bold text-xl flex pl-5 items-center bg-[#D9D9D9] border-y-[1px] border-black justify-between">
                    <div>
                        서브방 이름
                    </div>
                    {/* 우측 사이드 닫힘 / 열림 */}
                    <Button variant={"icon"} onClick={() => setOpen(prev => !prev)}>
                        {isOpen ? <ChevronsRight/> : <ChevronsLeft/>}
                    </Button>

                </div>
                {/* 채팅방 스크롤 바 구역 */}
                <div className="h-3/4 flex items-end ml-3 overflow-y-auto scrollbar-hidden">
                    <div className="h-full w-full">
                        {messages.map((chat) => (
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
                    {/* 메시지 입력란 */}
                    <Textarea className="w-full h-full resize-none top-3 outline outline-zinc-300"
                              maxLength="500"
                              onChange={handleChange}
                              onKeyPress={enter_event}
                              value={sendMessage}
                              placeholder="메시지를 입력하세요."/>
                    <div className="absolute right-[5%] bottom-[10%] ">
                        {/* 사진 전송 버튼 */}
                        <Button
                            className="place-self-center"
                            onClick={() => onOpen('imageSend')}>
                            <ImagePlus/>
                        </Button>
                        {/* 메시지 전송 버튼 */}
                        <Button className="h-8 bg-sky-600 text-white">Send</Button>
                    </div>
                </div>
            </div>
        ));
}


export default Chat;
