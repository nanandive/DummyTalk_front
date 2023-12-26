import React, {useEffect} from "react";
import {useUrlQuery} from "src/components/hooks/use-url-query";

const imgData = {
  images: ["다운로드", "images", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "13", "15", "16"],
};



function CellComponent() {

    const query = useUrlQuery();
    const channelId = query.get("channel");
    
    const imageListRequest = async (channelId) => { 
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/img/list/${channelId}`
            );
            setData(response.data.data);
            console.log("response ", response.data);
        } catch (error) {
            console.error("채팅 리스트 뽑아보기 에러", error);
        }
    }

    useEffect(() => {
        if(!channelId) return;
        console.log(channelId);

        imageListRequest(channelId);
    },[channelId]);


  return (
      <div className="h-full grid grid-cols-3 gap-5">
        {imgData.images.map((img, index) => (
            <div key={index} className="h-full relative">
              <img src={`/img/${img}.jpeg`} alt={`Image ${index}`} className="w-full h-full object-cover object-center rounded-md" />
            </div>
        ))}
      </div>
  );
}

export default CellComponent;