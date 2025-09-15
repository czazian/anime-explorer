import {useDevice} from "../../../utils/MobileContext.tsx";
import {TopDetail} from "../components/TopDetail.tsx";
import {WatchCounter} from "../components/WatchCounter.tsx";
import {WatchCounterList} from "../components/WatchCounterList.tsx";

const Profile = () => {
    const {isMobile} = useDevice();

    return (
        <div className={`flex flex-col w-full ${isMobile ? "px-5 py-6" : "px-[200px] py-12"}`}>
            <TopDetail />
            <WatchCounter />
            <WatchCounterList />
        </div>
    );
}

export default Profile;