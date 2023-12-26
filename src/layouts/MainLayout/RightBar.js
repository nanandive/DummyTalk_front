import React, {useEffect, useRef, useState} from "react";
import CellComponent from "src/layouts/RightSide/component/CellComponent";


const RightBar = ({isOpen}) => {

    const [hasInitialized, setHasInitialized] = useState(false);
    const topRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        const topDiv = topRef?.current;
        const bottomDiv = bottomRef?.current;

        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }

            if (!topDiv) {
                return false;
            }

            const distanceFromBottom =
                topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <= 100;
        };

        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth",
                });
            }, 100);
        }
    }, [topRef, hasInitialized]);

    const [searchQuery, setSearchQuery] = useState("");



    return (
        <div className="h-full w-[40%] flex flex-col">
            <div className="h-10">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="이미지를 검색해주세요"
                    className="border-2 border-gray-300 rounded-md p-2 mb-10 ml-5 mr-5 w-96 bg-right-8 bg-center bg-no-repeat bg-contain"
                    ref={topRef}
                />
            </div>
            <div className="h-[85%] flex items-end mx-3 mt-10 overflow-y-auto scrollbar-hidden relative">
                <CellComponent searchQuery={searchQuery} />
            </div>
            <div ref={bottomRef}></div>
        </div>
    );
}

export default RightBar;