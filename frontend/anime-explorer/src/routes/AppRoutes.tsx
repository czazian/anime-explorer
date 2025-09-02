import { Routes, Route } from "react-router-dom";
import { Home } from "../modules/home";
import {NotFound} from "../modules/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} /> 
        </Routes>
    );
}
