import {useDevice} from "../../../utils/MobileContext.tsx";
import { RankingContent } from "../components/RankingContent.tsx";

const Ranking = () => {
    const {isMobile} = useDevice();

    return (
        <div className={`flex flex-col w-full ${ isMobile ? "px-4 py-6" : "px-[200px] py-12" }`}>
            <div className={`flex flex-col w-full ${ isMobile ? "gap-1.5" : "gap-2.5"}`}>
                <div className={`${isMobile ? "text-xl" : "text-4xl w-full"} font-bold bg-gradient-primary bg-clip-text text-transparent`}>
                    Anime Rankings
                </div>
                <div className={`${isMobile ? "text-sm" : "text-lg"} text-gray-400`}>
                    Discover the highest-rated anime based on community votes
                </div>
            </div>
            <div>
                <RankingContent />
            </div>
        </div>
    );
}

export default Ranking;