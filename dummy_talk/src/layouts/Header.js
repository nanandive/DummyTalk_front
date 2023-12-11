import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useState } from "react";
import { useModal } from "src/components/hooks/use-modal";
import { Button } from "src/components/ui/button";
import { UserAvatar } from "src/components/user-avatar";

function Header() {
    const { onOpen, onClose } = useModal();
    const imageUrl = "./test.png";

    const hi = [
        "1번",
        "2번",
        "3번",
        "4번",
        "5번",
        "6번",
        "7번",
        "8번",
        "9번",
        "10번",
    ];
    // const hi = ["1번", "2번"]

    const [page, setPage] = useState(0);

    const slicedData = hi.length > 6 ? hi.slice(page, 6 + page) : hi;

    return (
        <>
            <header className="text-md font-semibold px-3 flex items-center h-[60px] bg-[#E7DAB8]">
                <div
                    onClick={() => onOpen("settings")}
                    className="w-[200px]"
                >
                    <img
                        className="h-full w-[150px] flex items-center"
                        src="./logo.svg"
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
                            hi.length > 6
                                ? {
                                      display: "block",
                                      margin: "0px 5px 0px 20px",
                                  }
                                : { display: "none" }
                        }
                    >
                        <ChevronLeft className={"text-yellow-600"} />
                    </button>
                    <div style={{ display: "flex" }}>
                        {slicedData.map((data, index) => (
                            <div
                                key={index}
                                style={{ marginLeft: "10px" }}
                            >
                                <Button
                                    className="bg-yellow-600 border-2"
                                    size="icon"
                                >
                                    {data}
                                </Button>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        style={
                            hi.length > 6 && page + 6 != hi.length
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

function CreateServer({ setCreateModal }) {
    const onClickClose = () => {
        setCreateModal(false);
    };

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
                background: "white",
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
