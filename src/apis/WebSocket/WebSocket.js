import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client'

function WebSocketComponent(props) {
    useEffect(() => {
        const socket = new SockJS('http://localhost:9999/websocket');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            // 예시: 메시지 구독
            stompClient.subscribe('/topic/messages', function (message) {
                console.log(JSON.parse(message.body).content);
                // 여기서 메시지 처리 로직 구현
            });
        });

        return () => {
            stompClient.disconnect();
            console.log("Disconnected");
        };
    }, []);

    return <></>; 
}

export default WebSocketComponent;
