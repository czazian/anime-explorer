import {useState, useEffect, type SetStateAction} from 'react';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Button} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type {Anime} from "../../../model/Anime.ts";
import {useDevice} from "../../../utils/MobileContext.tsx";

export const AnimeCarousel = () => {
    const {isMobile} = useDevice();
    const [currentIndex, setCurrentIndex] = useState(0);

    // const maxNumberOfSlides = 5;

    // Put Dummy Value 1st
    const animeList: Anime[] = [
        {
            "animeId": "ABE123",
            "animeName": "Attack on Titan: The Final Season Part 1",
            "animeImage": "",
            "animePoster": "https://images.immediate.co.uk/production/volatile/sites/3/2023/10/AttackonTitanFinalSeasonTHEFINALCHAPTERSSpecial1Still1.6-Cropped-5843dc9.jpg?resize=768,576",
            "animeDescription": "The final season begins with Eren and his allies facing new threats beyond the walls.",
            "animeRating": 9.5,
            "animeReleaseDate": 2021,
            "animeViews": 1500000,
            "animeStatus": "Completed",
            "animeGenres": ["Action", "Drama", "Fantasy"]
        },
        {
            "animeId": "ABE123",
            "animeName": "Seirei Gensouki: Spirit Chronicles",
            "animeImage": "",
            "animePoster": "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
            "animeDescription": "After losing his mother, Rio survives in slums. He awakens with memories of Haruto, who died yearning to reunite with his friend, realizing he reincarnated in a world of swords and sorcery with his past life intersecting his current one.",
            "animeRating": 7.4,
            "animeReleaseDate": 2021,
            "animeViews": 1200000,
            "animeStatus": "Completed",
            "animeGenres": ["Isekai", "Sword and Fantasy", "Action"]
        },
        {
            "animeId": "ABE123",
            "animeName": "Jujutsu Kaisen",
            "animeImage": "",
            "animePoster": "https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABRVD1eaJ-R2Kr9oKSMqUlkbdqKutx7FKwwZfs8lR2f9c5aCpdLcvMhp9QIHF4qoIoskosvQseJO9-v0pv0b3I7EWdPUXmaTe39ZA.jpg?r=f5b",
            "animeDescription": "Yuji Itadori joins a secret organization to fight against curses after ingesting a powerful cursed object.",
            "animeRating": 8.9,
            "animeReleaseDate": 2020,
            "animeViews": 1100000,
            "animeStatus": "Ongoing",
            "animeGenres": ["Action", "Supernatural", "Dark Fantasy"]
        },
        {
            "animeId": "ABE123",
            "animeName": "The Apothecary Diaries",
            "animeImage": "",
            "animePoster": "https://m.media-amazon.com/images/S/pv-target-images/7cf7b192dcef1221ff0c707c397e5298dec04d667df2251d1c25aa12e2a2b339.jpg",
            "animeDescription": "A young maiden is kidnapped and sold into servitude at the emperor's palace, where she secretly employs her pharmacist skills with the help of the head eunuch to unravel medical mysteries in the inner court.",
            "animeRating": 8.6,
            "animeReleaseDate": 2023,
            "animeViews": 1000000,
            "animeStatus": "Completed",
            "animeGenres": ["Medical Anime", "Drama", "Slice of Life"]
        },
    ];

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === animeList.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change every 5 secs

        return () => clearInterval(interval);
    }, [animeList.length]);

    const formatViews = (views: number) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }
        return views.toLocaleString();
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === animeList.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? animeList.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: SetStateAction<number>) => {
        setCurrentIndex(index);
    };

    const currentAnime: Anime = animeList[currentIndex];

    return (
        <div
            className="relative w-full border rounded-lg shadow-lg overflow-hidden"
            style={{
                height: isMobile ? "600px" : "550px",
                backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0)),
                  url('${currentAnime.animePoster}')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            <div className={`flex h-full ${isMobile ? "gap-3" : "gap-6"} `}>
                <div
                    className={`flex flex-col justify-center min-w-0 w-full ${isMobile ? "px-4 py-10 gap-3" : "px-[6rem] gap-6"}`}>
                    <div className={` ${isMobile ? "w-full" : "w-2/3"} `}>
                        <h2 className="font-bold mb-2 text-white" style={{fontSize: isMobile ? "30px" : "50px"}}>
                            {currentAnime.animeName}
                        </h2>
                        <p className="text-white leading-relaxed line-clamp-3"
                           style={{fontSize: isMobile ? "14px" : "18px", lineHeight: isMobile ? "24px" : "28px"}}>
                            {currentAnime.animeDescription}
                        </p>
                    </div>

                    <div className="flex items-center gap-6 mb-3 flex-wrap">
                        <div className="flex items-center">
                            <span className="text-yellow-500"><StarIcon/></span>
                            <span className={`${isMobile ? "text-[14px]" : "text-lg"} ml-1 font-semibold`}>
                              {currentAnime.animeRating}
                            </span>
                        </div>

                        <span className={`${isMobile ? "text-[14px]" : "text-base"} text-white flex items-center`}>
                            <CalendarTodayIcon/>&nbsp;{currentAnime.animeReleaseDate}
                        </span>

                        <span className={`${isMobile ? "text-[14px]" : "text-base"}`}>
                            <VisibilityIcon/>&nbsp;{formatViews(currentAnime.animeViews)} views
                        </span>

                        <span
                            className={`${isMobile ? "text-[12px]" : "text-base"} px-3 py-1 bg-[#F43F5E] text-white rounded-full`}>
                            {currentAnime.animeStatus}
                        </span>
                    </div>

                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {currentAnime.animeGenres?.map((genre, index) => (
                                <span
                                    key={index}
                                    className={`${isMobile ? "text-[12px]" : "text-sm"} px-3 py-1 bg-gray-700 border-black text-white rounded-full font-medium`}>
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-row gap-3.5">
                        <Button
                            variant="contained"
                            disableElevation
                            className="bg-gradient-primary"
                            sx={{
                                fontSize: isMobile ? "0.75rem" : "1rem",
                                color: "#fff",
                                borderRadius: "8px",
                            }}>
                            {isMobile ? '' : <InfoIcon sx={{mr: 1}}/>} More Info
                        </Button>

                        <Button
                            variant="contained"
                            disableElevation
                            className={` ${isMobile ? "flex flex-row justify-center w-full flex-1" : ''} `}
                            sx={{
                                backgroundColor: "#1f2937",
                                fontSize: isMobile ? "0.75rem" : "1rem",
                                color: "#fff",
                                borderRadius: "8px",
                                border: "1px solid #111827",
                                "&:hover": {
                                    backgroundColor: "#374151"
                                }
                            }}>
                            {isMobile ? '' : <FavoriteIcon sx={{mr: 1}}/>} Add To Favourite
                        </Button>
                    </div>

                </div>
            </div>

            <div>
                <button
                    onClick={prevSlide}
                    className={`absolute left-4 
                              ${isMobile ? "bottom-2" : "top-1/2 -translate-y-1/2"} 
                              bg-gray-700 bg-opacity-50 hover:bg-opacity-70 
                              text-white px-2 py-2 rounded-full transition-all duration-200`}
                    aria-label="Previous anime">
                    <ChevronLeftIcon/>
                </button>

                <button
                    onClick={nextSlide}
                    className={`absolute right-4 
                              ${isMobile ? "bottom-2" : "top-1/2 -translate-y-1/2"} 
                              bg-gray-700 bg-opacity-50 hover:bg-opacity-70 
                              text-white px-2 py-2 rounded-full transition-all duration-200`}
                    aria-label="Next anime">
                    <ChevronRightIcon/>
                </button>
            </div>


            <div
                className={`absolute left-1/2 transform -translate-x-1/2 flex gap-2 ${isMobile ? "bottom-0" : "bottom-4"} `}>
                {animeList.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 mb-6 rounded-full transition-all duration-200 ${
                            index === currentIndex
                                ? 'bg-red-600'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to anime ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
