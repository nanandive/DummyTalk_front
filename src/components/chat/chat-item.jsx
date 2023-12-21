import {cn} from "src/lib/utils";
import {UserAvatar} from "../user-avatar";
import {format} from "date-fns";
import moment from "moment";

const ChatItem = ({chat, name}) => {

    const REACT_FILE_PATH = "http://localhost:3000"

    // console.log(chat.type)
    const timestamp = chat && moment(chat.timestamp).format("YYYY.MM.DD HH:mm:ss");

    return chat && (
        <div className="relative group flex items-center hover:bg-black/5 p-2 transition w-full">
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
                        {chat?.type === "TEXT" ? chat.message : null }
                    </p>
                    {chat.type === "IMAGE" && (
                        <a
                            // href={chat.message}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                            <img
                                src={REACT_FILE_PATH+"/images/"+"0d7c3a5d-8bfb-4460-a993-c5b1fe238d43_스크린샷 2023-12-17 004312.png"}
                                alt={chat.message}
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
            {/* {canDeleteMessage && (
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
            )} */}
        </div>
    );
};
export default ChatItem;
