import React from "react";
import "./CellComponent.css";

const imgData = {
  images: ["다운로드", "images", "1", "2", "3"]
};

function CellComponent() {
  return (
    <div className="grid-container">
      {imgData.images.map((img, index) => (
        <div key={index} className="grid-cell">
          <img src={`/img/${img}.jpeg`} alt={`Image ${index}`} className="grid-img" />
        </div>
      ))}
    </div>
  );
}

export default CellComponent;
