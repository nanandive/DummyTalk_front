import axios from "axios";


    // 메시지 리스트
const fetchChatData = async () => {
    // const { id } = useParams();

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/channel/chat/1`);
        console.log(response);
        return response.data;
    }catch (error) {
        console.error("채팅 리스트 뽑아보기 에러", error);
    }
}


export default fetchChatData;