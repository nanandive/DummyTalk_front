import { ScrollArea } from "src/components/ui/scroll-area";

function Chat() {

    return (
        <div className="flex w-full flex-col h-full">
            <div className="bg-amber-500 h-[10%] p-6">서브방 이름</div>
            <ScrollArea className="h-[70%] w-full rounded-md border">
                <div className="h-[70%] p-5 flex flex-col mt-auto">
                    <div className='w-full box-border h-32 p-4 border-4'>
                    채팅 텍스트 1
                    </div>
                    <div className=""></div>
                    <div className="">
                        right
                        <div className="">date</div>
                        <div className="">text</div>
                    </div>

                </div>
            </ScrollArea >
            <div className='message_area h-[22%]'>
                
            </div>
        </div>
    )
}

export default Chat;