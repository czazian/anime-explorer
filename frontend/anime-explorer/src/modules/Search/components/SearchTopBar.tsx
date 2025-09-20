import {
    Box,
    Button, FormControl, InputAdornment,
    InputLabel, MenuItem, Select, type SelectChangeEvent, TextField
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, {useState, useEffect, useMemo} from "react";
import type {LabelValueModel} from "../../../model/LabelValueModel.ts";
import TuneIcon from '@mui/icons-material/Tune';
import {useDevice} from "../../../utils/MobileContext.tsx";
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from '@mui/icons-material/Star';
import type {Anime} from "../../../model/Anime.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FilterService, type FilterPayload} from "../../../utils/FilterService.ts";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export const SearchTopBar = () => {
    const {isMobile} = useDevice();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Store original and filtered anime lists
    const [originalAnimeList, setOriginalAnimeList] = useState<Anime[]>([]);
    const [filteredAnimeList, setFilteredAnimeList] = useState<Anime[]>([]);

    // Search term state
    const [searchTerm, setSearchTerm] = useState("");

    // Open and close status of filter option box
    const [filterVisibility, setFilterVisibility] = useState(false);

    // Filter states
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({
        genre: "",
        season: "",
        year: "",
        status: ""
    });

    const [selectedSort, setSelectedSort] = useState("popularity");

    // Dynamic Filters using FilterService
    const genreOptions = useMemo(() => {
        return FilterService.getUniqueGenres(originalAnimeList);
    }, [originalAnimeList]);

    const yearOptions = useMemo(() => {
        return FilterService.getUniqueYears(originalAnimeList);
    }, [originalAnimeList]);

    // Fixed Filters
    const seasonsOptions = [
        {label: "Winter", value: "winter"},
        {label: "Spring", value: "spring"},
        {label: "Summer", value: "summer"},
        {label: "Fall", value: "fall"},
    ];

    const statusOptions = [
        {label: "Completed", value: "completed"},
        {label: "Currently Airing", value: "airing"},
        {label: "Upcoming", value: "upcoming"},
    ];

    const sortByOptions: LabelValueModel[] = [
        {label: "Popularity", value: "popularity"},
        {label: "Rating", value: "rating"},
        {label: "Release Year", value: "release"},
        {label: "Title a-Z", value: "atoz"},
    ];

    // Main Filter configuration
    const filterOptions = [
        {label: "Genre", key: "genre", options: genreOptions, filterType: "select"},
        {label: "Season", key: "season", options: seasonsOptions, filterType: "select"},
        {label: "Year", key: "year", options: yearOptions, filterType: "select"},
        {label: "Status", key: "status", options: statusOptions, filterType: "select"}
    ];

    // Memoize filter payload to prevent unnecessary recalculations
    const filterPayload = useMemo((): FilterPayload => {
        const payload: FilterPayload = {
            sortBy: selectedSort
        };

        // Add search term if present
        if (searchTerm.trim()) {
            payload.search = searchTerm.trim();
        }

        // Add filter values if present
        Object.entries(filterValues).forEach(([key, value]) => {
            if (value) {
                payload[key as keyof FilterPayload] = value;
            }
        });

        return payload;
    }, [filterValues, selectedSort, searchTerm]);

    // Function to handle URL parameters
    const applyUrlFilters = () => {
        const filterParam = searchParams.get('filter');

        if (filterParam === 'upcoming') {
            // Set Status filter with 'upcoming'
            setFilterValues(prev => ({
                ...prev,
                status: "upcoming"
            }));
        } else if (filterParam === 'seasonal') {
            // Check current season, then apply current season filter
            const currentMonth = new Date().getMonth() + 1;
            let currentSeason = "";

            if (currentMonth >= 1 && currentMonth <= 3) {
                currentSeason = "winter";
            } else if (currentMonth >= 4 && currentMonth <= 6) {
                currentSeason = "spring";
            } else if (currentMonth >= 7 && currentMonth <= 9) {
                currentSeason = "summer";
            } else {
                currentSeason = "fall";
            }

            setFilterValues(prev => ({
                ...prev,
                season: currentSeason
            }));
        }
    };

    // Handle filter change
    const handleFilterChange = (filterKey: string, value: string) => {
        setFilterValues(prev => ({
            ...prev,
            [filterKey]: value
        }));
    };

    // Handle search change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Load initial data and apply filters
    useEffect(() => {
        const animeListTemp = [
            {
                "animeId": "ABE1",
                "animeName": "Seirei Gensouki: Spirit Chronicles",
                "animeNameJp": "精霊幻想記",
                "animePvUrl": "https://youtu.be/bkRkxdUa_r0?si=tc60gNwjKfzJiWUR",
                "animeImage": "https://m.media-amazon.com/images/M/MV5BNzBhMTgwZGYtZWJmOS00NTg0LWFmNDAtNTIxZTNmODIxNmQ0XkEyXkFqcGc@._V1_.jpg",
                "animePoster": "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
                "animeDescription": "After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one.",
                "animeRating": 7.4,
                "animeReleaseDate": 2021,
                "animeViews": 1200000,
                "animeStatus": "Upcoming",
                "animeGenres": ["Isekai", "Sword and Fantasy", "Action"],
                "animeStudio": ["WIT Studio", "MAPPA"],
                "season": "summer",
            },
            {
                "animeId": "ABE2",
                "animeName": "Re:Zero - Starting Life in Another World",
                "animeNameJp": "Re:ゼロから始める異世界生活",
                "animePvUrl": "https://youtu.be/o0c8kYKNjZk",
                "animeImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEBzDPTqzxeOhgqQwSx6VNVZ0qrDTsNXCBjw&s",
                "animePoster": "https://cdn.myanimelist.net/images/anime/11/79410.jpg",
                "animeDescription": "Subaru Natsuki is suddenly transported to another world and discovers he has the power to return from death, rewinding time whenever he dies. But this power comes at a heavy emotional cost.",
                "animeRating": 8.3,
                "animeReleaseDate": 2016,
                "animeViews": 3500000,
                "animeStatus": "Ongoing",
                "animeGenres": ["Isekai", "Drama", "Fantasy", "Thriller"],
                "animeStudio": ["White Fox"],
                "season": "spring",
            },
            {
                "animeId": "ABE3",
                "animeName": "Sword Art Online",
                "animeNameJp": "ソードアート・オンライン",
                "animePvUrl": "https://youtu.be/WEmF63qOZp8",
                "animeImage": "https://images.justwatch.com/poster/199736429/s718/sword-art-online.jpg",
                "animePoster": "https://cdn.myanimelist.net/images/anime/11/39717.jpg",
                "animeDescription": "In 2022, thousands of players find themselves trapped in a virtual MMORPG. Kirito, a skilled player, must clear the deadly game to escape, but death in the game means death in real life.",
                "animeRating": 7.2,
                "animeReleaseDate": 2012,
                "animeViews": 5000000,
                "animeStatus": "Completed",
                "animeGenres": ["Isekai", "Action", "Romance", "Sci-Fi"],
                "animeStudio": ["A-1 Pictures"],
                "season": "winter",
            },
            {
                "animeId": "ABE4",
                "animeName": "Jobless Reincarnation: I Will Seriously Try If I Go to Another World",
                "animeNameJp": "無職転生 ～異世界行ったら本気だす～",
                "animePvUrl": "https://youtu.be/z92tu8SJCWU",
                "animeImage": "https://mushokutensei.jp/wp-content/themes/mushoku_re/img/index/img_hero13.jpg",
                "animePoster": "https://cdn.myanimelist.net/images/anime/1985/117326.jpg",
                "animeDescription": "A 34-year-old shut-in dies and is reincarnated in a magical world as Rudeus Greyrat. With memories of his past life, he decides to live his new life to the fullest, determined to truly change.",
                "animeRating": 8.7,
                "animeReleaseDate": 2021,
                "animeViews": 2800000,
                "animeStatus": "Ongoing",
                "animeGenres": ["Isekai", "Fantasy", "Drama", "Romance"],
                "animeStudio": ["Studio Bind"],
                "season": "fall",
            },
            {
                "animeId": "ABE5",
                "animeName": "No Game No Life",
                "animeNameJp": "ノーゲーム・ノーライフ",
                "animePvUrl": "https://youtu.be/aURf4qjZ1rM",
                "animeImage": "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                "animePoster": "https://cdn.myanimelist.net/images/anime/1075/111944.jpg",
                "animeDescription": "Sora and Shiro, sibling NEET gamers, are transported to a fantasy world where everything is decided through games. They set their sights on defeating the god of games to become the rulers of the new world.",
                "animeRating": 8.1,
                "animeReleaseDate": 2014,
                "animeViews": 2600000,
                "animeStatus": "Completed",
                "animeGenres": ["Isekai", "Comedy", "Fantasy", "Game"],
                "animeStudio": ["Madhouse"],
                "season": "summer",
            },
            {
                "animeId": "ABE6",
                "animeName": "Konosuba: God's Blessing on This Wonderful World!",
                "animeNameJp": "この素晴らしい世界に祝福を！",
                "animePvUrl": "https://youtu.be/Qx8uYnU2rEA",
                "animeImage": "https://m.media-amazon.com/images/M/MV5BNTQ5NzJjMjgtNDliNC00YTdmLWJiOTQtYWRiMzY4OWU5NGQ3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                "animePoster": "https://cdn.myanimelist.net/images/anime/8/77831.jpg",
                "animeDescription": "Kazuma Satou, a shut-in gamer, dies in a humiliating accident and is given a chance to be reborn in a fantasy world. Choosing to bring along the useless goddess Aqua, his comedic misadventures begin.",
                "animeRating": 8.2,
                "animeReleaseDate": 2016,
                "animeViews": 3000000,
                "animeStatus": "Ongoing",
                "animeGenres": ["Isekai", "Comedy", "Fantasy", "Parody"],
                "animeStudio": ["Studio Deen"],
                "season": "spring",
            },
            {
                "animeId": "KNGB",
                "animeName": "Kagurabachi",
                "animeNameJp": "カグラバチ",
                "animePvUrl": "https://youtu.be/Qx8uYnU2rEA",
                "animeImage": "https://readkagura.com/wp-content/uploads/2023/10/Kagurabachi_ch002_Issue_43_2023-701x1024.jpg",
                "animePoster": "https://readkagura.com/wp-content/uploads/2023/10/Kagurabachi_ch002_Issue_43_2023-701x1024.jpg",
                "animeDescription": "Set in a fictional near-modern Japan, the story follows Chihiro Rokuhira, a young man who uses cursed swords. After his famous swordsmith father is murdered and six powerful cursed blades are stolen, Chihiro sets out with his father’s old friend to retrieve the blades and avenge his father. He also guards the secret of the 7th blade, Futen. “Kagurabachi” is currently serialized in Weekly Shōnen Jump. Animation adaptation by Cygames Pictures has been announced. :contentReference[oaicite:0]{index=0}",
                "animeRating": 10.0,
                "animeReleaseDate": 2026,
                "animeViews": 12,
                "animeStatus": "Upcoming",
                "animeGenres": ["Action", "Fantasy", "Drama", "Supernatural"],
                "animeStudio": ["Cygames Pictures"],
                "season": "spring"
            }
        ]

        // Set original data
        setOriginalAnimeList(animeListTemp);
    }, []);

    useEffect(() => {
        if (originalAnimeList.length > 0) {
            applyUrlFilters();
        }
    }, [originalAnimeList, searchParams]);

    // Apply filters using the memoized payload
    useEffect(() => {
        if (originalAnimeList.length === 0) return;

        if (!FilterService.validateFilterPayload(filterPayload)) {
            console.warn('Invalid filter payload');
            return;
        }

        // Apply filters using FilterService
        const filteredResults = FilterService.applyFilters(originalAnimeList, filterPayload);
        setFilteredAnimeList(filteredResults);

    }, [originalAnimeList, filterPayload]); // Now only depends on memoized payload

    const formatViews = (views: number) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }
        return views.toLocaleString();
    };

    // Check if any filters are active using FilterService
    const hasActiveFilters = () => {
        return FilterService.hasActiveFilters(filterPayload, searchTerm);
    };

    // Clear all filters using FilterService
    const clearAllFilters = () => {
        const emptyPayload = FilterService.getEmptyFilterPayload();
        setFilterValues({
            genre: emptyPayload.genre || "",
            season: emptyPayload.season || "",
            year: emptyPayload.year || "",
            status: emptyPayload.status || ""
        });
        setSearchTerm(emptyPayload.search || "");
        setSelectedSort(emptyPayload.sortBy || "popularity");
    };

    // Filter Box
    const renderFilterBox = () => {
        if (filterVisibility) {
            return (
                <div className="flex flex-col border border-gray-800 rounded-md px-6 py-5 mt-4">
                    <div className={`font-semibold mb-4 ${isMobile ? "text-sm" : "text-xl"}`}>
                        <FilterListAltIcon className="mr-2"/>Advanced Filters
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filterOptions.map((filter) => (
                            <FormControl key={filter.key} variant="outlined" size="small">
                                <InputLabel
                                    className="text-white"
                                    id={`${filter.key}-label`}
                                    sx={{
                                        color: "white",
                                        "&.Mui-focused": {
                                            color: "#f8286c",
                                        },
                                    }}>
                                    {filter.label}
                                </InputLabel>
                                <Select
                                    labelId={`${filter.key}-label`}
                                    id={filter.key}
                                    value={filterValues[filter.key] || ""}
                                    onChange={(event: SelectChangeEvent) =>
                                        handleFilterChange(filter.key, event.target.value)
                                    }
                                    label={filter.label}
                                    IconComponent={ArrowDropDownOutlinedIcon}
                                    sx={{
                                        color: "white",
                                        "& .MuiInputLabel-root": {
                                            color: "#9ca3af",
                                            "&.Mui-focused": {
                                                color: "#f8286c",
                                            }
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#374151",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#f8286c",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#f8286c",
                                        },
                                        "& .MuiSelect-icon": {
                                            color: "white",
                                        },
                                    }}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {Array.isArray(filter?.options) &&
                                        filter.options.map((option) => (
                                            <MenuItem key={option.value ?? option.label} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        ))}
                    </div>

                    {hasActiveFilters() && (
                        <div className={`mt-4 flex ${isMobile ? "w-full" : "justify-end"}`}>
                            <Button
                                onClick={clearAllFilters}
                                variant="outlined"
                                size="medium"
                                sx={{
                                    width: isMobile ? "100%" : "auto",
                                    color: "white",
                                    background: "linear-gradient(135deg, hsl(347 87% 61%), hsl(315 80% 65%))",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, hsl(347 87% 55%), hsl(315 80% 58%))",
                                    },
                                }}>
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    // Handle Filter Box Visibility
    const handleFilterBoxVisibility = (
        _event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setFilterVisibility((prev) => !prev);
    };

    // Handle Sorting Change
    const handleSortChange = (
        event: SelectChangeEvent<any>
    ) => {
        setSelectedSort(event.target.value);
    };

    return (
        <div className={``}>
            <div className={`mt-5`}>
                <TextField
                    className="w-full"
                    hiddenLabel
                    id="searchBar"
                    variant="filled"
                    placeholder="Search anime title"
                    size={"small"}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{color: "white"}}/>
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                    }}
                    sx={{
                        input: {
                            color: "white",
                        },
                        "& .MuiFilledInput-root": {
                            backgroundColor: "transparent",
                            border: "2px solid #1f2937",
                            borderRadius: "8px",
                            "&.Mui-focused": {
                                border: "2px solid #F43F5E",
                            },
                        },
                    }}
                />
            </div>
            <div className={`flex flex-row justify-between mt-5`}>
                <Button
                    onClick={handleFilterBoxVisibility}
                    sx={{
                        fontSize: isMobile ? "13px" : "14px",
                        color: "white",
                        border: "1px solid #1f2937",
                    }}>
                    <TuneIcon className="mr-2"/>Filters {(hasActiveFilters()) ?
                    <span
                        className="ml-3 self-center w-fit rounded-2xl px-2 py-1 text-xs text-white bg-gradient-primary">
                        Active
                    </span> : ""
                }
                </Button>
                <div className="flex items-center">
                    {isMobile ? "" : <span className="mr-2">Sort by:</span>}
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
                            {sortByOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div>
                {renderFilterBox()}
            </div>
            <div>
                <div className={`mt-6 font-light ${isMobile ? "text-sm" : "text-xl"}`}>Search Result&nbsp;<span
                    className="text-gray-400">({filteredAnimeList.length + " found"})</span></div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
                    {filteredAnimeList?.map((anime: Anime) => {
                        return (
                            <Box
                                onClick={() => navigate(`/anime-detail/${anime.animeId}`)}
                                key={anime.animeId}
                                className={`${isMobile ? "h-[400px]" : "h-[520px]"} group cursor-pointer`}
                                sx={{
                                    border: '1px solid #212121',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        border: '1px solid #F43F5E',
                                        scale: '1.02',
                                        boxShadow: '0 8px 25px rgba(244, 63, 94, 0.15)'
                                    },
                                }}>

                                <Box
                                    className="relative"
                                    sx={{
                                        height: '60%',
                                        overflow: 'hidden',
                                        borderRadius: '8px 8px 0 0',
                                    }}>

                                    <Box
                                        style={{
                                            height: '100%',
                                            backgroundImage: `url('${anime.animeImage}')`,
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

                                    <div
                                        className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-row gap-3 items-center">
                                                <div className="text-white flex items-center text-xs sm:text-sm">
                                                    <StarIcon className="text-yellow-500 mr-1" sx={{ fontSize: isMobile ? 14 : 18 }} />
                                                    <span className="font-medium">{anime.animeRating}/10</span>
                                                </div>
                                                <div className="text-white flex items-center text-xs sm:text-sm">
                                                    <RemoveRedEyeOutlinedIcon sx={{ fontSize: isMobile ? 14 : 18 }} className="mr-1" />
                                                    <span className="font-medium">{formatViews(anime.animeViews)}</span>
                                                </div>
                                            </div>

                                            <div className="text-white flex items-center text-xs sm:text-sm">
                                                <CalendarMonthIcon sx={{ fontSize: isMobile ? 14 : 18 }} className="mr-1" />
                                                <span className="font-medium">{anime.animeReleaseDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                </Box>

                                <div
                                    className="flex flex-col justify-between h-2/5 p-4"
                                    style={{
                                        overflow: 'hidden',
                                    }}>

                                    <div className="flex flex-col">
                                        <h3 className={`font-semibold ${isMobile ? "text-sm" : "text-lg"} mb-2 line-clamp-2 text-white leading-tight`}>
                                            {anime.animeName}
                                        </h3>

                                        <p className={`text-gray-400 line-clamp-3 text-justify ${isMobile ? "text-xs" : "text-sm"} leading-relaxed`}>
                                            {anime.animeDescription}
                                        </p>
                                    </div>

                                    {anime.animeGenres && anime.animeGenres.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {anime.animeGenres.slice(0, 2).map((genre, index) => (
                                                <span
                                                    key={index}
                                                    className={`text-xs mr-1 px-3 py-1 bg-gray-700 border-black text-white rounded-full font-medium`}>
                                                    {genre}
                                                </span>
                                            ))}
                                            {anime.animeGenres.length > 2 && (
                                                <span
                                                    className="text-xs mr-1 px-3 py-1 bg-gray-700 border-black text-white rounded-full font-medium">+{anime.animeGenres.length - 2}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Box>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};