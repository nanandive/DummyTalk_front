import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ChannelHeader = () => {
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

            <DropdownMenuContent className="w-56 text-zinc-400 bg-[#112033]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-black" />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default ChannelHeader;
