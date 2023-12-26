import React, {useEffect, useState} from "react";
import {useUrlQuery} from "src/components/hooks/use-url-query";
import axios from "axios";


const CellComponent = ({searchQuery}) => {

    const query = useUrlQuery();
    const channelId = query.get("channel");

    const [data, setData] = useState([]);
    
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

        if( !channelId || searchQuery ) return;
        console.log("searchQuery", searchQuery);
        console.log(channelId);

        imageListRequest(channelId);
    },[channelId, searchQuery]);


  return channelId && (
      <div className="grid grid-cols-3 gap-5">
          {data.map((img, index) => (
              <div key={index} className="relative aspect-w-3 aspect-h-4">
                  <img
                      src={img.filePath}
                      alt={`Image ${index}`}
                      className="w-full h-full object-cover object-center rounded-md"
                  />
              </div>
          ))}
      </div>
  );
}

export default CellComponent;