import axios from "axios";
import {Search} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {useUrlQuery} from "src/components/hooks/use-url-query";
import {Button} from "src/components/ui/button";
import CellComponent from "src/layouts/RightSide/component/CellComponent";
import TextSearchComponent from "src/layouts/RightSide/component/text-search-component";
import SummaryComponent from "src/layouts/RightSide/component/summary-component";


const RightBar = ({isOpen}) => {

    const topRef = useRef(null);
    const bottomRef = useRef(null);

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const [ hasInitialized, setHasInitialized ] = useState(false);
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ updateData, setUpdateData ] = useState([]);
    const [ textResponse, setTextResponse ] = useState([]);
    const [ chose, setChose ] = useState(['']);

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

    const imageSearchRequest = async () => {
        try {
            const response = await axios.get(
                ` ${process.env.REACT_APP_FASTAPI_URL}/uploadImage/${channelId}/${searchQuery}`// FastAPI 엔드포인트로 변경
            );
            console.log("Response from FastAPI: ", response);
            if (response.status === 200) {
                setUpdateData(response.data.similar_images); // 데이터 설정
                setSearchQuery(""); // 검색창 초기화
            }
        } catch (error) {
            console.error("Error in fetching data", error);
        }
    }

    const textSearchRequest = async () => {
        try {

            const response = await axios.get(
                ` ${process.env.REACT_APP_FASTAPI_URL}/api/search/text/${channelId}/${searchQuery}`// FastAPI 엔드포인트로 변경
            );

            console.log("Response from FastAPI: ", response);

            if (response.status === 200) {
                setTextResponse(response.data.chat);
                setSearchQuery("");
            }

        } catch (error) {
            console.error("Error in fetching data", error);
        }
    }

    const searchRequest = async () => {
        console.log("searchQuery", searchQuery);

        if (searchQuery === "" || chose === "summary" ) return;

        if (chose === "image") imageSearchRequest();

        if (chose === "text") textSearchRequest();
    }

    const enter_event = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            searchRequest();
        }
    };

    console.log("chose: ", chose);

    return (
        <div className="h-full w-[40%] flex flex-col">
            <div
                className="h-[60px] min-h-[60px] w-full font-bold text-md flex pl-5 items-center border-b-[1px] border-black justify-between text-zinc-400 bg-[your-color]">
                <div>보관함</div>
            </div>
            <div className="flex mt-2">
                <input
                    onClick={() => setChose("image")} type="radio" id={"image"} value="이미지" name="searchOption"
                    className="mr-2"
                />
                <label className="mr-4 text-white" htmlFor="image">
                    이미지
                </label>
                <input
                    onClick={() => setChose("text")} type="radio" id={"text"} name="searchOption"
                    className="mr-2"
                />
                <label className="mr-4 text-white" htmlFor="text">
                    텍스트
                </label>
                <input
                    onClick={() => setChose("summary")} type="radio" id={"summary"} name="searchOption"
                    className="mr-2 "
                />
                <label className="text-white" htmlFor="summary">
                    요약
                </label>
            </div>
            {chose !== "summary" ?
                <div className="relative h-10 w-full">
                    <input
                        type="text"
                        value={searchQuery}
                        onKeyDown={enter_event}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="검색어를 입력하세요."
                        className="border-2 border-gray-300 rounded-md p-2 mb-10 mx-5 w-[90%] bg-right-8 bg-center bg-no-repeat bg-contain"
                        ref={topRef}
                    />
                    <Button
                        className="border-none absolute right-[5%] bottom-[10%] top-[5%]"
                        onClick={searchRequest}
                    >
                        <Search/>
                    </ Button>
                </div>
                : null
            }
            <div className="border-amber-600 border-4 w-full flex-grow mt-10 px-3 overflow-y-auto scrollbar-hidden relative">
                {chose === "image" ? (
                    <CellComponent updateData={ updateData || false}/>
                ) : chose === "text" ? (
                    <TextSearchComponent text={ textResponse }/>
                ) : chose === "summary" ? (
                    <SummaryComponent channelId={channelId || false}/>
                ) : null
                }
            </div>
            <div ref={bottomRef}></div>
        </div>
    );
}

export default RightBar;