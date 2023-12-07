// ParentComponent.js (또는 원하는 부모 컴포넌트)
import React, { useState } from "react";
import GridComponent from "./GridComponent";

function ParentComponent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <GridComponent searchQuery={searchQuery} />
    </div>
  );
}

export default ParentComponent;
