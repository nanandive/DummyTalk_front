import React, {useEffect, useState} from "react";
import {useUrlQuery} from "src/components/hooks/use-url-query";
import axios from "axios";
import FileDownload from 'react-file-download';


const CellComponent = ({updateData}) => {

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const [data, setData] = useState('');
    const [renderImage, setRenderImage] = useState(null);

    // console.log("updateData", updateData)

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

        if (!channelId) return null;
        imageListRequest(channelId);

    }, [channelId]);

    const convertBase64 = (file) => {
        const binaryString = atob(file);
        // binaryString을 ArrayBuffer로 변환
        const arrayBuffer = new ArrayBuffer(file.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }

        return uint8Array;
    }

    function displayImage(img) {
        const newBlob = new Blob([convertBase64(img.fileBlob)], {type: img.contentType});
        // Blob을 img 태그로 변환하여 화면에 표시
        return URL.createObjectURL(newBlob);
    }

    const handleDownload = (img) => {
        if (img === null || !img) return null;
        FileDownload(convertBase64(img.fileBlob), img.originalFileName, img.contentType);
    };

    useEffect(() => {
        if(updateData) {
            setData(updateData);
        }
    }, [updateData, setData]);

    return data && (
        <div className="grid grid-cols-3 gap-5" >
            {data.map((img, index) => (
                    <div key={index} className="relative aspect-w-3 aspect-h-4" onClick={(e)=> handleDownload(!img.imagePath ? img : null )}>

                        <img
                            src={img.imagePath || displayImage(img) }
                            alt={`Image ${index}`}
                            className="w-full h-full object-cover object-center rounded-md"
                        />
                    </div>
                ))}
        </div>
    );
}
export default CellComponent;