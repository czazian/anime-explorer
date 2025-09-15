import {useDevice} from "../../../utils/MobileContext.tsx";
import {useEffect} from "react";
import {TopBar} from "../components/TopBar.tsx";
import type {Anime} from "../../../model/Anime.ts";
import { DetailBox } from "../components/DetailBox.tsx";
import { DetailTab } from "../components/DetailTab.tsx";
import {WriteReviewBox} from "../components/WriteReviewBox.tsx";
import {MoveStatusBox} from "../components/MoveStatusBox.tsx";
import {useAuth} from "../../../utils/AuthContext.tsx";

const AnimeDetail = () => {
    const {isMobile} = useDevice();
    // const {animeId} = useParams<{ animeId: string }>();
    const {user} = useAuth();

    const anime: Anime = {
        "animeId": "ABE123",
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
    }

    useEffect(() => {
    }, []);

    return (
        <div className={`w-full ${isMobile ? "mb-7 px-6" : "mb-12 px-32"}`}>
            <div
                className={`absolute top-0 left-0 w-full h-[28rem]`}
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(16,12,20,0), #100c14), url(${anime.animePoster})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 80%",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>

            <div className={`relative z-10`}>
                <TopBar anime={anime}/>
                <div className={`${isMobile ? "flex-col" : "flex-row"} flex gap-3`}>
                    <div className={`${isMobile ? "w-full" : "w-8/12" } flex flex-col mt-10`}>
                        <DetailBox anime={anime} />
                        <DetailTab anime={anime} />
                    </div>

                    <div className={`${isMobile ? "w-full mt-5" : "w-4/12 mt-10" } flex flex-col gap-4`}>
                        { user ? <MoveStatusBox /> : null }
                        <WriteReviewBox />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimeDetail;