import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
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
import "./css/ChannelModal.css";

const CreateChannelModal = () => {
    const navigate = useNavigate();
    const { data, isOpen, onClose, type } = useModal();
    const { serverId } = data;
    const isModalOpen = isOpen && type === "createChannel";
    const [channelName, setChannelName] = useState("");

    const handleInputChange = (e) => {
        setChannelName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/channel/writePro1`,
                formData
            );
            setChannelName('')
            onClose();

            navigate(`/main?server=${serverId}`, {
                replace: true,
                state: uuid(),
            });
        } catch (error) {
            console.log("채널 생성 실패");
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
                            채널 생성
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500 ">
                            새로운 채널에서 사용할 이름과 <br /> 형식을
                            설정해주세요
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        className="gap-1 flex flex-col p-6"
                        onSubmit={handleSubmit}
                    >
                        <label
                            htmlFor="channelName"
                            className="font-semibold text-left p-2"
                        >
                            채널 이름
                        </label>
                        <input
                            id="channelName"
                            name="channelName"
                            className="border-none bg-gray-200 rounded-lg p-2 w-full h-8"
                            type="text"
                            value={channelName}
                            onChange={handleInputChange}
                        />
                        <div className="font-semibold text-left p-2">형식</div>
                        <select
                            name="channelType"
                            className="text-xs border-none h-8 bg-gray-200 rounded-lg p-2 w-full"
                            defaultValue="TEXT"
                        >
                            <option value="TEXT">텍스트</option>
                            <option value="VOICE">1대1 음성</option>
                        </select>
                        <input type="hidden" name="serverId" value={serverId} />
                        <DialogFooter className="mt-3">
                            <Button
                                onClick={onClose}
                                className="bg-rose-500 hover:bg-rose-400 text-white font-bold"
                            >
                                취소
                            </Button>
                            <Button className="bg-indigo-500 text-white hover:bg-indigo-500/90">
                                생성
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateChannelModal;
