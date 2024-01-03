import {Button} from "src/components/ui/button";
import {Search} from "lucide-react";
import {useRef, useState} from "react";
import axios from "axios";
import {useUrlQuery} from "src/components/hooks/use-url-query";


const TextSearchComponent = () => {
    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [updateData, setUpdateData] = useState([]);
    const query = useUrlQuery()
    const channelId = query.get("channel")
    const topRef = useRef()
    const imageSearchRequest = async () => {
        console.log("searchQuery", searchQuery);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/search/text/${channelId}/${searchQuery}`// FastAPI 엔드포인트로 변경
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

    return (
        <>
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
                    onClick={imageSearchRequest}
                >
                    <Search/>
                </ Button>
            </div>
            <div className="text-search-component">
            </div>
        </>
    )
}

export default TextSearchComponent;