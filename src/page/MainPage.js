import LeftBar from "../layouts/MainLayout/LeftBar";
import Chat from "../layouts/chat/Chat";


function MainPage() {
    return (
        <>
            <div className="flex h-[92vh]">
                <LeftBar />
                <Chat />
            </div>
        </>
    )
}

export default MainPage