// GridComponent.js
import CellComponent from "./CellComponent";
import "../css/GridComponent.css";

function GridComponent() {
  
  // const rows = 1;
  // const cols = 0;

  // // 그리드를 생성하는 함수
  // const renderGrid = () => {
  //   if (rows <= 0 || cols <= 0) {
  //     return null; // 행 또는 열이 0 이하인 경우 아무것도 렌더링하지 않음
  //   }

  //   const grid = [];

  //   for (let i = 0; i < rows; i++) {
  //     const row = [];
  //     for (let j = 0; j < cols; j++) {
  //       row.push(<CellComponent key={`${i}-${j}`} />);
  //     }
  //     grid.push(<div className="grid-row" key={i}>{row}</div>);
  //   }

  //   return grid;
  // };

  // return (
  //   <div>
  //      <div className="grid-container">{renderGrid()}</div>
  //   </div>
  // );
}

export default GridComponent;
