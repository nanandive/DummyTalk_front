import ChatItem from "src/components/chat/chat-item";
import { Button } from "src/components/ui/button";
import { ScrollArea } from "src/components/ui/scroll-area";
import { Separator } from "src/components/ui/separator";
import { Textarea } from "src/components/ui/textarea";

function Chat() {
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
            content: "TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, TEST, ",
        },
    ];

    return (
        <div className="flex w-full flex-col h-full">
            <div className=" h-[9%] font-bold text-xl pl-8 flex items-end">서브방 이름</div>
            <Separator className="bg-slate-400 mt-5" />
            <div>
                <ScrollArea className="h-[76%] w-full ">
                    <div className="p-5 flex flex-col">
                        {
                            members.map((mem) => <ChatItem key={mem.id} member={mem} content={mem.content} timestamp={"2022"} />
                            )}

                    </div>
                </ScrollArea >
            </div>
            <div className="w-full h-[175px] relative overflow-hidden flex px-5 py-2 rounded-lg">
                <Textarea className="ml-[] w-full h-full resize-none top-3  outline outline-zinc-300" placeholder="Type your message here." />
                <Button className="absolute right-[5%] bottom-[10%]  bg-sky-600 text-white" >Send</Button>
            </div>
        </div>
    )
}

export default Chat;