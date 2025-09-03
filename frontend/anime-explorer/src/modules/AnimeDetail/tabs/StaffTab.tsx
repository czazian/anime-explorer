import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';

export const StaffTab = () => {
    const staffInfo = [
        {label: "Original Work", value: "Yuri Kitayama, Riv"},
        {label: "Director", value: "Osamu Yamasaki"},
        {label: "Series Composition", value: "Osamu Yamasaki"},
        {label: "Character Design", value: "Kyoko Yufu"},
        {label: "Art Director", value: "Takehiko Segawa"},
        {label: "Director of Photography", value: "Norimasa Teramoto"},
        {label: "Editor", value: "Keisuke Yanagi"},
        {label: "Sound Director", value: "Hiroto Morishita"},
        {label: "Music Composer", value: "Yasuyuki Yamazaki"},
        {label: "Animation Studio", value: "TMS Entertainment"},
        {label: "Casting Director (English Dub)", value: "Brittany Lauda"},
        {label: "English Voice Director", value: "Brittany Lauda"},
    ];

    return (
        <div className={`border border-gray-800 rounded-md p-6`}>
            <div className={`flex items-center text-xl font-bold text-white mb-6`}>
                <MovieCreationOutlinedIcon className={`mr-2`}/> Staff Details
            </div>

            <div className={`flex flex-row w-full`}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-10">
                    {staffInfo.map((item) => (
                        <div key={item.label} className="flex flex-col gap-2">
                            <span className="text-white text-base">
                                {item.label}
                            </span>
                            <span className="text-gray-400 text-sm">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}