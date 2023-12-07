import CellComponent from "src/components/CellComponent";
import GridComponent from "src/components/GridComponent";
import ParentComponent from "src/components/ParentComponent";
import Scroll from "src/components/Scroll";

function RightBar() {

    return (
        <>
            <div className="border border-black w-[35%]">
                <ParentComponent/>
                <GridComponent/>
                <CellComponent/>
                <Scroll/>
            </div>
        </>
    )
}

export default RightBar;