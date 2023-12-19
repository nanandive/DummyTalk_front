// ChannelModal.js
import axios from "axios";
import uuid from "react-uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "src/components/hooks/use-modal";
import "./css/ChannelModal.css";





const CreateChannelModal = () => {
    const navigate = useNavigate();
    const { data, isOpen, onClose, type } = useModal();
    const { serverId } = data;
    const isModalOpen = isOpen && type === "createChannel";
    const [channelName, setChannelName] = useState("");
    const [isFormDataComplete, setIsFormDataComplete] = useState(false);

    const handleInputChange = (e) => {
        setChannelName(e.target.value);
    };


    const handleOneToOneChat = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("channelName", channelName);
        formData.append("serverId", serverId);
        setIsFormDataComplete(channelName && serverId);

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/channel/writePro`,
                formData
            );

            console.log("채널 생성 성공");
            onClose();

            navigate(`/ChatVoice?server=${serverId}`, {
                replace: true,
                state: uuid(),
            });
        } catch (error) {
            console.log("채널 생성 실패");
        } finally {
            onClose();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("channelName", channelName);
        formData.append("serverId", serverId);

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/channel/writePro`,
                formData
            );

            console.log("채널 생성 성공");
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
        <div className="create-channel-modal" style={{ display: isModalOpen ? "block" : "none" }}>
            <div className="create-channel-modal-content">
                <span className="create-channel-modal-close" onClick={onClose}>&times;</span>
                <h2 className="create-channel-modal-header">채널 생성</h2>
                <form className="create-channel-modal-form" onSubmit={handleSubmit}>
                    <label>
                        채널 이름:
                        <input
                            type="text"
                            value={channelName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">생성</button>
                    <button type="button" onClick={handleOneToOneChat}>1:1 번역채팅방</button>
                </form>
            </div>
        </div>
    );
};

export default CreateChannelModal;
