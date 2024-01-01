import LeftSideBar from "src/layouts/LeftSide/left-side-bar";
import LeftBar from "../layouts/MainLayout/LeftBar";
import Chat from "../layouts/chat/Chat";

function MainPage() {
    return (
        <>
            <div className="flex h-full bg-[#0b1725]">
                <LeftSideBar />

                <LeftBar />
                <Chat />
            </div>
        </>
    );
}

export default MainPage;
