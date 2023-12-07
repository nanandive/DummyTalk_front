import Header  from "./Header"
import MainPage from "../page/MainPage"
function Layout() {

    return (
        <div className="h-full relative">
            <Header/>
            <MainPage/>
        </div>
    )
}

export default Layout;