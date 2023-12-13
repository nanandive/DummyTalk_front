import { useState, useEffect } from "react";
import { UserAvatar } from "src/components/user-avatar";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useModal } from "src/components/hooks/use-modal";
import { Button } from "src/components/ui/button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Header() {
    const { onOpen, onClose } = useModal();
    const imageUrl = "./test.png";
    const [serverList, setServerList] = useState([]);

    /* 서버 리스트 가져오기 */
    useEffect(() => {
        const fetchServers = async () => {
            try {
                const response = await axios.get('http://localhost:9999/server/list');
                setServerList(response.data); // 서버 리스트 설정
                console.log("요청 성공",response)
            } catch (error) {
                console.error('서버 리스트 가져오기 실패', error);
            }
        };

        fetchServers();
    }, []);

    const [page, setPage] = useState(0);
    const slicedData = serverList.length > 6 ? serverList.slice(page, 6 + page) : serverList;

    /* 서버 접속  */
    const navigate = useNavigate();
    const handleServerClick = (serverId) => {
        navigate(`/main?server=${serverId}`);
    };



    return (
        <>
            <header className="text-md font-semibold px-3 flex items-center h-[60px] bg-[#C9A8FF]">
                <div
                    onClick={() => onOpen("settings")}
                    className="w-[200px]"
                >
                    <img
                        className="h-full w-[150px] min-w-[150px] flex items-center"
                        src="/logo.svg"
                        alt=""
                    ></img>
                </div>
                <div className="flex">
                    <div onClick={() => onOpen("createServer")}>
                        <Button
                            className="bg-yellow-600"
                            size="icon"
                        >
                            <Plus />
                        </Button>
                    </div>
                    <button
                        onClick={() =>
                            setPage((pre) => (pre > 0 ? pre - 1 : pre))
                        }
                        style={
                            serverList.length > 6
                                ? {
                                      display: "block",
                                      margin: "0px 5px 0px 20px",
                                  }
                                : { display: "none" }
                        }
                    >
                        <ChevronLeft className={"text-yellow-600"} />
                    </button>

                    {/* 서버 리스트 및  접속 */}
                    <div style={{ display: "flex" }}>
                        {slicedData.map((data, index) => (
                            <div key={index} style={{ marginLeft: "10px" }} onClick={() => handleServerClick(data.id)}>
                                <Button
                                    className="overflow-hidden text-lg font-bold"
                                    size="serverIcon"
                                    variant="serverLink"
                                >
                                    {data.serverName.slice(0, 2)}
                                </Button>
                            </div>
                        ))}
                    </div>


                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        style={
                            serverList.length > 6 && page + 6 != serverList.length
                                ? { display: "block", marginLeft: "15px" }
                                : { display: "none" }
                        }
                    >
                        <ChevronRight className={"text-yellow-600"} />
                    </button>
                </div>
                <div
                    style={{ cursor: "pointer" }}
                    className="h-8 w-8 md:h-8 md:w-8 mr-2 ml-auto"
                    onClick={() => onOpen("members")}
                >
                    <UserAvatar src={imageUrl} />
                </div>
                <div style={{ margin: "0px 20px 0px 10px" }}>김지수</div>
                <Button
                    onClick={() => onOpen("logout")}
                    className="w-[80px] h-[30px] bg-yellow-400 hover:bg-yellow-500 font-bold"
                >
                    로그아웃
                </Button>
            </header>
        </>
    );
}

