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
import {useModal} from "src/components/hooks/use-modal";
import {callPostCheck, callPostEmail, callPostMail} from "src/api/UserAPICalls";

export const FindPasswordModal = () =>{

    const { isOpen, onOpen, onClose, type, data } = useModal();
    const [userEmail, setUserEmail] = useState('');
    const [userSubmit, setUserSubmit] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');

    const isModalOpen = isOpen && type === "findPassword";

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const onClickPostEmail = () =>{
        dispatch(callPostEmail({
            email:email
        }))
    }

    const onClickMail = () =>{
        dispatch(callPostMail(userEmail))
    }

    const onClickCheck = () =>{
        dispatch(callPostCheck(userSubmit))
    }

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCheckdChange = (e) => {
        setCheck(e.target.value);
    };


    const handleSubmitChange = (e) => {
        const regex =
            /^[0-9]+$/
        if (regex.test(e.target.value) || e.target.value === '')
            setUserSubmit(e.target.value);
    };

    return(
        <Dialog
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        비밀번호 찾기
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        <div>
                            <div>이메일 주소를 입력해주시길 바랍니다.</div>
                            <div className={"flex"}>
                                <input type="text" value={userEmail}
                                       onChange={handleEmailChange}
                                       className='w-[85%] border-2 h-[30px] font-normal mb-3'/>
                                <button onClick={onClickMail} className='w-[15%]'> 전송 </button>
                            </div>
                            <div>인증번호 확인 </div>
                            <div className={"flex"}>
                                <input type="text" value={userSubmit}
                                      onChange={handleSubmitChange}
                                      className='w-[85%] border-2 h-[30px] font-normal mb-3'/>
                                <button onClick={onClickCheck} className={'w-[15%]'}> 확인 </button>
                            </div>
                            <div>
                                <div>변경하실 비밀번호를 입력해주시길 바랍니다.</div>
                                <div className={"flex"}>
                                    <input type="text" value={password}
                                           onChange={handlePasswordChange}
                                           className='w-[100%] border-2 h-[30px] font-normal'/>
                                </div>
                                <div>비밀번호 확인</div>
                                <div className={"flex"}>
                                    <input type="text" value={check}
                                           onChange={handleCheckdChange}
                                           className='w-[100%] border-2 h-[30px] font-normal'/>
                                </div>
                                <Button className='hover:bg-amber-500 bg-amber-400 font-semibold text-sm text-black'>
                                    확인
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

