import { Switch } from "@headlessui/react";
import {ChevronLeft, ChevronsLeft, ChevronsRight, ImagePlus} from "lucide-react";
import { useState } from "react";
import ChatItem from "src/components/chat/chat-item";
import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";
import { Textarea } from "src/components/ui/textarea";

function Chat({ isOpen, setOpen }) {
    const [text, setText] = useState("기본 글");
    const [enabled, setEnabled] = useState(false); // 채팅번역 기능

    const members = [
        {
            id: 1,
            profile: {
                name: "John Doe",
                imageUrl: "./test.png",
            },
            role: "admin",
            content: "hello, My name is John Doe. What's your name?",
        },
        {
            id: 2,
            profile: {
                name: "Jane Smith",
                imageUrl: "./logo192.png",
            },
            role: "member",
            content: "John Smith",
        },
        {
            id: 3,
            profile: {
                name: "John Doe",
                imageUrl: "./test.png",
            },
            role: "admin",
            content:
                "TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, ",
        },
    ];

    function message_enter_event(e) {
        setText(e.target.value);
    }

    // setEnabled()

    function stream_e(){
        console.log(enabled);
        if (enabled === true){
            const openMediaDevices = async (constraints) => {
                return await navigator.mediaDevices.getUserMedia(constraints);
            }
            try {
                const stream = openMediaDevices({'video':true,'audio':true});
                console.log('Got MediaStream:', stream);
            } catch(error) {
                console.error('Error accessing media devices.', error);
            }


            // navigator.permissions.query({name: 'camera'})
            //     .then((permissionObj) => {
            //         console.log(permissionObj.state);
            //         return permissionObj.state === 'granted';
            //     })
            //     .catch((error) => {
            //         console.log('Got error :', error);
            //         return false;
            //     })
        }
    }






    return (
        <div className="flex w-full flex-col h-full">
            <div className="h-[50px] font-bold text-xl flex pl-5 items-center bg-[#D9D9D9] border-y-[1px] border-black justify-between">
                <div>
                    서브방 이름
                </div>
                <Button variant={"icon"} onClick={ () => setOpen(prev => !prev)}>
                    {isOpen ? <ChevronsRight /> : <ChevronsLeft />}
                </Button>

            </div>
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
                    {members.map((mem) => (
                        <ChatItem
                            key={mem.id}
                            member={mem}
                            content={mem.content}
                            timestamp={"2022"}
                        />
                    ))}
                    {members.map((mem) => (
                        <ChatItem
                            key={mem.id}
                            member={mem}
                            content={mem.content}
                            timestamp={"2022"}
                        />
                    ))}
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
            <div className="flex flex-col h-1/4 relative overflow-hidden px-5 py-2 rounded-lg">
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
                <Textarea
                    className="w-full h-full resize-none top-3 outline outline-zinc-300"
                    // maxlength="500"
                    onChange={message_enter_event}
                    placeholder="메시지를 입력하세요."
                />
                <div className="absolute right-[5%] bottom-[10%] ">
                    <Button>
                        <ImagePlus className="place-self-center" />
                    </Button>
                    <Button className="h-8 bg-sky-600 text-white">Send</Button>
                </div>
            </div>
        </div>
    );
}

export default Chat;