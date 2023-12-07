import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='main' element={<Layout/>}>
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
