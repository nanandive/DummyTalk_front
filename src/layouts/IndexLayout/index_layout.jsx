import { Outlet } from "react-router-dom"
import Navbar from "src/layouts/IndexLayout/Navbar"
import {ModalProvider} from "src/components/providers/modal-provider";


function IndexLayOut() {

    return (
        <>
        <div className="h-full relative">
            <Navbar />
            <Outlet/>
        </div>
        </>
    )
}

export default IndexLayOut