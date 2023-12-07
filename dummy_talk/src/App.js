import './App.css';
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Layout from "./layouts/layout";
import MainPage from "./page/MainPage";
import LeftBar from "./page/LeftBar";
import Chat from "./page/Chat";
import RightBar from "./page/RightBar";

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/main' element={<Layout/>} />
        </Routes>
    </BrowserRouter>
    );
}

export default App;
