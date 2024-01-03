import {
    ChevronDown,
    LogOut,
    PlusCircle,
    Settings,
    TrashIcon,
    UserPlus,
    Users,
} from "lucide-react";
import { decodeJwt } from "src/lib/tokenUtils";
import { useModal } from "../hooks/use-modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ChannelHeader = ({ server }) => {
    const { onOpen } = useModal();
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = decodeJwt(accessToken);
    const ADMIN = server.userId.toString()

    console.log(server);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className="focus:outline-none"
            >
                <button className="w-full h-[60px] text-md text-zinc-400 font-semibold px-3 flex items-center border-b-[1px] border-black hover:bg-zinc-700/10 transition">
                    서버 이름
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 text-xs font-medium text-neutral-400 space-y-[2px] bg-[#112033]">
                <DropdownMenuItem
                    onClick={() => onOpen("invite")}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                >
                    유저 초대
                    <UserPlus className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen("editServer")}
                    className="px-3 py-2 text-sm cursor-pointer"
                >
                    서버 설정
                    <Settings className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen("members")}
                    className="px-3 py-2 text-sm cursor-pointer"
                >
                    유저 관리
                    <Users className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() =>
                        onOpen("createChannel", { serverId: server.id })
                    }
                    className="px-3 py-2 text-sm cursor-pointer"
                >
                    채널 생성
                    <PlusCircle className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {userInfo.sub === ADMIN && (
                    <DropdownMenuItem
                        onClick={() => onOpen("deleteServer")}
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        서버 삭제
                        <TrashIcon className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {userInfo.sub !== ADMIN && (
                    <DropdownMenuItem
                        onClick={() => onOpen("leaveServer")}
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        서버 나가기
                        <LogOut className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default ChannelHeader;
