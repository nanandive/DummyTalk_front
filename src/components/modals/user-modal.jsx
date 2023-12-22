import { useModal } from "src/components/hooks/use-modal";
import { Button } from "src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "src/components/ui/dialog";

function UserModal() {
    const { isOpen, onOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "members";

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        회원정보 수정
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500"></DialogDescription>
                </DialogHeader>
                <div className="flex gap-1 flex-col justify-between">
                    {/* 정보 수정*/}
                    <div className="flex flex-col gap-2 items-center">
                        <div className="flex items-center justify-between w-full px-4">
                            <div className='gap-3 flex flex-col'>
                                <input
                                    type={"text"}
                                    placeholder={"변경할 닉네임"}
                                />
                                <input
                                    type={"text"}
                                    placeholder={"변경할 비밀번호"}
                                />
                                <input
                                    type={"text"}
                                    placeholder={"변경할 비밀번호 확인"}
                                />
                            </div>

                            <div>
                                <img src="./image 29.png"></img>
                            </div>
                        </div>
                        </div>

                        <select
                            placeholder={"국가선택"}
                            className="pl-1 border border-[#F1F1F1] w-[250px] h-[30px]  rounded-md"
                        >
                            <option
                                value="국가선택"
                                disabled
                                selected
                                hidden
                            >
                                국가선택
                            </option>
                            <option value="국가1">국가1</option>
                            <option value="국가2">국가2</option>
                            <option value="국가3">국가3</option>
                        </select>
                    {/* 이미지 등록 및 확인 버튼*/}
                </div>
                <DialogFooter>
                    <div className="flex gap-3 justify-between">
                        <Button className="hover:bg-amber-500 bg-amber-400 font-semibold text-sm text-black">
                            수정
                        </Button>
                        <Button
                            className="bg-red-400 hover:bg-red-500 font-semibold text-sm text-black"
                            onClick={onClose}
                        >
                            취소
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default UserModal;
