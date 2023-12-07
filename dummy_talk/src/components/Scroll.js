import React from "react";
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