import { useState } from "react";
import Chat from "./Chat";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import axios from "axios";


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