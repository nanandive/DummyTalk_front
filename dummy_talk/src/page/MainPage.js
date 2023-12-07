import RightBar from "./RightBar";
import LeftBar from "./LeftBar";
import Chat from "./Chat";
import {Outlet} from "react-router-dom";

function MainPage() {

    return (
        <>
            <div style={{display : "flex"}}>
                {/* 추후 outlet 사용 밑은 테스트*/}
                {/*<Outlet />*/}

                <LeftBar /> 
                <Chat />
                <RightBar />
            </div>
        </>
    )
}

export default MainPage;