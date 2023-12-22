import {useModal} from "../../components/hooks/use-modal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "src/components/ui/dialog";
import {Button} from "../../components/ui/button";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {callPostFriend} from "../../api/MainAPICalls";

const AddFriendModal = () =>{


    const [email, setEmail] = useState('');
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const dispatch = useDispatch();

    const isModalOpen = isOpen && type === "addFriend";

    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
        console.log(email)
    }

    const onClickAddFriend = () =>{
        dispatch(callPostFriend({
            email:email
        }))
    }


    return(
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
                        <div>
                            {/* 정보 수정*/}
                            <div>
                                이메일을 입력하여 상대방을 친구 목록에 추가할 수 있습니다!
                            </div>
                            <input onChange={handleEmailChange} className='w-[100%] border-2 h-[30px] font-normal'/>
                            <div>
                                <Button onClick={onClickAddFriend} className='hover:bg-amber-500 bg-amber-400 font-semibold text-sm text-black'>
                                    추가
                                </Button>
                                <Button className='bg-red-400 hover:bg-red-500 font-semibold text-sm text-black' onClick={onClose}>
                                    취소
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddFriendModal;