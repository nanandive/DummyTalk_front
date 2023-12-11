import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModalProvider } from "src/components/providers/modal-provider";
import "./App.css";
import Layout from "./layouts/layout";
import {useEffect} from "react";
import {io} from "socket.io-client";

function App() {

    useEffect(() => {
        const socket = io('http://localhost:9999'); // 서버의 주소에 맞게 변경

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        // 서버로 메시지 전송
        socket.emit('send-message', 'Hello, Server!');

        // 서버로부터 메시지 수신
        socket.on('messages', (message) => {
            console.log('Received message from server:', message);
        });

        return () => {
            socket.disconnect(); // 컴포넌트가 언마운트되면 소켓 연결 해제
        };
    }, []);

    return (
        <>
            <ModalProvider />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/main"
                        element={<Layout />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
