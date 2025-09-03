import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDevice} from "../../../utils/MobileContext.tsx";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface NewsDetailTopInfoProp {
    news: News;    
}

export const NewsDetailTopInfo = ({news}: NewsDetailTopInfoProp) => {
    const {isMobile} = useDevice();

    // Determine number of read time
    const estimateReadingTime = (content: string, wordsPerMinute: number = 200) => {
        if (!content) return 0;

        const words = content.trim().split(/\s+/).length;
        const minutes = words / wordsPerMinute;

        return Math.ceil(minutes);
    }

    const formatDate = (date: number) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    useEffect(() => {

    }, [])

    return (
        <div className={`${isMobile ? "mt-6" : "mt-10"}`}>
            <div className={`text-gray-400 gap-3 flex flex-wrap items-center text-xs`}>
                <div
                    className="mt-1 flex flex-row justify-between items-center rounded-2xl px-2 py-1 text-xs mb-1.5 text-white bg-gradient-accent">
                    <PersonOutlineOutlinedIcon
                        className="mr-1"
                        sx={{fontSize: isMobile ? '14px' : '18px'}}/>
                    <p>By&nbsp;{news.newsAuthor}</p>
                </div>
                <div className={`flex gap-3`}>
                    <div className="flex flex-row justify-between items-center">
                        <CalendarMonthIcon
                            className="mr-1"
                            sx={{fontSize: isMobile ? '14px' : '18px'}}/>
                        <p>{formatDate(news.newsPostDate)}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <AccessTimeOutlinedIcon
                            className="mr-1"
                            sx={{fontSize: isMobile ? '14px' : '18px'}}/>
                        <p>{estimateReadingTime(news.newsContent + news.newsTitle + news.newsDescription)}&nbsp;min
                            read</p>
                    </div>
                </div>
            </div>

            <div className={`${isMobile ? "my-2" : "my-4"}`}>
                <div className={`font-bold text-white ${isMobile ? "text-lg" : "text-4xl"}`}>
                    {news.newsTitle}
                </div>
                <div
                    className={`mt-2 fond-semibold text-gray-400 leading-7 text-justify ${isMobile ? "text-xs leading-5" : "text-base leading-7"}`}>
                    {news.newsDescription}
                </div>
            </div>
        </div>
    );
}