function LogOut( { setLogOutModal} ){
    const onClickLogOutModal = () => {
        setLogOutModal(false);
    }

    return (
        <div style={{width:"250px", height:"150px",  top:"50%" ,left:"50%", position: "absolute", transform: "translate(-50%, -50%)", border:"1px solid black", borderRadius:"5px", zIndex:"1", backgroundColor:"wserverListte"}}>
            <div style={{fontSize:"20px", fontWeight:"bolder", margin:"15px 15px 15px 25px"}}>
                로그아웃
            </div>
            <div style={{marginLeft:"25px"}}>
                정말로 로그아웃하시겠어요?
            </div>
            <div style={{margin:"10px 0px 0px 25px", display:"flex"}}>
                <div style={{width:"80px", height:"30px", cursor:"pointer", marginRight:"30px", border:"1px solid black", textAlign:"center", borderRadius:"5px", paddingTop:"2px"}} onClick={ () => onClickLogOutModal()}>
                    취소
                </div>
                <div style={{background:"red", width:"80px", height:"30px", textAlign:"center", paddingTop:"3px", borderRadius:"5px", color:"wserverListte"}}>
                    로그아웃
                </div>
            </div>
        </div>
    )
}

function UserModal({setModal}){

    const onClickClose = () =>{
        setModal(false)
    }

    return (
        <div style={{width: "520px", height:"360px", top:"50%" ,left:"50%", border:"1px solid rgb(128,128,128)", position: "absolute", borderRadius:"5px", transform: "translate(-50%, -50%)", background:"wserverListte", zIndex:"1", backgroundColor:"wserverListte"}}>
            {/* 상단바 */}
            <div style={{display:"flex"}}>
                <div style={{height:"45px", fontSize:"24px", fontWeight:"bolder", margin:"40px 0px 0px 50px"}}>
                    회원정보수정
                </div>
                <div onClick={() => onClickClose()} style={{margin:"20px 25px 0px auto", fontSize:"30px", fontWeight:"bolder", cursor:"pointer"}}>
                    <X/>
                </div>
            </div>
            <div style={{display:"flex", margin:"30px 0px 0px 45px"}}>
                {/* 정보 수정*/}
                <div style={{width:"280px"}}>
                    <input type={"text"} placeholder={"변경할 닉네임"} style={{paddingLeft:"3px", border:"1px solid rgb(128,128,128)", width: "250px", height:"30px", borderRadius:"5px"}}/>
                    <input type={"text"} placeholder={"변경할 비밀번호"} style={{paddingLeft:"3px", border:"1px solid rgb(128,128,128)", width: "250px", height:"30px", marginTop:"25px", borderRadius:"5px"}}/>
                    <input type={"text"} placeholder={"변경할 비밀번호 확인"} style={{paddingLeft:"3px", border:"1px solid rgb(128,128,128)", width: "250px", height:"30px",  marginTop:"25px", borderRadius:"5px"}}/>
                    <select placeholder={"국가선택"} style={{paddingLeft:"3px",border:"1px solid rgb(128,128,128)", width: "250px", height:"30px", marginTop:"25px", borderRadius:"5px"}}>
                        <option value="" disabled selected serverListdden>국가선택</option>
                        <option value="국가1">국가1</option>
                        <option value="국가2">국가2</option>
                        <option value="국가3">국가3</option>
                    </select>
                </div>
                {/* 이미지 등록 및 확인 버튼*/}
                <div style={{marginTop:"-25px"}}>
                    <img src="./image 29.png"></img>
                    <div style={{cursor:"pointer", textAlign:"center", borderRadius:"5px", width:"100px", height:"40px", backgroundColor:"#FFED46",
                        fontWeight:"bolder", paddingTop:"8px", margin:"45px 0px 0px 25px"}}>
                        수정
                    </div>
                </div>
            </div>
        </div>
    )
}

function CreateServer( {setCreateModal} ){

    const onClickClose = () =>{
        setCreateModal(false)
    }

    return (
        <div
            style={{
                width: "500px",
                height: "450px",
                border: "1px solid black",
                top: "50%",
                left: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                background: "wserverListte",
                zIndex: "1",
            }}
        >
            <div
                onClick={() => onClickClose()}
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
                type={"text"}
            />
            <div style={{ display: "flex", margin: "20px 0px 0px 50px" }}>
                <div
                    onClick={() => onClickClose()}
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

export { Header };
