import {AnimeCarousel} from "../components/AnimeCarousel.tsx";
import {HomeSelectionButton} from "../components/HomeSelectionButton.tsx";
import {HomeNews} from "../components/HomeNews.tsx";
import {useDevice} from "../../../utils/MobileContext.tsx";

const Home = () => {
    const { isMobile } = useDevice();
    
    return (
        <div className={`w-full ${isMobile ? "mb-7" : "mb-12"}`}>
            <AnimeCarousel />
            <div className={`${ isMobile ? "mx-8" : "mx-32" }`}>
                <HomeSelectionButton />
                <HomeNews />
            </div>
        </div>
    )
};

export default Home;
