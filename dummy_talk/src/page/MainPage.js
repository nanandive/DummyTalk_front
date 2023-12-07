import RightBar from "./RightBar";
import LeftBar from "./LeftBar";
import Chat from "./Chat";
import {Outlet} from "react-router-dom";

function MainPage() {

    return (
        <>
            <div style={{display:"flex", height:"92vh"}}>
                <LeftBar />
                {/* 추후 outlet 사용 밑은 테스트*/}
                <Chat />
                <RightBar />
            </div>
        </>
    )
}

export default MainPage;