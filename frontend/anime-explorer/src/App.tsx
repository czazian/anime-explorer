import './App.css'
import AppRoutes from "./routes/AppRoutes.tsx";
import { Navbar } from "./share-component/Navbar.tsx";
import { BrowserRouter } from "react-router-dom";
import { DeviceProvider } from "./utils/MobileContext.tsx";
import { ScrollToTop } from "./utils/ScrollToTop.ts";
import { MessageService } from "./share-component/MessageService.tsx";

function App() {
    return (
        <BrowserRouter>
            <DeviceProvider>
                <MessageService>
                    <Navbar />
                    <ScrollToTop />
                    <AppRoutes />
                </MessageService>
            </DeviceProvider>
        </BrowserRouter>
    );
}

export default App;