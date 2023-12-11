import { Outlet } from "react-router-dom"
import Navbar from "src/components/Navbar"


function IndexLayOut() {

    return (
        <div className="h-full relative">
            <Navbar />
            <Outlet/>
        </div>
    )
}

export default IndexLayOut