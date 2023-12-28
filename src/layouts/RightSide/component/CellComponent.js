import React, {useEffect, useState} from "react";
import {useUrlQuery} from "src/components/hooks/use-url-query";
import axios from "axios";
import FileDownload from 'react-file-download';


const CellComponent = ({searchQuery}) => {

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const [data, setData] = useState('');
    const [renderImage, setRenderImage] = useState(null);

    const imageListRequest = async (channelId) => {

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/img/list/${channelId}`
            );
            setData(response.data.data);

            console.log("이미지 response ", response.data);
        } catch (error) {
            console.error("이미지 리스트 뽑아보기 에러", error);
        }
    }

    useEffect(() => {

        if (!channelId || searchQuery) return null;
        imageListRequest(channelId);

    }, [channelId, searchQuery]);

    function displayImage(img) {

        const binaryString = atob(img.fileBlob);

        // binaryString을 ArrayBuffer로 변환
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }

        const newBlob = new Blob([arrayBuffer], { type: img.contentType });
        // Blob을 img 태그로 변환하여 화면에 표시
        return URL.createObjectURL(newBlob);
    }

    const handleDownload = (img) => {
        const binaryString = atob(img.fileBlob);

        // binaryString을 ArrayBuffer로 변환
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }

        // react-file-download 라이브러리를 사용하여 파일 다운로드
        FileDownload(arrayBuffer, img.originalFileName, img.contentType);
    };

    if (data?.length === 0) return null;

    return data && (
        <div className="grid grid-cols-3 gap-5">
            {data.length === 0 ? null : data.map((img, index) => (
                <div key={index} className="relative aspect-w-3 aspect-h-4" onClick={(e)=> handleDownload(img)}>
                    <img
                        src={displayImage(img)}
                        alt={`Image ${index}`}
                        className="w-full h-full object-cover object-center rounded-md"
                    />
                </div>
            ))}
        </div>
    );
}

export default CellComponent;