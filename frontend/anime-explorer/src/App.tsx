import './App.css'
import AppRoutes from "./routes/AppRoutes.tsx";
import {Navbar} from "./share-component/Navbar.tsx";
import {BrowserRouter} from "react-router-dom";
import {DeviceProvider} from "./utils/MobileContext.tsx";
import {ScrollToTop} from "./utils/ScrollToTop.ts";
import {MessageService} from "./share-component/MessageService.tsx";
import {AuthProvider} from "./utils/AuthContext.tsx";

function App() {
    return (
        <BrowserRouter basename="/anime-explorer">
            <DeviceProvider>
                <MessageService>
                    <AuthProvider>
                        <Navbar/>
                        <ScrollToTop/>
                        <AppRoutes/>
                    </AuthProvider>
                </MessageService>
            </DeviceProvider>
        </BrowserRouter>
    );
}

export default App;