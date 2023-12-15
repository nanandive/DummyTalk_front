import { useModal } from "src/components/hooks/use-modal";
import { Button } from "src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "src/components/ui/dialog";

function LogOutModal() {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === "logout";

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="px-6 flex flex-col gap-5">
                    <DialogTitle className="text-2xl text-center font-bold">
                        로그아웃
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 flex flex-col items-center justify-center">
                        <div style={{ marginLeft: "25px" }}>
                            정말로 로그아웃하시겠어요?
                        </div>
                        <div
                            className="mt-[20px] ml-[25px] flex gap-5"
                        >
                            <Button className="hover:bg-amber-500 bg-amber-400 font-semibold text-sm text-black w-[80px]" onClick={onClose}>
                                취소
                            </Button>
                            <Button
                                className="bg-red-400 hover:bg-red-500 font-semibold text-sm text-black w-[80px]"
                                
                            >
                                로그아웃
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default LogOutModal;
