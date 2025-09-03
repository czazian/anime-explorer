import type {Anime} from "../../../model/Anime.ts";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {useDevice} from "../../../utils/MobileContext.tsx";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {IconButton} from "@mui/material";

type AnimeDetailProps = {
    anime: Anime;
};
export const DetailBox = ({anime}: AnimeDetailProps) => {
    const { isMobile } = useDevice();

    const formattedDate = new Date(anime.animeReleaseDate!, 0, 1).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    return (
        <div className={`${isMobile ? "flex-col items-center gap-7 !text-xs" : "flex-row"} min-h-[350px] flex w-full border border-gray-800 rounded-md p-6`}>
            <div className={`anime-image w-[200px] h-[300px] flex-shrink-0 rounded-md`}
                 style={{
                     backgroundImage: `url(${anime.animeImage})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                     backgroundRepeat: "no-repeat",
                 }}>
            </div>
            <div className={`anime-details flex-col flex gap-4 ml-5 text-xs}`}>
                <div className={`flex flex-row flex-wrap gap-3 items-center justify-between`}>
                    <div>
                        <span className={`px-3 py-1 text-sm bg-[#F43F5E] text-white rounded-full`}>
                            {anime.animeStatus}
                        </span>
                    </div>
                    <IconButton
                        disableRipple
                        sx={{
                            color: '#F43F5E',
                            padding: 0,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: '#d02649',
                            },
                        }}>
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                </div>
                <div>
                    <ul className={`flex flex-col gap-2`}>
                        <li><CalendarTodayIcon className={`mr-2`} />{ formattedDate }</li>
                        <li><RemoveRedEyeOutlinedIcon className={`mr-2`} />{ anime.animeViews.toLocaleString() }&nbsp;views</li>
                    </ul>
                </div>
                <div className={`${isMobile ? "flex flex-wrap gap-1 text-center" : ""}`}>
                    <span className={`mr-2 text-base`}>Genres:</span>
                    {anime.animeGenres?.map((genre) => (
                        <span key={genre} 
                              className={`text-xs mr-1 px-3 py-1 bg-gray-700 border-black text-white rounded-full font-medium`}>
                            {genre}
                        </span>
                    ))}
                </div>
                <div>
                    <span className={`mr-2 text-base`}>Studios:</span>
                    {anime.animeStudio?.map((studio, index) => (
                        <span key={studio}>
                            {studio}{index < anime.animeStudio!.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
                <div className={`text-justify text-gray-400 leading-6 text-[13px]`}>
                    { anime.animeDescription }
                </div>
            </div>
        </div>
    );
}