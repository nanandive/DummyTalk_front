import LeftBar from "./LeftBar";
import Chat from "./Chat";
import RightBar from "./RightBar";
import {useState} from "react";


function MainPage() {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <div className="flex h-[92vh]">
                <LeftBar />
                <Chat isOpen={isOpen} setOpen={ setOpen } />
                { isOpen && (<div className="flex w-[35%]">
                    <RightBar />
                </div>)}
            </div>
        </>
    )
}

export default MainPage;