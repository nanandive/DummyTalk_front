import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import MainPage from "./page/MainPage";

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='main' element={<Layout/>}>
                <Route index element={<MainPage />}>
                    {/* 추후 순서대로 Left, Chat, Right를 넣으면 됨 */}
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
