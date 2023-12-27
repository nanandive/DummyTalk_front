import axios from "axios";
import {useMemo, useState} from 'react';
import {useModal} from "src/components/hooks/use-modal";
import {Ban} from "lucide-react";
import { decodeJwt } from "src/lib/tokenUtils";



function InvitedUserModal() {
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);
    const [userEmail, setUserEmail] = useState('');
    const [resignUserEmail, setResignUserEmail] = useState('');
    const {isOpen, onClose, type, data} = useModal();
    const { serverId } = data
    const userId = userInfo.sub;


    const isModalOpen = isOpen && type === "invitedUser";

    const handleInviteUser = async () => {
        if (userEmail) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/server/invitedUser`, {
                    userEmail: userEmail,
                    serverId: serverId
                });
                console.log('초대 성공:', response.data);
                // 초대 성공 후 처리 로직
                onClose();
            } catch (error) {
                console.error('초대 실패:', error);
                // 초대 실패 처리 로직
            }
        }
    };

    const handleKickUser = async () => {
        if (resignUserEmail) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/server/resignUser/${serverId}`, {
                    userEmail: resignUserEmail,
                    userId:userId
                });
                console.log('강퇴 성공:', response.data);
                // 강퇴 성공 후 처리 로직
                onClose();

            } catch (error) {
                console.error('강퇴 실패:', error);
                // 강퇴 실패 처리 로직
            }
            console.log("강퇴 >>>>> ","강퇴할email : ",resignUserEmail,"강퇴하는 사람의 Id", userId,"서버의 Id",serverId )
        }
    };

    const modalStyle = {
        display: isModalOpen ? 'block' : 'none',
    };

    return (
        <div className="modal" style={{...modalStyle}}>
            <div className="modal-content">
                <div className={"flex flex-col"}>
                    <button className={"text-teal-300 ml-auto"} onClick={onClose}><Ban /></button>

                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                           placeholder="user Email"/>
                    <button onClick={handleInviteUser}>사용자 초대</button>
                </div>

                <div className={"flex flex-col"}>
                    <input type="text" value={resignUserEmail} onChange={(e) => setResignUserEmail(e.target.value)}
                           placeholder="user Email"/>
                    <button onClick={handleKickUser}>사용자 강퇴</button>
                </div>
            </div>


        </div>
    );
}

export default InvitedUserModal;