import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";

const ChatHeader = ({ isOpen, setOpen }) => {
    return (
        <div className="h-[50px] font-bold text-xl flex pl-5 items-center bg-[#D9D9D9] border-y-[1px] border-black justify-between">
            <div>서브방 이름</div>
            {/* 우측 사이드 닫힘 / 열림 */}
            <Button
                variant={"icon"}
                onClick={() => setOpen((prev) => !prev)}
            >
                {isOpen ? <ChevronsRight /> : <ChevronsLeft />}
            </Button>
        </div>
    );
};
export default ChatHeader;
