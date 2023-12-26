import React, { useState, useEffect } from 'react';
import LeftBar from "../layouts/MainLayout/LeftBar";
import Chat from "../layouts/chat/Chat";
import axios from 'axios'; // Assuming you're using axios for HTTP requests

function MainPage() {
    

    return (
        <>
            <div className="flex h-[92vh] bg-[#09182f]">
                <LeftBar />
                <Chat />
            </div>
        </>
    );
}

export default MainPage;