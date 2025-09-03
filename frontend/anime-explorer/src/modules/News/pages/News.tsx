import { useDevice } from "../../../utils/MobileContext.tsx";
import { NewsBox } from "../components/NewsBox.tsx";

const News = () => {
    const { isMobile } = useDevice();

    return (
      <div className={`flex flex-col w-full ${ isMobile ? "px-5 py-6" : "px-[200px] py-12" }`}>
          <div className={`flex flex-col w-full ${ isMobile ? "gap-1.5" : "gap-2.5"}`}>
              <div className={`${isMobile ? "text-xl" : "text-4xl"} font-bold bg-gradient-primary bg-clip-text text-transparent`}>
                  Anime News
              </div>
              <div className={`${isMobile ? "text-sm" : "text-lg"} text-gray-400`}>
                  Stay updated with the latest anime news and announcements
              </div>
          </div>
          <div>
              <NewsBox />
          </div>
      </div>  
    );
}

export default News;