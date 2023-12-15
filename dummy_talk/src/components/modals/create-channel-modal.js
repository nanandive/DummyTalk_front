// ChannelModal.js
import React, { useEffect, useState } from "react";
import { useModal } from "src/components/hooks/use-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateChannelModal = () => {
    const navigate = useNavigate()
    const { data, isOpen, onClose, type } = useModal();
    const { serverId } = data;
    const isModalOpen = isOpen && type === "createChannel";
    const [channelName, setChannelName] = useState("");

    const handleInputChange = (e) => {
        setChannelName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("channelName", channelName);
        formData.append("serverId", serverId);

        try {
            await axios.post(
                "http://localhost:9999/channel/writePro",
                formData
            );

            console.log("채널 생성 성공");
            console.log(">>>> " + formData.serverId);
        } catch (error) {
            console.log("채널 생성 실패");
        }

        navigate(0)
        onClose();
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
                <form onSubmit={handleSubmit}>
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
                </form>
            </div>
        </div>
    );
};

export default CreateChannelModal;
