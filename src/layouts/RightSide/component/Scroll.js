import React from "react";
// import CellComponent from "./CellComponent";
import GridComponent from "./GridComponent";
function Scroll() {
  return (
    <div className="scrollable">
      <div className="scrollable-area">
        <GridComponent />
      </div>
    </div>
  );
}

export default Scroll;