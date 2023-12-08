import Chat from "src/layouts/Chat/chat";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

function MainPage() {

    return (
        <>
            <div className="flex h-[92vh]">
                <LeftBar />
                {/* 추후 outlet 사용 밑은 테스트*/}
                <Chat />
                <RightBar />
            </div>
        </>
    )
}

export default MainPage;