import React, {useEffect, useRef, useState} from "react";
import CellComponent from "src/layouts/RightSide/component/CellComponent";
import {Button} from "src/components/ui/button";
import {Search} from "lucide-react";
import {useUrlQuery} from "src/components/hooks/use-url-query";
import axios from "axios";


const RightBar = ({isOpen}) => {

    const [hasInitialized, setHasInitialized] = useState(false);
    const topRef = useRef(null);
    const bottomRef = useRef(null);

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const [data, setData] = useState([]);

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

    const imageSearchRequest = async () => {
        console.log("searchQuery", searchQuery);

        await axios.get(
            `${process.env.REACT_APP_API_URL}/img/search/${channelId}/${searchQuery}`
        ).then((response) => {
            console.log("이미지 검색 response ", response.data);
            if (response.status === 200) {
                setData(response.data.data);
            }
        }).catch((error) => {
            console.error("이미지 검색 에러", error);
        });

    }

    const enter_event = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            imageSearchRequest();
        }
    };



    return (
        <div className="h-full w-[40%] flex flex-col">
            <div className="relative h-10">
                <input
                    type="text"
                    value={searchQuery}
                    onKeyDown={enter_event}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="이미지를 검색해주세요"
                    className="border-2 border-gray-300 rounded-md p-2 mb-10 ml-5 mr-5 w-96 bg-right-8 bg-center bg-no-repeat bg-contain"
                    ref={topRef}
                />
                <Button
                    className="border-none absolute right-[5%] bottom-[10%] top-[5%]"
                    onClick={imageSearchRequest}
                >
                    <Search/>
                </ Button>
            </div>
            <div className="flex-grow mx-3 mt-10 overflow-y-auto scrollbar-hidden relative">
                <CellComponent data={data}/>
            </div>
            <div ref={bottomRef}></div>
        </div>
    );
}

export default RightBar;