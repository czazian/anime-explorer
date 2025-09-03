import {useDevice} from "../../../utils/MobileContext.tsx";
import {Button} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {NewsDetailContent} from "../components/NewsDetailContent.tsx";
import {NewsDetailTopInfo} from "../components/NewsDetailTopInfo.tsx";
import {NewsShareBox} from "../components/NewsShareBox.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

const NewsDetail = () => {
    // Get data from Path Param
    const newsId = useParams().newsId;
    
    const {isMobile} = useDevice();
    const navigate = useNavigate();

    const news = {
        "newsId": "n3",
        "newsTitle": "Seirei Gensouki: Spirit Chronicles Season 2 Update",
        "newsDescription": "The production committee for Seirei Gensouki: Spirit Chronicles has released a major update regarding the highly anticipated Season 2. The series, which gained a devoted fanbase after its first season, will continue to follow Haruto Amakawa’s reincarnation as Rio in a fantasy world filled with political struggles, magic, and destiny.",
        "newsPoster": "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/11/20112704173133.jpg",
        "newsContent": "The long-awaited continuation of Seirei Gensouki: Spirit Chronicles has finally been confirmed, and fans of the isekai fantasy series can now look forward to Season 2 with renewed anticipation. Ever since the first season concluded, viewers have been eager to learn what lies ahead for Rio, the young man who carries the memories of Haruto Amakawa from his previous life in Japan. The upcoming season promises to delve deeper into Rio’s journey, both as a warrior of incredible potential and as an individual searching for the truth behind his reincarnation.<br/><br/>According to the production committee, the new season will adapt some of the most pivotal arcs from the original light novel. This means that the anime will not only continue Rio’s quest for vengeance and justice but also explore the intricate relationships he forges along the way. Characters who were briefly introduced in the first season are expected to play a much larger role, expanding the story’s scope and adding layers of political intrigue, emotional drama, and magical conflict. For long-time fans of the novels, these developments mark a significant step forward in faithfully translating the source material onto the screen.<br/><br/>One of the most exciting aspects of Season 2 is the promise of improved animation quality. The studio has acknowledged feedback from viewers regarding the first season’s visuals and has assured fans that greater resources will be dedicated to enhancing the overall production. With battles expected to reach even greater intensity, the visual spectacle of magic, swordsmanship, and large-scale confrontations will be a highlight of the series. The staff also revealed that the character designs would undergo minor adjustments to more closely reflect the artwork from the novels, creating a sense of authenticity for devoted readers.<br/><br/>Beyond the action and visuals, Season 2 will focus heavily on character development. Rio’s struggle with his dual identity—being both Haruto from Japan and Rio from this new world—will take center stage. This internal conflict is expected to shape many of his decisions, influencing how he interacts with allies, enemies, and the political powers that surround him. Additionally, the bonds Rio forms with key characters, such as Miharu and Celia, are set to evolve in meaningful ways that will resonate deeply with audiences.<br/><br/>The announcement also included a teaser about the music, which has always been an integral part of the anime’s atmosphere. Popular Japanese artists will once again be involved in producing the opening and ending themes, while the background score will be expanded to include new compositions that capture the emotional highs and lows of Rio’s journey. Music has the power to elevate storytelling, and fans are eager to see how these new pieces will shape the mood of critical moments in Season 2.<br/><br/>Fans have been actively discussing theories online, speculating about how far the second season will progress in the light novel’s timeline. Some believe that the season may adapt up to the point where Rio faces one of his most challenging adversaries yet, while others think the anime will carefully pace itself to allow for future seasons. Either way, the confirmation of Season 2 has sparked renewed interest in the franchise, with light novel and manga sales seeing a noticeable boost since the announcement.<br/><br/>Ultimately, Seirei Gensouki: Spirit Chronicles Season 2 represents not only the continuation of Rio’s adventure but also the growth of a franchise that has steadily gained recognition in the crowded isekai genre. With a compelling mix of action, drama, romance, and mystery, the new season has the potential to capture the hearts of both returning fans and newcomers. As the release date draws closer, anticipation continues to build, and expectations remain high. One thing is certain: Rio’s story is far from over, and the next chapter promises to be his most thrilling yet.",
        "newsAuthor": "Anime Corner",
        "newsPostDate": 1643673600000,
    }

    useEffect(() => {
        
    }, []);
    
    return (
        <div className={`flex flex-col w-full ${isMobile ? "px-5 py-6" : "px-[200px] py-12"}`}>
            <Button
                onClick={() => navigate('/news') }
                className={`bg-gradient-primary`}
                sx={{
                    width: "fit-content",
                    borderRadius: "1rem",
                    padding: "5px 8px 5px 4px",
                    color: "white",
                    fontSize: isMobile ? "9px" : "12px",
                }}>
                <ArrowBackIosNewOutlinedIcon fontSize="small" className={`mr-1`}/>Back to News
            </Button>
            
            <div className={`flex flex-col`}>
                <div>
                    <NewsDetailTopInfo news={news}/>
                </div>
                <div>
                    <NewsDetailContent news={news}/>
                </div>
                <div>
                    <NewsShareBox />
                </div>
            </div>
        </div>
    );
}

export default NewsDetail;