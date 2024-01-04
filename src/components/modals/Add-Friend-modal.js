import { useModal } from "../../components/hooks/use-modal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "src/components/ui/dialog";
import { Button } from "../../components/ui/button";
import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {callGetFriendRequest, callPostFriend} from "../../api/MainAPICalls";
import {useSocket} from "src/components/hooks/use-socket";
import {jwtDecode} from "jwt-decode";

import axios from "axios";


const AddFriendModal = () => {

    const [email, setEmail] = useState("");
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const dispatch = useDispatch();

    const { socket, isConnected } = useSocket();
    const isModalOpen = isOpen && type === "addFriend";

    const accessToken = window.localStorage.getItem('accessToken');
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;


    useEffect(() => {
        if (!isConnected ) return;
        socket.subscribe(`/topic/friend`, (msg) => {
            dispatch(callGetFriendRequest())
            }
        );
        socket.subscribe(`/topic/friend/${decodedToken.sub}`, (msg) => {
            alert(msg.body)
            }
        );

    }, [isConnected]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        console.log(email);
    };

    const onClickAddFriend = () => {
        // dispatch(
        //     callPostFriend({
        //         email: email,
        //     })
        // );
        socket.send(`/app/friend/${decodedToken.sub}`, JSON.stringify({email : email}), {})
        onClose();
    };

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        친구추가
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        이메일을 입력하여 상대방을 친구 목록에 추가할 수
                        있습니다!
                    </DialogDescription>
                </DialogHeader>
                {/* 정보 수정*/}
                <input
                    onChange={handleEmailChange}
                    className="w-[100%] border-2 h-[30px] font-normal"
                />
                <DialogFooter>
                    <Button
                        onClick={onClickAddFriend}
                        className="hover:bg-amber-500 bg-amber-400 font-semibold text-sm text-black"
                    >
                        추가
                    </Button>
                    <Button
                        className="bg-red-400 hover:bg-red-500 font-semibold text-sm text-black"
                        onClick={onClose}
                    >
                        취소
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddFriendModal;
