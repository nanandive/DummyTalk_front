import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { Button } from "src/components/ui/button";
import CellComponent from "src/layouts/RightSide/component/CellComponent";
import colors from "tailwindcss/colors";


const RightBar = ({isOpen}) => {

    const [hasInitialized, setHasInitialized] = useState(false);
    const [search, setSearch] = useState('Image');
    const topRef = useRef(null);
    const bottomRef = useRef(null);
    const [ searchText , setSearchText ] = useState('')

    const query = useUrlQuery();
    const channelId = query.get("channel");
    const [summary, setSummary] = useState('')
    const [summaryFiles, setSummaryFiles] = useState([]);


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

    const [searchQuery, setSearchQuery] = useState("");

    const imageSearchRequest = async () => {
        console.log("searchQuery", searchQuery);

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_FASTAPI_URL}/textImageSearch/${channelId}/${searchQuery}`// FastAPI 엔드포인트로 변경
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


    const enter_event = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            imageSearchRequest();
        }
    };

    /* 요약 파일 불러오기 */
    const fetchSummaryFiles = async () => {
        try {
            console.log(`요청: http://localhost:8000/${channelId}/summaryFiles`);
            const response = await axios.get(` ${process.env.REACT_APP_FASTAPI_URL}/${channelId}/summaryFiles`);
            console.log("서버 응답: ", response.data);
            setSummaryFiles(response.data.files);
        } catch (error) {
            console.error("요약 파일 목록 불러오기 실패: ", error);
        }
    };

    const onClickSummary = async () => {
        await fetchSummaryFiles();
    };

    const [downloadUrl, setDownloadUrl] = useState(null);

    const downloadSummary = () => {
        if(!summary) return;

        //Blob 객체 생성
        const blob = new Blob([summary],{type: 'text/plain'});

        if(downloadUrl) URL.revokeObjectURL(downloadUrl);

        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
    }

    useEffect(() => {
        downloadSummary();
    }, [summary]);


    console.log("updateData", updateData)

    const onClickImage = () =>{
        setSearch("Image")
    }
    const onClickText = () =>{
        setSearch("Text")
    }


    return (
        <div className="h-full w-[40%] flex flex-col">
            <div class="h-[60px] min-h-[60px] w-[your-width] font-bold text-md flex pl-5 items-center border-b-[1px] border-black justify-between text-zinc-400 " style={{color: '#51CBB6'}}>
                <div>검색</div>
            </div>
            <div style={{display:"flex"}}>
                <label style={{color : "white"}} htmlFor="radioImage">
                    <input onClick={onClickImage} type="radio" id="radioImage" name="search" value="이미지"/> 이미지
                </label>
                <label style={{color : "white"}} htmlFor="radioText">
                    <input onClick={onClickText} type="radio" id="radioText" name="search" value="텍스트" /> 텍스트
                </label>
                <label style={{color : "white"}} htmlFor="radioSummary">
                    <input onClick={onClickSummary} type="radio" id="radioSummary" name="search" value="요약"/> 요약
                </label>
            </div>
            <div className="relative h-10">
                {search == "Image" ?
                    <input
                        type="text"
                        value={searchQuery}
                        onKeyDown={enter_event}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="이미지를 검색해주세요"
                        className="border-2 border-gray-300 rounded-md p-2 mb-10 ml-5 mr-5 w-96 bg-right-8 bg-center bg-no-repeat bg-contain"
                        ref={topRef}
                    />
                    :
                    <input
                        type="text"
                        value={searchText}
                        onKeyDown={enter_event}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="텍스트를 검색해주세요"
                        className="border-2 border-gray-300 rounded-md p-2 mb-10 ml-5 mr-5 w-96 bg-right-8 bg-center bg-no-repeat bg-contain"
                    />
                }
                <Button
                    className="border-none absolute right-[5%] bottom-[10%] top-[5%]"
                    onClick={imageSearchRequest}
                >
                    <Search/>
                </ Button>
            </div>
            { search == "Image" ?
                <div className="flex-grow mx-3 mt-10 overflow-y-auto scrollbar-hidden relative">
                    <CellComponent updateData={ updateData || false }/>
                </div>
                :
                <div style={{color:"white" }}>
                    텍스트 검색의 결과물이 들어갈 자리 입니다.
                </div>
            }
            <div ref={bottomRef}></div>
            {/*<div className= "border border-white w-full h-full p-3 text-white bg-[#6E6E6E] ">*/}
            {/*    */}
            {/*</div>*/}
            {search === "summary" && (
                <div className="overflow-y-auto">
                    {summaryFiles.map((file, index) => (
                        <div key={index}>
                            <a href={`${process.env.REACT_APP_FASTAPI_URL}/static/${file}`} target="_blank" rel="noopener noreferrer">
                                {file}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RightBar;