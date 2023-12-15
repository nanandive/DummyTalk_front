const ChatEmpty = () => {

    const ChatEmptyImg = "./dum.png";

    return (
        <div className="h-full w-full">
            <div className="h-1/2 w-1/2 flex flex-col">
                <img className="" src={ChatEmptyImg} alt="채팅이 없습니다." />
                <p>채팅을 시작해보세요!</p>
            </div>
        </div>
    );
}

export default ChatEmpty;