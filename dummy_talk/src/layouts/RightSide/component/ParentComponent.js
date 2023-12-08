// ParentComponent.js (또는 원하는 부모 컴포넌트)
import React, { useState } from "react";
import GridComponent from "./GridComponent";





function ParentComponent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="이미지를 검색해주세요"
        />
        
      </div>

      <GridComponent searchQuery={searchQuery} />
    </div>
  );
}

export default ParentComponent;
