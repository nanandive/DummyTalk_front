import LeftSide from "src/layouts/LeftSide/leftSide";

function LeftBar() {

    return (
        <>
            <div className="w-[420px] h-full border-r-[1px] border-black overflow-y-scroll">
                <LeftSide />
            </div>
        </>
    )
}

export default LeftBar;