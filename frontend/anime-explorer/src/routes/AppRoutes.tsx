import { Routes, Route } from "react-router-dom";
import { Home } from "../modules/home";
import {NotFound} from "../modules/NotFound";
import { AnimeDetail } from "../modules/AnimeDetail";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime-detail/:animeId" element={<AnimeDetail />} />
            <Route path="*" element={<NotFound />} /> 
        </Routes>
    );
}
