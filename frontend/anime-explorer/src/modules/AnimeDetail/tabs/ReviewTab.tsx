import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import StarIcon from "@mui/icons-material/Star";
import {Box} from "@mui/material";
import {useDevice} from "../../../utils/MobileContext.tsx";

interface ReviewTabProps {
    animeRating: number;
}

export const ReviewTab = ({animeRating}: ReviewTabProps) => {
    const {isMobile} = useDevice();
    
    // Dummy Data
    const reviews = [
        {
            userProfile: "https://i.redd.it/3wlrfietzzq31.jpg",
            userName: "See What See Cat",
            commentRate: 8,
            comment: "Really enjoyed the animation and the soundtrack! The fight scenes in *Seirei Gensouki* are fluid and well-choreographed, and the emotional moments between Haruto and his friends really hit hard. The pacing was good, though some arcs felt a bit rushed.",
            reviewDate: 1690000000000,
        },
        {
            userProfile: "https://i.pinimg.com/474x/bd/11/2e/bd112ed9778777fa06c0c7222e0865bb.jpg",
            userName: "無語 Cat",
            commentRate: 7,
            comment: "Good storyline overall, but pacing felt a bit slow in the middle. I liked how *Seirei Gensouki* explores the reincarnation theme and Haruto's struggle with his new life, though I wish some supporting characters were developed a bit more.",
            reviewDate: 1690100000000,
        },
        {
            userProfile: "https://yt3.googleusercontent.com/VJaJ5jBfbIpBhnLKPGIiAhoZmo3rI3WkT4BusYdr50kvA4cjVjpkrUeVwdExMy1kVBOEvlH0=s900-c-k-c0x00ffffff-no-rj",
            userName: "WTH Cat",
            commentRate: 9,
            comment: "Amazing visuals! Definitely recommend watching it in IMAX if possible. *Seirei Gensouki*’s magical battles and city landscapes are beautifully rendered, and the music complements every emotional scene perfectly. One of the best fantasy anime I've seen recently.",
            reviewDate: 1690200000000,
        },
    ];

    return (
        <div className="border border-gray-800 rounded-md p-6">
            <div className="flex items-center justify-between text-xl font-bold text-white mb-4">
                <div>
                    <CommentOutlinedIcon className="mr-2"/> Reviews ({reviews.length})
                </div>
                <div className="text-lg flex items-center">
                    <StarIcon className="text-yellow-500 mr-1 mb-1"/>{animeRating} / 10
                </div>
            </div>

            <div className="flex flex-col gap-3.5 text-white">
                {reviews.map((review) => (
                    <div key={review.userName} className={`${isMobile ? 'p-3' : ' p-6'} flex flex-row w-full gap-4 border border-gray-800 rounded-md`}>
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                overflow: 'hidden',
                                borderRadius: '50%',
                                flexShrink: 0
                            }}>
                            <img
                                src={review.userProfile}
                                alt={review.userName}
                                width="70"
                                height="70"
                            />
                        </Box>

                        <div className={`flex flex-col gap-1 w-full`}>
                            <div className={`${isMobile ? 'flex-col' : 'flex-row'} flex flex-row justify-between`}>
                                <div className={`font-semibold ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                    <span className={`mr-2 ${isMobile ? 'text-sm' : 'text-base'}`}>{review.userName}</span>
                                    <StarIcon className="text-yellow-500 mb-1 mr-1"/>
                                    <span>{review.commentRate} / 10</span>
                                </div>
                                
                                <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300`}>
                                    {new Date(review.reviewDate).toLocaleString()}
                                </div>
                            </div>
                            <div className={`text-gray-400 leading-6 ${isMobile ? 'text-xs' : 'text-sm'} text-justify`}>{review.comment}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
