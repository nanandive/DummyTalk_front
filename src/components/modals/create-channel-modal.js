// ChannelModal.js
import axios from "axios";
import uuid from "react-uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "src/components/hooks/use-modal";




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
        <div
            style={{
                display: isModalOpen ? "block" : "none",
                position: "fixed",
                zIndex: 1,
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                overflow: "auto",
                backgroundColor: "rgba(0,0,0,0.4)",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fefefe",
                    margin: "10% auto",
                    padding: "20px",
                    border: "1px solid #888",
                    width: "50%",
                }}
            >
                <span
                    style={{
                        color: "#aaa",
                        float: "right",
                        fontSize: "28px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                    onClick={onClose}
                >
                    &times;
                </span>
                <h2 style={{ textAlign: "center" }}>채널 생성</h2>
                <form onSubmit={handleSubmit} style={{ color: isFormDataComplete ? "green" : "defaultColor" }}>
                    <label style={{ marginBottom: "10px", display: "block" }}>
                        채널 이름:
                        <input
                            type="text"
                            value={channelName}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "8px",
                                margin: "8px 0",
                                boxSizing: "border-box",
                                border: "1px solid black",
                            }}
                        />
                    </label>
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        생성
                    </button>


                    <button
                    type="button" // type을 'button'으로 설정하여 폼 제출을 방지
                    onClick={handleOneToOneChat}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "10px",
                        background: "#2196F3",
                        color: isFormDataComplete ? "white" : "white", // Example color change
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    1:1 번역채팅방
                </button>
                </form>
            </div>
        </div>
    );
};

export default CreateChannelModal;
