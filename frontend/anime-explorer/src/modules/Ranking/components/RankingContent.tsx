import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup, type SvgIconProps,
    ToggleButton, ToggleButtonGroup
} from "@mui/material";
import {useDevice} from "../../../utils/MobileContext.tsx";
import {type ChangeEvent, useEffect, useState} from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StarIcon from '@mui/icons-material/Star';
import * as React from "react";
import type {Anime} from "../../../model/Anime.ts";
import {useNavigate} from "react-router-dom";

export const RankingContent = () => {
    const {isMobile} = useDevice();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("month");
    const [selectedView, setSelectedView] = useState("viewCount");

    // Store Fetch Rank List Value
    const [rankList, setRankList] = useState<Anime[] | null>(null);

    const handleSelectedTabChange = (_event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        if (newSelection != null) setSelectedTab(newSelection);
    };

    useEffect(() => {
        // Then fetch by selected view
        const rankListTemp = [
            {
                "animeId": "ABE1",
                "animeName": "Seirei Gensouki: Spirit Chronicles",
                "animeNameJp": "精霊幻想記",
                "animePvUrl": "https://youtu.be/bkRkxdUa_r0?si=tc60gNwjKfzJiWUR",
                "animeImage": "https://m.media-amazon.com/images/M/MV5BNzBhMTgwZGYtZWJmOS00NTg0LWFmNDAtNTIxZTNmODIxNmQ0XkEyXkFqcGc@._V1_.jpg",
                "animePoster": "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
                "animeDescription": "After losing his mother After losing his mother After losing his mother After losing his mother After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one. After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one.",
                "animeRating": 7.4,
                "animeReleaseDate": 2021,
                "animeViews": 1200000,
                "animeStatus": "Completed",
                "animeGenres": ["Isekai", "Sword and Fantasy", "Action"],
                "animeStudio": ["WIT Studio", "MAPPA"],
                "rank": 1,
            },
            {
                "animeId": "ABE2",
                "animeName": "Seirei Gensouki: Spirit Chronicles",
                "animeNameJp": "精霊幻想記",
                "animePvUrl": "https://youtu.be/bkRkxdUa_r0?si=tc60gNwjKfzJiWUR",
                "animeImage": "https://m.media-amazon.com/images/M/MV5BNzBhMTgwZGYtZWJmOS00NTg0LWFmNDAtNTIxZTNmODIxNmQ0XkEyXkFqcGc@._V1_.jpg",
                "animePoster": "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
                "animeDescription": "After losing his mother After losing his mother After losing his mother After losing his mother After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one. After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one.",
                "animeRating": 7.4,
                "animeReleaseDate": 2021,
                "animeViews": 1200000,
                "animeStatus": "Completed",
                "animeGenres": ["Isekai", "Sword and Fantasy", "Action"],
                "animeStudio": ["WIT Studio", "MAPPA"],
                "rank": 2,
            },
            {
                "animeId": "ABE3",
                "animeName": "Seirei Gensouki: Spirit Chronicles",
                "animeNameJp": "精霊幻想記",
                "animePvUrl": "https://youtu.be/bkRkxdUa_r0?si=tc60gNwjKfzJiWUR",
                "animeImage": "https://m.media-amazon.com/images/M/MV5BNzBhMTgwZGYtZWJmOS00NTg0LWFmNDAtNTIxZTNmODIxNmQ0XkEyXkFqcGc@._V1_.jpg",
                "animePoster": "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
                "animeDescription": "After losing his mother After losing his mother After losing his mother After losing his mother After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one. After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one.",
                "animeRating": 7.4,
                "animeReleaseDate": 2021,
                "animeViews": 1200000,
                "animeStatus": "Completed",
                "animeGenres": ["Isekai", "Sword and Fantasy", "Action"],
                "animeStudio": ["WIT Studio", "MAPPA"],
                "rank": 3,
            },
            {
                "animeId": "ABE4",
                "animeName": "Seirei Gensouki: Spirit Chronicles",
                "animeNameJp": "精霊幻想記",
                "animePvUrl": "https://youtu.be/bkRkxdUa_r0?si=tc60gNwjKfzJiWUR",
                "animeImage": "https://m.media-amazon.com/images/M/MV5BNzBhMTgwZGYtZWJmOS00NTg0LWFmNDAtNTIxZTNmODIxNmQ0XkEyXkFqcGc@._V1_.jpg",
                "animePoster": "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
                "animeDescription": "After losing his mother After losing his mother After losing his mother After losing his mother After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one. After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one.",
                "animeRating": 7.4,
                "animeReleaseDate": 2021,
                "animeViews": 1200000,
                "animeStatus": "Completed",
                "animeGenres": ["Isekai", "Sword and Fantasy", "Action"],
                "animeStudio": ["WIT Studio", "MAPPA"],
                "rank": 4,
            }
        ];

        setRankList(rankListTemp);
    }, []);

    const handleSelectedViewChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedView(event.target.value);


    };

    const viewByList = [
        {label: "View Count", value: "viewCount"},
        {label: "Rating", value: "rating"},
    ];

    const tabRankList = [
        {label: "This Month", value: "month", icon: CalendarMonthIcon},
        {label: "Overall", value: "overall", icon: EmojiEventsIcon},
    ];

    const renderRankIcon = (rank: number) => {
        if (rank < 1 || !Number.isInteger(rank)) {
            return null;
        }

        const size = isMobile ? "w-10 h-10 text-sm" : "w-12 h-12 text-base";
        const baseClasses = `${size} rounded-full flex items-center justify-center font-bold border-2 transition-transform hover:scale-105`;

        let specificClasses = "";
        const iconSize: SvgIconProps["fontSize"] = isMobile ? "medium" : "large";

        if (rank <= 3) {
            switch (rank) {
                case 1:
                    specificClasses = "bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-600 text-yellow-900";
                    break;
                case 2:
                    specificClasses = "bg-gradient-to-br from-gray-200 to-gray-400 border-gray-500 text-gray-800";
                    break;
                case 3:
                    specificClasses = "bg-gradient-to-br from-amber-500 to-amber-700 border-amber-800 text-gray-800";
                    break;
            }

            return (
                <div className={`${baseClasses} ${specificClasses}`}>
                    <EmojiEventsOutlinedIcon fontSize={iconSize}/>
                </div>
            );
        } else {
            specificClasses = "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-400 text-slate-800";

            return (
                <div className={`${baseClasses} ${specificClasses}`}>
                    {rank}
                </div>
            );
        }
    };

    return (
        <div>
            <div className={`mt-6`}>
                <FormControl>
                    <FormLabel id="viewByLabel"
                               sx={{
                                   color: "#FF3366",
                                   fontWeight: 500,
                                   fontSize: "1rem",
                                   '&.Mui-focused': {
                                       color: "#FF3366",
                                   },
                               }}>View By</FormLabel>
                    <RadioGroup
                        row
                        value={selectedView}
                        onChange={handleSelectedViewChange}
                        aria-labelledby="viewByLabel"
                        name="viewByButtonGroup">
                        {viewByList.map((item, index) => (
                            <FormControlLabel key={index}
                                              value={item.value}
                                              sx={{
                                                  fontSize: isMobile ? "12px" : "14px"
                                              }}
                                              control={
                                                  <Radio sx={{
                                                      color: "#FF3366",
                                                      '&.Mui-checked': {
                                                          color: "#FF3366",
                                                      },
                                                  }}/>}
                                              label={item.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>

            <div className={`${isMobile ? "mt-2" : "mt-6"}`}>
                <ToggleButtonGroup
                    value={selectedTab}
                    exclusive
                    onChange={handleSelectedTabChange}
                    className="w-full bg-[#1f1f2e] p-1 rounded-md mb-2"
                    sx={{display: "flex", gap: "4px", height: isMobile ? 36 : 40}}>
                    {tabRankList.map((option) => {
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
                                    fontSize: isMobile ? "13px" : "14px",
                                    backgroundColor: "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    "&.Mui-selected": {
                                        backgroundColor: "#0b0e13 !important",
                                        fontWeight: "bold",
                                        color: "white",
                                    },
                                }}
                            >
                                <Icon fontSize="small"/>
                                {option.label}
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
            </div>

            <div className={`border border-gray-800 rounded-md p-6 mt-3`}>
                <div className={`${isMobile ? "text-base" : "text-xl"} font-bold`}>
                    {
                        selectedTab === "month" ? (
                            <span className="flex">
                              <CalendarMonthIcon className="mr-2"/>
                                {`Monthly Ranking (${isMobile ? new Date().toLocaleString("default", {month: "short"}) : new Date().toLocaleString("default", {month: "long"})})`}
                            </span>
                        ) : (
                            <span className="flex">
                              <EmojiEventsIcon className="mr-2"/>
                              Overall Ranking
                            </span>
                        )
                    }
                </div>
                <div className={`py-3`}>
                    {rankList?.map((rankItem) => (
                        <div
                            onClick={() => navigate(`/anime-detail/${rankItem.animeId}`)}
                            key={rankItem.animeId}
                            style={{
                                transition: 'border-color 0.2s ease-in-out',
                                cursor: "pointer"
                            }}
                            className={`${isMobile ? "gap-1.5" : "gap-4"} flex flex-row border hover:border-[#F43F5E] border-gray-800 rounded-md px-5 py-2 mt-3 group`}>
                            <div className={`self-center`}>{renderRankIcon(rankItem.rank!)}</div>
                            <div>
                                <div
                                    className={`${isMobile ? "hidden" : "block"} anime-image w-[80px] h-[120px] flex-shrink-0 rounded-md`}
                                    style={{
                                        backgroundImage: `url(${rankItem.animeImage})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}>
                                </div>
                            </div>
                            <div className={`py-2 flex flex-col gap-2`}>
                                <div
                                    style={{
                                        transition: 'color 0.2s ease-in-out',
                                    }}
                                    className={`group-hover:text-[#F43F5E] line-clamp-2 font-bold ${isMobile ? "text-base" : "text-lg"}`}>
                                    {rankItem.animeName}
                                </div>
                                <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-400`}>
                                    {
                                        selectedView === "viewCount" ? (
                                            <div>
                                                <RemoveRedEyeIcon fontSize={isMobile ? "small" : "medium"} className={`mr-1`}/>
                                                <span>{rankItem.animeViews.toLocaleString()} views</span>
                                            </div>
                                        ) : (
                                            <div>
                                                <StarIcon fontSize={isMobile ? "small" : "medium"} className="text-yellow-500 mb-1 mr-1"/>
                                                <span>{rankItem.animeRating} / 10</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}