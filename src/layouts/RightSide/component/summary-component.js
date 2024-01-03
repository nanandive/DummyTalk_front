import axios from "axios";
import {useEffect, useState} from "react";


const SummaryComponent = ({channelId}) => {
    const [summary, setSummary] = useState(false)
    const [summaryFiles, setSummaryFiles] = useState([]);

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


    const [downloadUrl, setDownloadUrl] = useState(null);

    const downloadSummary = () => {
        if (!summary) return;

        //Blob 객체 생성
        const blob = new Blob([summary], {type: 'text/plain'});

        if (downloadUrl) URL.revokeObjectURL(downloadUrl);

        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
    }

    useEffect(() => {
        if(!channelId) return;
        downloadSummary();
    }, [channelId]);

    return (
        <div className="w-full">
            {summaryFiles.map((file, index) => (
                <div key={index}>
                    <a href={`${process.env.REACT_APP_FASTAPI_URL}/static/${file}`} target="_blank"
                       rel="noopener noreferrer">
                        {file}
                    </a>
                </div>
            ))}
        </div>
    )
}

export default SummaryComponent;