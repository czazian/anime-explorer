import {useDevice} from "../../../utils/MobileContext.tsx";
import {AdminViewCounter} from "../components/AdminViewCounter.tsx";
import {AdminViewTable} from "../components/AdminViewTable.tsx";

const Admin = () => {
    const {isMobile} = useDevice();

    return (
        <div className={`flex flex-col w-full ${isMobile ? "px-5 py-6" : "px-[200px] py-12"}`}>
            <div className={`flex flex-col w-full ${ isMobile ? "gap-1.5" : "gap-2.5"}`}>
                <div className={`${isMobile ? "text-xl" : "text-4xl"} font-bold bg-gradient-primary bg-clip-text text-transparent`}>
                    Admin Dashboard
                </div>
                <div className={`${isMobile ? "text-sm" : "text-lg"} text-gray-400`}>
                    Manage users, anime, and news contents.
                </div>
            </div>
            <AdminViewCounter />
            <AdminViewTable />
        </div>
    );
}

export default Admin;