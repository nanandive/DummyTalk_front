const ChatEmpty = () => {

    const ChatEmptyImg = "./dum.png";

    return (
        <div className="h-full w-full">
                <img className="w-3/4 h-auto"  src={ChatEmptyImg} alt="채팅이 없습니다." />
            <div className="flex flex-col">
                <p>채팅을 시작해보세요!</p>
            </div>
        </div>
    );
}

export default ChatEmpty;