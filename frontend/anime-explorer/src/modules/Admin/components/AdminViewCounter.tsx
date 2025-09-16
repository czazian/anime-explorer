import {useDevice} from "../../../utils/MobileContext.tsx";
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MovieIcon from '@mui/icons-material/Movie';

export const AdminViewCounter = () => {
    const {isMobile} = useDevice();

    const tempCounter = [
        {label: "Total Users", count: 12123123, icon: GroupIcon},
        {label: "Total Anime", count: 13, icon: MovieIcon},
        {label: "News Articles", count: 14, icon: NewspaperIcon},
    ];

    return (
        <div className={`flex gap-3 w-full py-6 ${isMobile ? "flex-col" : "flex-row"}`}>
            {tempCounter.map((item, index) => {
                const Icon = item.icon;
                const color =
                    item.label === "Total Users" ? "text-blue-500"
                        : item.label === "Total Anime"
                            ? "text-green-500" : "text-purple-500";
                return (
                    <div
                        key={item.label}
                        className={`flex flex-1 flex-row justify-between items-center border border-color-[#F43F5E] rounded-lg py-4 px-6`}>
                        <div className={`flex flex-col`}>
                            <span className={`text-sm text-gray-400`}>{item.label}</span>
                            <span className={`text-2xl font-semibold ${color}`}>{item.count.toLocaleString()}</span>
                        </div>
                        <Icon fontSize="large" className={color}/>
                    </div>
                );
            })}
        </div>
    );
}