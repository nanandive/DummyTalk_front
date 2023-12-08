import MainPage from "src/page/MainPage";
import Header from "./Header";


function Layout() {

    return (
        <div className="h-full relative">
            <Header/>
            <MainPage/>        </div>
    )
}

export default Layout;