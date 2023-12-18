import { ModalProvider } from "src/components/providers/modal-provider";
import MainPage from "../../page/MainPage";
import { Header } from "./Header";
import { SocketProvider } from "src/components/providers/sock-provider";

function Layout() {
    return (
        <SocketProvider>
            <div className="h-full relative">
                <ModalProvider />
                <Header />
                <MainPage />
            </div>
        </SocketProvider>
    );
}

export default Layout;
