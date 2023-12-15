import axios from "axios";

const {useParams} = require("react-router-dom");
const {useState, useEffect} = require("react");


function ServerDetail() {
    const {id} = useParams();
    const [serverDetails, setServerDetails] = useState();

    useEffect(() => {
        const fetchServerDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/server/${id}`);
                console.log(response)
                setServerDetails(response.data);
            }catch (error) {
                console.error("서버 상세 보기 실패 >>>> ", error);
            }
        }
        fetchServerDetails()
    }, [id]);

    if(!serverDetails) return <div>Loading >>>> 접속 실패 .... </div>

    return(
        <div>
            <h1>{serverDetails.serverName}</h1>
        </div>
    )
}
export default ServerDetail;