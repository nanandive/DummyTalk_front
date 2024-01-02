import LeftSideBar from "src/layouts/LeftSide/left-side-bar";
import LeftSide from "src/layouts/LeftSide/leftSide";
import Chat from "../layouts/chat/Chat";

function MainPage() {
    return (
        <>
            <div className="flex h-full bg-[#0b1725]">
                <LeftSideBar />

                <LeftSide />
                <Chat />
            </div>
        </>
    );
}

export default MainPage;
