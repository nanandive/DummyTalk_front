import RightBar from "./RightBar";
import LeftBar from "./LeftBar";
import Chat from "./Chat";

function MainPage() {

    return (
        <>
            <div style={{display : "flex"}}>
                <LeftBar />
                <Chat />
                <RightBar />
            </div>
        </>
    )
}

export default MainPage;