const ChatEmpty = () => {

    const ChatEmptyImg = "./CHATEMPTY.png";

    return (
        <div className="chat__empty">
            <div className="chat__empty__inner">
                <img src={ChatEmptyImg} alt="채팅이 없습니다." />
                <p>채팅을 시작해보세요!</p>
            </div>
        </div>
    );
}

export default ChatEmpty;