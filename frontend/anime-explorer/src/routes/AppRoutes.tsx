import { Routes, Route } from "react-router-dom";
import { Home } from "../modules/home";
import { NotFound } from "../modules/NotFound";
import { AnimeDetail } from "../modules/AnimeDetail";
import {News, NewsDetail} from "../modules/News";
import {Ranking} from "../modules/Ranking";
import {Search} from "../modules/Search";
import {Profile} from "../modules/Profile";
import {Admin} from "../modules/Admin";

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

            {/* Ranking Module */}
            <Route path="/ranking" element={<Ranking />} />

            {/* Search Module */}
            <Route path="/search" element={<Search />} />

            {/* Profile Module */}
            <Route path="/profile" element={<Profile />} />

            {/* Admin Module */}
            <Route path="/admin" element={<Admin />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} /> 
        </Routes>
    );
}
