import React from 'react';
import './ChatEmpty.css'; // Make sure to import the CSS file

const ChatEmpty = () => {
    const ChatEmptyImg = "./dum.png";

    return (
        <div className="chat-empty-container">
            <img className="chat-empty-img" src={ChatEmptyImg} alt="채팅이 없습니다." />
            <h1 className="chat-start-text">
                {Array.from("click  channel").map((char, index) => (
                    <span key={index}>{char}</span>
                ))}
            </h1>
        </div>
    );
}

export default ChatEmpty;
