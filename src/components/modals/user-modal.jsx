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
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callPostChageUser} from "src/api/MainAPICalls";

function UserModal() {
  const { isOpen, onOpen, onClose, type, data } = useModal();

    const [ nickname, setNickname] = useState('');
    const [ password, setPassword] = useState('');
    const [ check, setCheck] = useState('');
    const [ language, setLanguage] = useState('');
    const [equals, setEquals] = useState(false);
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.chageUserReducer);

    const isModalOpen = isOpen && type === "members";

    const onChangeNickname = (e) =>{
        setNickname(e.target.value)
    }
    const onChangePassword = (e) =>{
        setPassword(e.target.value)
        if(e.target.value == check){
            setEquals(true);
        } else{
            setEquals(false);
        }
    }
    const onChangeCheck = (e) =>{
        setCheck(e.target.value)
        if(e.target.value == password){
            setEquals(true);
        } else{
            setEquals(false);
        }
    }

    const onChangeLanguage = (e) =>{
        setLanguage(e.target.value)
    }

    const onClickChange = () =>{
        if(equals == true){

            const formData = new FormData();
            formData.append("nickname", nickname);
            formData.append("password", password);
            formData.append("language", language);
            if (fileInputRef.current && fileInputRef.current.files[0]) {
                formData.append("file", fileInputRef.current.files[0]);
            }

            dispatch(callPostChageUser(formData))
        } else if (equals == false && !password == ''){
            alert("비밀번호를 확인해주시길 바랍니다.")
        }
    }


    const onClickTest = () =>{
        // console.log("Test", formData.get("file"))
    }
    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="px-6">
                    <DialogTitle onClick={onClickTest} className="text-2xl text-center font-bold">
                        회원정보 수정
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        <div className='flex gap-1 justify-between'>
                            {/* 정보 수정*/}
                            <div className="flex flex-col gap-2 w-4/5 justify-between items-center">
                                <input
                                    onChange={ onChangeNickname }
                                    value={ nickname }
                                    type={"text"}
                                    placeholder={"변경할 닉네임"}

                                />
                                <input
                                    onChange={ onChangePassword }
                                    value={ password }
                                    type={"password"}
                                    placeholder={"변경할 비밀번호"}
                                />
                                <input
                                    onChange={ onChangeCheck }
                                    value={ check }
                                    type={"password"}
                                    placeholder={"변경할 비밀번호 확인"}
                                />
                                <div style={ check == '' ? {display:"none"}  : {display:"block"}}>
                                    {check && check== password ?
                                        <div style={ {color:"green"} }>
                                            일치합니다
                                        </div>:
                                        <div style={ {color:"red"} }>
                                            불일치합니다.
                                        </div>
                                    }
                                </div>
                                <select
                                    placeholder={"국가선택"}
                                    className="pl-1 border border-[#F1F1F1] w-[250px] h-[30px]  rounded-md"
                                    onChange={ onChangeLanguage }
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
                            </div>
                            {/* 이미지 등록 및 확인 버튼*/}
                            <div className='flex flex-col justify-between'>
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
                                <Button onClick = {onClickChange} className='hover:bg-amber-500 bg-amber-400 font-semibold text-sm text-black'>
                                    수정
                                </Button>
                                <Button className='bg-red-400 hover:bg-red-500 font-semibold text-sm text-black' onClick={onClose}>
                                    취소
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default UserModal;
