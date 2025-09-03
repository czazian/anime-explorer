import {useDevice} from "../../../utils/MobileContext.tsx";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import {Box, Button, FormControl, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import {useMemo, useState} from "react";
import type {News} from "../../../model/News.ts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {useNavigate} from "react-router-dom";

export const NewsBox = () => {

    const newsList = [
        {
            "newsId": "n1",
            "newsTitle": "Attack on Titan: The Final Season Concludes",
            "newsDescription": "The long-awaited finale of Attack on Titan airs this week.",
            "newsPoster": "https://images.immediate.co.uk/production/volatile/sites/3/2023/10/AttackonTitanFinalSeasonTHEFINALCHAPTERSSpecial1Still1.6-Cropped-5843dc9.jpg?resize=768,576",
            "newsContent": "After years of anticipation, Attack on Titan's final season has reached its epic conclusion. Fans around the world are tuning in to witness the end of Eren Yeager's journey.",
            "newsAuthor": "Anime Times",
            "newsPostDate": 1693651200000,
        },
        {
            "newsId": "n2",
            "newsTitle": "Demon Slayer Season 4 Announced",
            "newsDescription": "Ufotable confirms the Hashira Training arc adaptation. Ufotable confirms the Hashira Training arc adaptation. Ufotable confirms the Hashira Training arc adaptation. Ufotable confirms the Hashira Training arc adaptation. Ufotable confirms the Hashira Training arc adaptation.",
            "newsPoster": "https://images.immediate.co.uk/production/volatile/sites/3/2025/02/demon-slayer-f67b5fa.jpg?quality=90&resize=810,540",
            "newsContent": "Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase. Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase. Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase. Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase. Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase.",
            "newsAuthor": "Otaku Journal",
            "newsPostDate": 1640995200000,
        },
        {
            "newsId": "n3",
            "newsTitle": "Seirei Gensouki: Spirit Chronicles Season 2 Update",
            "newsDescription": "The production committee for Seirei Gensouki: Spirit Chronicles has released a major update regarding the highly anticipated Season 2. The series, which gained a devoted fanbase after its first season, will continue to follow Haruto Amakawa’s reincarnation as Rio in a fantasy world filled with political struggles, magic, and destiny. According to official announcements, the staff promises higher-quality animation and deeper character arcs that will expand upon the light novel’s intricate storyline. Fans can also expect the introduction of key characters that were teased in Season 1’s finale, which left viewers eager for more. This update confirms that the studio is working hard to meet expectations, and the new season aims to explore Rio’s journey of uncovering the mysteries of his reincarnation, his connection to the past, and his role in the kingdom’s future. Alongside these developments, the announcement mentioned collaborations with popular Japanese artists to produce new theme songs, adding to the excitement. The long wait has left fans discussing theories online, and with this official confirmation, anticipation for the next chapter of Rio’s story has reached new heights.",
            "newsPoster": "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
            "newsContent": "The long-awaited continuation of Seirei Gensouki: Spirit Chronicles has finally been confirmed, and fans of the isekai fantasy series can now look forward to Season 2 with renewed anticipation. Ever since the first season concluded, viewers have been eager to learn what lies ahead for Rio, the young man who carries the memories of Haruto Amakawa from his previous life in Japan. The upcoming season promises to delve deeper into Rio’s journey, both as a warrior of incredible potential and as an individual searching for the truth behind his reincarnation.\n\nAccording to the production committee, the new season will adapt some of the most pivotal arcs from the original light novel. This means that the anime will not only continue Rio’s quest for vengeance and justice but also explore the intricate relationships he forges along the way. Characters who were briefly introduced in the first season are expected to play a much larger role, expanding the story’s scope and adding layers of political intrigue, emotional drama, and magical conflict. For long-time fans of the novels, these developments mark a significant step forward in faithfully translating the source material onto the screen.\n\nOne of the most exciting aspects of Season 2 is the promise of improved animation quality. The studio has acknowledged feedback from viewers regarding the first season’s visuals and has assured fans that greater resources will be dedicated to enhancing the overall production. With battles expected to reach even greater intensity, the visual spectacle of magic, swordsmanship, and large-scale confrontations will be a highlight of the series. The staff also revealed that the character designs would undergo minor adjustments to more closely reflect the artwork from the novels, creating a sense of authenticity for devoted readers.\n\nBeyond the action and visuals, Season 2 will focus heavily on character development. Rio’s struggle with his dual identity—being both Haruto from Japan and Rio from this new world—will take center stage. This internal conflict is expected to shape many of his decisions, influencing how he interacts with allies, enemies, and the political powers that surround him. Additionally, the bonds Rio forms with key characters, such as Miharu and Celia, are set to evolve in meaningful ways that will resonate deeply with audiences.\n\nThe announcement also included a teaser about the music, which has always been an integral part of the anime’s atmosphere. Popular Japanese artists will once again be involved in producing the opening and ending themes, while the background score will be expanded to include new compositions that capture the emotional highs and lows of Rio’s journey. Music has the power to elevate storytelling, and fans are eager to see how these new pieces will shape the mood of critical moments in Season 2.\n\nFans have been actively discussing theories online, speculating about how far the second season will progress in the light novel’s timeline. Some believe that the season may adapt up to the point where Rio faces one of his most challenging adversaries yet, while others think the anime will carefully pace itself to allow for future seasons. Either way, the confirmation of Season 2 has sparked renewed interest in the franchise, with light novel and manga sales seeing a noticeable boost since the announcement.\n\nUltimately, Seirei Gensouki: Spirit Chronicles Season 2 represents not only the continuation of Rio’s adventure but also the growth of a franchise that has steadily gained recognition in the crowded isekai genre. With a compelling mix of action, drama, romance, and mystery, the new season has the potential to capture the hearts of both returning fans and newcomers. As the release date draws closer, anticipation continues to build, and expectations remain high. One thing is certain: Rio’s story is far from over, and the next chapter promises to be his most thrilling yet.",
            "newsAuthor": "Anime Corner",
            "newsPostDate": 1643673600000,
        }
    ]

    const navigate = useNavigate();
    const {isMobile} = useDevice();
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [selectedSort, setSelectedSort] = useState<"latestToOldest" | "oldestToLatest" | "AtoZ" | "ZtoA">("latestToOldest");

    // Get All Dates and Generate All Exist Years for Options
    const filterOptions = useMemo(() => {
        const years = newsList
            .map(news => new Date(news.newsPostDate).getFullYear())
            .filter((year, index, self) => self.indexOf(year) === index)
            .sort((a, b) => b - a);

        return [
            {label: "All", value: 0},  // Define 0 = All = Default Option
            ...years.map(year => ({
                label: year.toString(),
                value: year
            }))
        ];
    }, [newsList]);

    // Define list of Sort Options
    const sortOptions = [
        {label: "Latest to Oldest", value: "latestToOldest"},
        {label: "Oldest to Latest", value: "oldestToLatest"},
        {label: "a to Z", value: "AtoZ"},
        {label: "Z to a", value: "ZtoA"},
    ];

    // Filter News By Year - To be called by "const sortedAndFilteredNews()"
    const filteredNews = useMemo(() => {
        if (selectedFilter === 0) {
            return newsList; // Direct return list when default
        }
        return newsList.filter(news => {
            const newsYear = new Date(news.newsPostDate).getFullYear();
            return newsYear === selectedFilter;
        });

        // Without []: Runs the function on every render (no memoization benefit).
        // With [SMT]: Runs the function only when data changes. Skips recomputation otherwise.
    }, [newsList, selectedFilter]);

    // Sort filtered news - Call the Filtered Result from "const filterNews()"
    const sortedAndFilteredNews = useMemo(() => {
        const newsToSort = [...filteredNews];

        switch (selectedSort) {
            case "latestToOldest":
                return newsToSort.sort((a, b) => b.newsPostDate - a.newsPostDate);
            case "oldestToLatest":
                return newsToSort.sort((a, b) => a.newsPostDate - b.newsPostDate);
            case "AtoZ":
                return newsToSort.sort((a, b) => a.newsTitle.localeCompare(b.newsTitle));
            case "ZtoA":
                return newsToSort.sort((a, b) => b.newsTitle.localeCompare(a.newsTitle));
            default:
                return newsToSort;
        }
    }, [filteredNews, selectedSort]);

    // Determine number of read time
    const estimateReadingTime = (content: string, wordsPerMinute: number = 200) => {
        if (!content) return 0;

        const words = content.trim().split(/\s+/).length;
        const minutes = words / wordsPerMinute;

        return Math.ceil(minutes);
    }

    const handleFilterChange = (event: SelectChangeEvent<number>) => {
        setSelectedFilter(Number(event.target.value));
    };

    const handleSortChange = (event: SelectChangeEvent<any>) => {
        setSelectedSort(event.target.value);
    };

    return (
        <div className={`${isMobile ? "mt-6" : "mt-8"}`}>
            <div className={`flex ${isMobile ? "text-sm gap-5" : "gap-4 text-base"}`}>
                <div className={`flex ${isMobile ? "flex-col" : "flex-row items-center"}`}>
                    {isMobile ? null : <FilterAltOutlinedIcon className="mr-2"/>}
                    <span className={`${isMobile ? "mb-1" : "mr-2"}`}>Filter By:</span>
                    <FormControl sx={{minWidth: 100}}>
                        <Select
                            value={selectedFilter}
                            onChange={handleFilterChange}
                            autoWidth
                            IconComponent={ArrowDropDownOutlinedIcon}
                            sx={{
                                color: "white",
                                "& .MuiOutlinedInput-input": {
                                    padding: "10px 8px",
                                    fontSize: isMobile ? "14px" : "16px",
                                    lineHeight: isMobile ? "20px" : "24px",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#262626",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#f8286c",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#f8286c",
                                },
                                "& .MuiSelect-icon": {
                                    color: "white",
                                    fontSize: isMobile ? "18px" : "22px",
                                },
                            }}>
                            {filterOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={`flex ${isMobile ? "flex-col" : "flex-row items-center"}`}>
                    {isMobile ? null : <SwapVertOutlinedIcon className="mr-2"/>}
                    <span className={`${isMobile ? "mb-1" : "mr-2"}`}>Sort By:</span>
                    <FormControl sx={{minWidth: 140}}>
                        <Select
                            value={selectedSort}
                            onChange={handleSortChange}
                            autoWidth
                            IconComponent={ArrowDropDownOutlinedIcon}
                            sx={{
                                color: "white",
                                "& .MuiOutlinedInput-input": {
                                    padding: "10px 8px",
                                    fontSize: isMobile ? "14px" : "16px",
                                    lineHeight: isMobile ? "20px" : "24px",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#262626",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#f8286c",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#f8286c",
                                },
                                "& .MuiSelect-icon": {
                                    color: "white",
                                    fontSize: isMobile ? "18px" : "22px",
                                },
                            }}>
                            {sortOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            {/* News Contents */}
            <div className="w-full flex flex-col items-center gap-5 mt-4">
                {sortedAndFilteredNews.length > 0 ? (
                    // Call the sorted news list from the "const sortedAndFilteredNews()"
                    sortedAndFilteredNews.map((news: News) => {
                        return (
                            <Box
                                onClick={() => navigate(`/news/${news.newsId}`)}
                                key={news.newsId}
                                className={`${isMobile ? "h-[350px]" : "h-[250px]"} w-full group cursor-pointer`}
                                sx={{
                                    border: '1px solid #212121',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    transition: 'border-color 0.2s ease-in-out',
                                    '&:hover': {
                                        border: '1px solid #F43F5E'
                                    },
                                }}>
                                <div className={`flex h-full ${isMobile ? "flex-col" : "flex-row"}`}>
                                    <Box
                                        className={`${isMobile ? "w-full h-[170px]" : "w-[300px] h-full"} flex-shrink-0`}
                                        sx={{
                                            overflow: 'hidden',
                                            borderRadius: '8px 0 0 8px',
                                        }}>
                                        <Box
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundImage: `url('${news.newsPoster}')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                            sx={{
                                                transition: 'transform 0.3s ease-in-out',
                                                transformOrigin: 'center',
                                            }}
                                            className="group-hover:scale-105"
                                        />
                                    </Box>

                                    <div
                                        style={{
                                            zIndex: '50',
                                            overflow: 'hidden',
                                            padding: isMobile ? '14px' : '18px',
                                        }}
                                        className="flex flex-col justify-between flex-1">
                                        <div className="flex flex-col w-full mb-4">
                                            <div
                                                className={`justify-self-center w-fit rounded-2xl px-2 py-1 text-xs mb-1.5 text-white bg-gradient-primary`}>
                                                <PersonOutlineOutlinedIcon fontSize="small"
                                                                           className="text-white mr-1"/>{news.newsAuthor}
                                            </div>
                                            <div
                                                className={`group-hover:text-[#F43F5E] font-semibold ${isMobile ? "text-sm" : "text-xl"} mb-2 line-clamp-1`}>
                                                {news.newsTitle}
                                            </div>
                                            <div
                                                className={`text-gray-400 line-clamp-3 text-justify ${isMobile ? "text-xs" : "text-base"}`}>
                                                {news.newsDescription}
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <div className={`text-gray-400 gap-5 flex items-center ${isMobile ? "text-xs" : "text-sm"}`}>
                                                <div className="flex flex-row justify-between items-center">
                                                    <CalendarMonthIcon
                                                        className="mr-1"
                                                        sx={{fontSize: isMobile ? '14px' : '18px'}}/>
                                                    <p>{new Date(news.newsPostDate!).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex flex-row justify-between items-center">
                                                    <AccessTimeOutlinedIcon 
                                                        className="mr-1"
                                                        sx={{fontSize: isMobile ? '14px' : '18px'}}/>
                                                    <p>{ estimateReadingTime(news.newsContent + news.newsTitle + news.newsDescription) }&nbsp;min read</p>
                                                </div>
                                            </div>
                                            <Button
                                                sx={{
                                                    textTransform: "capitalize",
                                                    fontSize: isMobile ? '10px' : '12px',
                                                    backgroundColor: 'transparent',
                                                    color: 'white',
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, hsl(347 87% 61%), hsl(315 80% 65%));',
                                                    },
                                                }}>
                                                Read More
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        );
                    })
                ) : (
                    <div className={`text-center text-gray-400 py-8 ${isMobile ? "text-sm" : "text-base"}`}>
                        No news articles found for {selectedFilter}.
                    </div>
                )}
            </div>
        </div>
    );
}