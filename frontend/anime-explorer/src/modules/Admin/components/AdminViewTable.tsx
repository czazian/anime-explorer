import {useState} from "react";
import {useDevice} from "../../../utils/MobileContext.tsx";
import * as React from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MovieIcon from '@mui/icons-material/Movie';
import {AnimeExplorerConstants} from "../../../constants/anime-explorer-constant.ts";
import type {User} from "../../../model/User.ts";
import type {News} from "../../../model/News.ts";
import type {Anime} from "../../../model/Anime.ts";
import {AdminTable} from "./AnimeTable.tsx";

export const AdminViewTable = () => {
    const [tabSelection, setTabSelection] = useState("users");
    const {isMobile} = useDevice();
    const userColumns = AnimeExplorerConstants.userColumns;
    const animeColumns = AnimeExplorerConstants.animeColumns;
    const newsColumns = AnimeExplorerConstants.newsColumns;

    const handleDetailTabSelectionChange = (_event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        if (newSelection !== null) setTabSelection(newSelection);
    };

    const tabOptions = [
        {value: "users", label: "Users", icon: GroupIcon},
        {value: "anime", label: "Anime", icon: MovieIcon},
        {value: "news", label: "News", icon: NewspaperIcon},
    ];

    const getCurrentData = () => {
        switch (tabSelection) {
            case "users":
                return sampleUserData;
            case "anime":
                return sampleAnimeData;
            case "news":
                return sampleNewsData;
            default:
                return [];
        }
    };

    const getCurrentColumns = () => {
        switch (tabSelection) {
            case "users":
                return userColumns;
            case "anime":
                return animeColumns;
            case "news":
                return newsColumns;
            default:
                return [];
        }
    };

    const renderTableList = () => {
        const selectedColumn = getCurrentColumns();
        const selectedData = getCurrentData();

        return (
            <AdminTable
                columns={selectedColumn}
                data={selectedData}
                tabSelection={tabSelection}
            />
        );
    }

    const sampleUserData: User[] = [
        {
            createdAt: 1640995200000,
            userId: "user-001",
            username: "john_doe",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpgXV83U-cLF2i2RMfDYEp5qWGZPk-Gt4J_w&s",
            password: "hashed_password_1",
            email: "john@example.com",
            profileDescription: "Admin user",
            role: "Admin"
        },
        {
            createdAt: 1643673600000,
            userId: "user-002",
            username: "jane_smith",
            profileImage: null,
            password: "hashed_password_2",
            email: "jane@example.com",
            profileDescription: "Regular user",
            role: "User"
        },
        {
            createdAt: 1646092800000,
            userId: "user-003",
            username: "bob_johnson",
            profileImage: "https://i.pinimg.com/originals/b2/60/94/b26094970505bcd59c2e5fe8b6f41cf0.jpg?nii=t",
            password: "hashed_password_3",
            email: "bob@example.com",
            profileDescription: null,
            role: "User"
        },
    ];

    const sampleAnimeData: Anime[] = [
        {
            animeId: "anime-001",
            animeName: "Attack on Titan",
            animeNameJp: "進撃の巨人",
            animeImage: "https://m.media-amazon.com/images/M/MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            animePoster: "https://via.placeholder.com/200x300",
            animePvUrl: "https://youtu.be/LJkn2qqtijk?si=_uZymJbqbxe6Pjav",
            animeDescription: "Humanity fights for survival against giant humanoid Titans",
            animeRating: 9.0,
            animeReleaseDate: 1365292800000,
            animeViews: 15000000,
            animeStatus: "Completed",
            animeGenres: ["Action", "Drama", "Fantasy"],
            animeStudio: ["Studio Pierrot", "MAPPA"],
            rank: 1,
            season: "Spring 2013"
        },
        {
            animeId: "anime-002",
            animeName: "One Piece",
            animeNameJp: "ワンピース",
            animeImage: "https://m.media-amazon.com/images/M/MV5BMTNjNGU4NTUtYmVjMy00YjRiLTkxMWUtNzZkMDNiYjZhNmViXkEyXkFqcGc@._V1_.jpg",
            animePoster: "https://via.placeholder.com/200x300",
            animePvUrl: "https://youtu.be/LJkn2qqtijk?si=_uZymJbqbxe6Pjav",
            animeDescription: "Follow Monkey D. Luffy on his quest to become the Pirate King",
            animeRating: 8.7,
            animeReleaseDate: 939513600000,
            animeViews: 25000000,
            animeStatus: "Ongoing",
            animeGenres: ["Adventure", "Comedy", "Shounen"],
            animeStudio: ["Toei Animation"],
            rank: 2,
            season: "Fall 1999"
        },
    ];

    const sampleNewsData: News[] = [
        {
            newsId: "news-001",
            newsTitle: "New Anime Season Announcements",
            newsDescription: "Spring 2024 brings exciting new anime series",
            newsPoster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY41Ug-q9Ql3mcd3b82x_9ey_xwM1fktvg7w&s",
            newsContent: "The spring 2024 anime season promises to deliver exceptional content with multiple highly anticipated series...",
            newsAuthor: "Editor Mike",
            newsPostDate: 1704067200000,
        },
        {
            newsId: "news-002",
            newsTitle: "Studio MAPPA Announces New Project",
            newsDescription: "Famous animation studio reveals upcoming adaptation",
            newsPoster: "https://pbs.twimg.com/media/GbDT_XsaMAAPdle.jpg",
            newsContent: "Studio MAPPA, known for their exceptional work on Attack on Titan and Jujutsu Kaisen...",
            newsAuthor: "Reporter Sarah",
            newsPostDate: 1704153600000,
        },
    ];

    return (
        <div className={`flex flex-col gap-2`}>
            <ToggleButtonGroup
                value={tabSelection}
                exclusive
                onChange={handleDetailTabSelectionChange}
                className="w-full bg-[#1f1f2e] p-1 rounded-md mb-2"
                sx={{display: "flex", gap: "4px", height: isMobile ? 65 : 40}}>
                {tabOptions.map((option) => {
                    const Icon = option.icon;

                    return (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            sx={{
                                flex: 1,
                                border: "none",
                                borderRadius: "4px",
                                color: "#96a1b1",
                                textTransform: "none",
                                fontSize: isMobile ? '13px' : '14px',
                                backgroundColor: "transparent",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                "&.Mui-selected": {
                                    backgroundColor: "#0b0e13 !important",
                                    fontWeight: "bold",
                                    color: "white"
                                },
                            }}>
                            {isMobile ? "" : <Icon className="mr-2" />}{option.label}
                        </ToggleButton>
                    );
                })}
            </ToggleButtonGroup>
            <div className={``}>
                { renderTableList() }
            </div>
        </div>
    );
}