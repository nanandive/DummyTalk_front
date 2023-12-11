import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModalProvider } from "src/components/providers/modal-provider";
import "./App.css";
import Layout from "./layouts/layout";

function App() {
    return (
        <>
            <ModalProvider />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/main"
                        element={<Layout />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
