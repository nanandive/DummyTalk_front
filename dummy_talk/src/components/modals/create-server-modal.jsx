import { X } from "lucide-react";
import { useModal } from "src/components/hooks/use-modal";
import axios from "axios";
import {useState} from "react";

function CreateServerModal() {
    const { isOpen, onClose, type } = useModal();
    const [serverName, setServerName] = useState(''); // 서버 이름 상태
    const isModalOpen = isOpen && type === "createServer";

    const handleCreateServer = async () => {
        try {
            const data = new URLSearchParams();
            data.append('serverName', serverName); // 서버 이름을 URLSearchParams 객체에 추가

            // 백엔드 서버의 URL을 포함하여 요청을 보냅니다.
            await axios.post('http://localhost:9999/server/writePro', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            console.log("서버 생성 성공");
            onClose(); // 모달 닫기
        } catch (error) {
            console.error("서버 생성 실패: ", error);
        }
    };

    return (
        <div
            style={{
                display: isModalOpen ? "block" : "none",
                width: "500px",
                height: "500px",
                border: "1px solid black",
                top: "50%",
                left: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                background: "white",
                zIndex: "1",
            }}
        >
            <div
                onClick={onClose}
                style={{ margin: "20px 20px -20px 450px", cursor: "pointer" }}
            >
                <X />
            </div>
            <div
                style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "30px",
                }}
            >
                서버 생성하기
            </div>
            <div
                style={{
                    textAlign: "center",
                    marginTop: "15px",
                    fontSize: "20px",
                    color: "gray",
                }}
            >
                새로운 서버에서 사용할 이름과 <br /> 아이콘을 설정해주세요
            </div>
            <div style={{ margin: "20px 180px" }}>
                <img src="./image 29.png"></img>
            </div>
            <div style={{ margin: "30px 0px 0px 50px", fontWeight: "550" }}>
                서버 이름
            </div>
            <input
                style={{
                    marginLeft: "50px",
                    backgroundColor: "rgb(233,233,233)",
                    width: "400px",
                    height: "25px",
                }}
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
            />

            <div style={{ display: "flex", margin: "20px 0px 0px 50px" }}>
                <div
                    onClick={onClose}
                    style={{
                        cursor: "pointer",
                        width: "80px",
                        height: "30px",
                        fontWeight: "bolder",
                        paddingTop: "5px",
                    }}
                >
                    뒤로가기
                </div>
                <div
                    onClick={handleCreateServer}
                    style={{
                        cursor: "pointer",
                        textAlign: "center",
                        borderRadius: "5px",
                        width: "80px",
                        height: "30px",
                        backgroundColor: "#FFED46",
                        fontWeight: "bolder",
                        paddingTop: "5px",
                        margin: "0px 50px 0px auto",
                    }}
                >
                    생성
                </div>
            </div>
        </div>
    );
}

export default CreateServerModal