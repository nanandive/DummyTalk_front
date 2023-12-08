import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import  Layout  from "./layouts/layout";

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