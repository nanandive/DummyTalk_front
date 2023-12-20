import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const SocketContext = createContext({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const sockJs = new SockJS(`${process.env.REACT_APP_API_URL}/websocket`);
        const stomp = Stomp.over(sockJs, { debug: false });

        stomp.connect({}, function (frame) {
            console.log("Connected: " + frame);

            setIsConnected(true);
        });

        setSocket(stomp);
        return () => stomp.disconnect(() => {});
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
