import axios from "axios";
import { useRef, useState } from "react";
import { useModal } from "src/components/hooks/use-modal";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { useNavigate } from "react-router-dom";

function CreateServerModal() {
    const navigate = useNavigate();
    const { isOpen, onClose, type } = useModal();
    const [serverName, setServerName] = useState(""); // 서버 이름 상태
    const isModalOpen = isOpen && type === "createServer";

    const fileInputRef = useRef();

    const handleCreateServer = async () => {
        const formData = new FormData();
        formData.append("serverName", serverName);
        if (fileInputRef.current && fileInputRef.current.files[0]) {
            formData.append("file", fileInputRef.current.files[0]);
        }

        try {
            const {
                data: { data },
            } = await axios.post(
                `${process.env.REACT_APP_API_URL}/server/writePro`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(data);
            const serverId = data.id;
            console.log("서버 생성 성공");
            navigate(`/main?server=${serverId}`, {
                replace: true,
                state: serverId,
            });
        } catch (error) {
            console.error("서버 생성 실패: ", error);
        } finally {
            onClose();
        }
    };

    return (
        <>
            <Dialog
                open={isModalOpen}
                onOpenChange={onClose}
            >
                <DialogContent className="bg-white text-black overflow-hidden">
                    <DialogHeader className="px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            서버 생성하기
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500 ">
                            새로운 서버에서 사용할 이름과 <br /> 아이콘을
                            설정해주세요
                        </DialogDescription>
                    </DialogHeader>
                    <div className="gap-1 flex flex-col p-6">
                        <label
                            htmlFor="file"
                            className="flex justify-center"
                        >
                            <img src="./image 29.png"></img>
                        </label>
                        <input
                            hidden
                            type="file"
                            id="file"
                            ref={fileInputRef}
                        />

                        <div className="font-semibold text-left p-2">
                            서버 이름
                        </div>
                        <input
                            style={{
                                backgroundColor: "rgb(233,233,233)",
                                height: "30px",
                            }}
                            className="border-none bg-gray-200 rounded-lg p-2 w-full"
                            type="text"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                        />
                    </div>
                    <DialogFooter className="pr-6">
                        <Button
                            onClick={onClose}
                            className="bg-[#FFED46] font-bold"
                        >
                            뒤로가기
                        </Button>
                        <Button
                            onClick={handleCreateServer}
                            className="bg-lime-300 hover:bg-lime-400 font-bold mr-4"
                        >
                            생성
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CreateServerModal;
