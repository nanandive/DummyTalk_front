import {useEffect, useRef, useState} from "react";
import {useUrlQuery} from "src/components/hooks/use-url-query";
import CellComponent from "src/layouts/RightSide/component/CellComponent";
import TextSearchComponent from "src/layouts/RightSide/component/text-search-component";
import SummaryComponent from "src/layouts/RightSide/component/summary-component";
import {useSocket} from "src/components/hooks/use-socket";

const RightBar = () => {
    const [activeTab, setActiveTab] = useState('image');

    const TabContent = () => {
        switch (activeTab) {
            case 'image':
                return <CellComponent />;
            case 'text':
                return <TextSearchComponent />;
            case 'summary':
                return <SummaryComponent />;
            default:
                return null;
        }
    };

    return (
        <div className="h-full w-[45%] flex flex-col">
            <div className="h-[60px] min-h-[60px] w-full font-bold text-md flex pl-5 items-center border-b-[1px] border-black justify-between text-zinc-400 bg-[your-color]">
                <div>보관함</div>
            </div>
            <div className="flex justify-center items-center mt-2">
                <button className={`mr-4 ${activeTab === 'image' ? 'text-white' : ''}`} onClick={() => setActiveTab('image')}>
                    이미지
                </button>
                <button className={`mr-4 ${activeTab === 'text' ? 'text-white' : ''}`} onClick={() => setActiveTab('text')}>
                    텍스트
                </button>
                <button className={`mr-4 ${activeTab === 'summary' ? 'text-white' : ''}`} onClick={() => setActiveTab('summary')}>
                    요약
                </button>
            </div>
            <div className="w-full flex-grow mt-5 overflow-y-auto scrollbar-hidden relative">
                <TabContent />
            </div>
        </div>
    );
};

export default RightBar;