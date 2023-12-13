import LeftBar from "./LeftBar";
import Chat from "./Chat";
import RightBar from "./RightBar";
import {useState} from "react";
import {Outlet} from "react-router-dom";


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