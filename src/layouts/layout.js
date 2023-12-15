import { ModalProvider } from "src/components/providers/modal-provider";
import MainPage from "../page/MainPage"
import { Header } from "./Header"
import {Outlet} from "react-router-dom";


function Layout() {

    return (
        <div className="h-full relative">
            <ModalProvider />
            <Header/>
            <MainPage />
        </div>
    )
}

export default Layout