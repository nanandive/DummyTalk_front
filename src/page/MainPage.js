import { useState } from "react";
import Chat from "../layouts/chat/Chat";
import LeftBar from "../layouts/MainLayout/LeftBar";
import RightBar from "../layouts/MainLayout/RightBar";


function MainPage() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <div className="flex h-[92vh]">
                <LeftBar />
                <Chat isOpen={isOpen} setOpen={setOpen} />
                {isOpen && <RightBar />}
            </div>
        </>
    )
}

export default MainPage