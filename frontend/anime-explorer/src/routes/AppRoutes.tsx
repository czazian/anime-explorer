import { Routes, Route } from "react-router-dom";
import { Home } from "../modules/home";
import { NotFound } from "../modules/NotFound";
import { AnimeDetail } from "../modules/AnimeDetail";
import {News, NewsDetail} from "../modules/News";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Anime Detail Module */}
            <Route path="/anime-detail/:animeId" element={<AnimeDetail />} />

            {/* News Module */}
            <Route path="/news" element={<News />} />
            <Route path="/news/:newsId" element={<NewsDetail />} />
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} /> 
        </Routes>
    );
}
