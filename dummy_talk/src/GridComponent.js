// GridComponent.js
import React,{ useState } from "react";
import CellComponent from "./CellComponent"; // 아래에서 만들 CellComponent를 import
import "./GridComponent.css";

function GridComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const rows = 1;
  const cols = 1;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // 그리드를 생성하는 함수
  const renderGrid = () => {
    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(<CellComponent key={`${i}-${j}`} />);
      }
      grid.push(<div className="grid-row" key={i}>{row}</div>);
    }

    return grid;
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="검색어를 입력하세요"
      />
      <div className="grid-container">{renderGrid()}</div>
      
    </div>
  );
}

export default GridComponent;
