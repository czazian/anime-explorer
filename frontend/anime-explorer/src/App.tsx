import './App.css'
import AppRoutes from "./routes/AppRoutes.tsx";
import { Navbar } from "./share-component/Navbar.tsx";
import { BrowserRouter } from "react-router-dom";
import {DeviceProvider} from "./utils/MobileContext.tsx";

function App() {
    return (
        <BrowserRouter>
            <DeviceProvider>
                <Navbar />
                <AppRoutes />
            </DeviceProvider>
        </BrowserRouter>
    );
}

export default App;
