import type {News} from "../../../model/News.ts";
import {Box, Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useNavigate} from "react-router-dom";
import {useDevice} from "../../../utils/MobileContext.tsx";

export const HomeNews = () => {
    const { isMobile } = useDevice();
    const navigate = useNavigate();

    // const maxNewsCount = 2;

    // Dummy Data 
    const newsList = [
        {
            "newsId": "n1",
            "newsTitle": "Attack on Titan: The Final Season Concludes",
            "newsDescription": "The long-awaited finale of Attack on Titan airs this week.",
            "newsPoster": "https://images.immediate.co.uk/production/volatile/sites/3/2023/10/AttackonTitanFinalSeasonTHEFINALCHAPTERSSpecial1Still1.6-Cropped-5843dc9.jpg?resize=768,576",
            "newsContent": "After years of anticipation, Attack on Titan's final season has reached its epic conclusion. Fans around the world are tuning in to witness the end of Eren Yeager's journey.",
            "newsAuthor": "Anime Times",
            "newsPostDate": 1693651200000,
            "newsTypes": "Announcement"
        },
        {
            "newsId": "n2",
            "newsTitle": "Demon Slayer Season 4 Announced",
            "newsDescription": "Ufotable confirms the Hashira Training arc adaptation. Ufotable confirms the Hashira Training arc adaptation. Ufotable confirms the Hashira Training arc adaptation. Ufotable confirms the Hashira Training arc adaptation. Ufotable confirms the Hashira Training arc adaptation.",
            "newsPoster": "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
            "newsContent": "Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase. Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase. Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase. Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase. Demon Slayer: Kimetsu no Yaiba will continue with the Hashira Training arc. A teaser visual and PV have been released, building hype among the fanbase.",
            "newsAuthor": "Otaku Journal",
            "newsPostDate": 1696005600000,
            "newsTypes": "Story"
        },
    ]

    return (
        <div className="w-full flex flex-col">
            <div className={`mb-4 w-full flex flex-row justify-between`}>
                <div className={` ${isMobile ? "text-2xl" : "text-3xl"} font-bold`}>Latest News</div>
                <Button
                    onClick={() => navigate("/news")}
                    sx={{
                        textIndent: "capitalize",
                        color: "white",
                        border: '1px solid darkgray',
                        borderRadius: '5px',
                        padding: '4px 8px',
                        fontSize: isMobile ? '10px' : '12px',
                        '&:hover': {
                            background: 'linear-gradient(135deg, hsl(347 87% 61%), hsl(315 80% 65%));',
                            border: '1px solid black'
                        }
                    }}>
                    View All <ArrowForwardIosIcon sx={{fontSize: '15px', marginLeft: '3px'}}/>
                </Button>
            </div>
            <div className="w-full flex flex-row justify-between gap-5">
                {
                    newsList.map((news: News) => {
                        return (
                            <Box
                                onClick={() => navigate(`/news/${news.newsId}`)}
                                key={news.newsId}
                                className={`${isMobile ? "w-full h-[300px]" : "w-1/2 h-[500px]"} group`}
                                sx={{
                                    border: '1px solid #212121',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    transition: 'border-color 0.2s ease-in-out',
                                    '&:hover': {
                                        border: '1px solid #F43F5E'
                                    },
                                }}>
                                <Box
                                    sx={{
                                        height: '60%',
                                        overflow: 'hidden',
                                        borderRadius: '8px 8px 0 0',
                                    }}>
                                    <Box
                                        style={{
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
                                        zIndex: '99',
                                        overflow: 'hidden',
                                        height: '40%',
                                        padding: isMobile ? '8px' : '16px',
                                    }}
                                    className="flex flex-col justify-between">
                                    <div className="flex flex-col w-full mb-4">
                                        <div
                                            className={`font-semibold ${isMobile ? "text-base" : "text-xl"} mb-2 line-clamp-1`}>
                                            {news.newsTitle}
                                        </div>
                                        <div
                                            className={`text-gray-400 line-clamp-3 text-justify ${isMobile ? "text-sm" : "text-base"}`}>
                                            {news.newsDescription}
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center">
                                        <div className={`text-gray-400 flex items-center ${isMobile ? "text-xs" : "text-sm"}`}>
                                            <CalendarMonthIcon
                                                className="mr-1"
                                                sx={{ fontSize: isMobile ? '14px' : '18px' }}
                                            />
                                            <p>{new Date(news.newsPostDate!).toLocaleDateString()}</p>
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
                                            }}
                                        >
                                            Read More
                                        </Button>
                                    </div>
                                </div>
                            </Box>
                        );
                    })
                }
            </div>
        </div>
    );
}