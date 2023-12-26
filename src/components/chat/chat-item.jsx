import {cn} from "src/lib/utils";
import {UserAvatar} from "../user-avatar";
import moment from "moment";
import {useMemo, useState} from "react";
import {decodeJwt} from "src/lib/tokenUtils";
import axios from "axios"; // Import css


const ChatItem = ({chat, channel, name}) => {

    const accessToken = localStorage.getItem("accessToken");
    const {sub} = useMemo(() => decodeJwt(accessToken), [accessToken]);

    const [context, setContext] = useState(false);
    const [xyPosition, setxyPosition] = useState({x: 0, y: 0});

    const showNav = (e) => {
        e.preventDefault();
        setContext(false);

        if (chat.sender.sender !== +sub) return;

        const {clientX, clientY} = e;
        setxyPosition({x: clientX, y: clientY});
        setContext(true);
    };

    const hideContext = (event) => {
        setContext(false);
    };

    console.log(chat)

    const [chosen, setChosen] = useState();
    const deleteRequest = async (chosen) => {

        console.log(chat.chatId, chat.channelId)
        await axios.post(
            `${process.env.REACT_APP_API_URL}/chat/del/${channel}/${chat.chatId}`
        ).then((res) => {
            if (res.status === 200) {
                setChosen(chosen);
            }
        }).catch((err) => {
            console.log(err);
        })

    }


    const timestamp = chat && moment(chat.timestamp).format("YYYY.MM.DD HH:mm:ss");

    if (chat?.type === "DELETE") return null;


    return chat && (
        <div className="relative group flex items-center hover:bg-black/5 p-2 mt-1 transition w-full bg-gray-200 bg-opacity-50 rounded-[3px]"
             onContextMenu={showNav}
             onClick={hideContext}
        >
            {context && (
                <div className={`absolute top-[${xyPosition.y}px] left-[${xyPosition.x}px]`}>
                    <div onClick={deleteRequest}>
                        삭제
                    </div>
                </div>
            )}
            {chosen ? <h4>메시지가 삭제되었습니다.</h4> :
                <div className="group flex gap-x-2 items-start w-full">

                    <div className="cursor-pointer hover:drop-shadow-md transition">
                        <UserAvatar src={chat.sender.userImgPath}/>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center">
                                <p className="font-semibold texet-sm hover:underline cursor-pointer">
                                    {chat.sender.nickname || name}
                                </p>
                                {/* <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip> */}
                            </div>
                            <span className="text-xs text-zinc-500">
                            {timestamp}
                        </span>
                        </div>
                        <p
                            className={cn(
                                "text-sm text-zinc-600 whitespace-pre-wrap"
                            )}
                        >
                            {chat?.type === "TEXT" ? chat.message : null}
                        </p>
                        {chat.type === "IMAGE" && (
                            <a
                                // href={chat.message}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                            >
                                <img
                                    alt={chat.message}
                                    src={chat.message}
                                    className="w-full h-full object-cover"
                                />
                            </a>
                        )}

                        {/* {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}
                            className='flex items-center w-full gap-x-2 pt-2'
                            >
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className='flex-1'>
                                            <FormControl>
                                                <div className='relative w-full'>
                                                    <Input
                                                        className='p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200'
                                                        placeholder="Edited message"
                                                        disabled={isLoading}
                                                        autoFocus
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isLoading} size="sm" variant="primary">
                                    Save
                                </Button>
                                <span className='text-[10px] mt-1 text-zinc-400'>
                                    Press escape to cancel, enter to save
                                </span>
                            </form>
                        </Form>
                    )} */}
                    </div>
                </div>
            }
            {/*{canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit
                                onClick={() => setIsEditing(true)}
                                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 darkk:hover:text-zinc-300 transition"
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="Deletet">
                        <Trash
                            onClick={() => onOpen('deleteMessage', {
                                apiUrl: `${socketUrl}/${id}`,
                                query: socketQuery
                            })}
                        className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 darkk:hover:text-zinc-300 transition" />
                    </ActionTooltip>
                </div>
            )}*/}

        </div>
    );
}

export default ChatItem;
