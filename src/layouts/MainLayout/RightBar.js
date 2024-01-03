import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { Button } from "src/components/ui/button";
import CellComponent from "src/layouts/RightSide/component/CellComponent";
import colors from "tailwindcss/colors";

const RightBar = ({ isOpen }) => {
    const [hasInitialized, setHasInitialized] = useState(false);
    const [search, setSearch] = useState("Image");
    const topRef = useRef(null);
    const bottomRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [summaries, setSummaries] = useState([]); // 요약 데이터 상태

    const query = useUrlQuery();
    const channelId = query.get("channel");
    const [updateData, setUpdateData] = useState([]);

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
        console.log("searchQuery", searchQuery);

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_FASTAPI_URL}/textImageSearch/${channelId}/${searchQuery}`
            );
            console.log("Response from FastAPI: ", response);
            if (response.status === 200) {
                setUpdateData(response.data.similar_images);
                setSearchQuery("");
            }
        } catch (error) {
            console.error("Error in fetching data", error);
        }
    };

    const enter_event = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            imageSearchRequest();
        }
    };

    // 요약 파일 목록을 가져오는 함수
    const fetchSummaryFiles = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_FASTAPI_URL}/${channelId}/summaryFile`
            );
            const summaryData = response.data;
            console.error("요약 파일 목록 불러오기 성공: ", summaryData);
            setSummaries(summaryData); // 요약 데이터 상태 업데이트
        } catch (error) {
            console.error("요약 파일 목록 불러오기 실패: ", error);
        }
    };

    useEffect(() => {
        fetchSummaryFiles(); // 컴포넌트가 마운트될 때 요약 데이터 가져오기
    }, [channelId]);

    const onClickSummary = () => {
        setSearch("Summary");
    };

    const onClickImage = () => {
        setSearch("Image");
    };

    const onClickText = () => {
        setSearch("Text");
    };

    return (
        <div className="h-full w-[40%] flex flex-col">
            <div className="h-[60px] min-h-[60px] w-[your-width] font-bold text-md flex pl-5 items-center border-b-[1px] border-black justify-between text-zinc-400 " style={{ color: '#51CBB6' }}>
                <div>검색</div>
            </div>
            <div style={{ display: "flex" }}>
                <label style={{ color: "white" }} htmlFor="radioImage">
                    <input onClick={onClickImage} type="radio" id="radioImage" name="search" value="이미지" /> 이미지
                </label>
                <label style={{ color: "white" }} htmlFor="radioText">
                    <input onClick={onClickText} type="radio" id="radioText" name="search" value="텍스트" /> 텍스트
                </label>
                <label style={{ color: "white" }} htmlFor="radioSummary">
                    <input onClick={onClickSummary} type="radio" id="radioSummary" name="search" value="요약" /> 요약
                </label>
            </div>
            <div className="relative h-10">
                {search === "Image" ? (
                    <input
                        type="text"
                        value={searchQuery}
                        onKeyDown={enter_event}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="이미지를 검색해주세요"
                        className="border-2 border-gray-300 rounded-md p-2 mb-10 ml-5 mr-5 w-96 bg-right-8 bg-center bg-no-repeat bg-contain"
                        ref={topRef}
                    />
                ) : (
                    <input
                        type="text"
                        value={searchText}
                        onKeyDown={enter_event}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="텍스트를 검색해주세요"
                        className="border-2 border-gray-300 rounded-md p-2 mb-10 ml-5 mr-5 w-96 bg-right-8 bg-center bg-no-repeat bg-contain"
                    />
                )}
                <Button
                    className="border-none absolute right-[5%] bottom-[10%] top-[5%]"
                    onClick={imageSearchRequest}
                >
                    <Search />
                </Button>
            </div>
            {search === "Image" ? (
                <div className="flex-grow mx-3 mt-10 overflow-y-auto scrollbar-hidden relative">
                    <CellComponent updateData={updateData || false} />
                </div>
            ) : (
                <div style={{ color: "white" }}>
                    텍스트 검색의 결과물이 들어갈 자리 입니다.
                </div>
            )}
            <div ref={bottomRef}></div>

            {/* 요약  */}
            {search === "Summary" && (
                <div id="summary-display">
                    <h2 className="text-white text-center">요약 목록</h2>
                    <ul>
                        {summaries.map((summary) => (
                            <li className="text-white bg-gray-500" key={summary.summary_id}>{summary.summary_text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RightBar;
