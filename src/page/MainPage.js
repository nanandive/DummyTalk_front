import React, { useState, useEffect } from 'react';
import LeftBar from "../layouts/MainLayout/LeftBar";
import Chat from "../layouts/chat/Chat";
import axios from 'axios'; // Assuming you're using axios for HTTP requests

function MainPage() {
    

    return (
        <>
            <div className="flex h-[93.5%] bg-[#0b1725]">
                <LeftBar />
                <Chat />
            </div>
        </>
    );
}

export default MainPage;