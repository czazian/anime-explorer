import {SearchTopBar} from "../components/SearchTopBar.tsx";
import {useDevice} from "../../../utils/MobileContext.tsx";

const Search = () => {
    const {isMobile} = useDevice();


    return (
        <div className={`flex flex-col w-full ${ isMobile ? "px-4 py-6" : "px-[200px] py-12" }`}>
            <div className={`flex flex-col w-full ${ isMobile ? "gap-1.5" : "gap-2.5"}`}>
                <div className={`${isMobile ? "text-xl" : "text-4xl w-full"} font-bold bg-gradient-primary bg-clip-text text-transparent`}>
                    Discover Anime
                </div>
                <div className={`${isMobile ? "text-sm" : "text-lg"} text-gray-400`}>
                    Search through thousands of anime titles and find your next favorite
                </div>
            </div>
            <div>
                <SearchTopBar />
            </div>
        </div>
    );
}

export default Search;