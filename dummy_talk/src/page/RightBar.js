import ParentComponent from "src/layouts/RightSide/component/ParentComponent";
import GridComponent from "src/layouts/RightSide/component/GridComponent";
import CellComponent from "src/layouts/RightSide/component/CellComponent";
import Scroll from "src/layouts/RightSide/component/Scroll";


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