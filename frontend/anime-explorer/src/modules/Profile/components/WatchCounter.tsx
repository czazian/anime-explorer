import {useDevice} from "../../../utils/MobileContext.tsx";

export const WatchCounter = () => {
    const {isMobile} = useDevice();

    const tempCounter = [
        {label: "Watching", count: 1},
        {label: "Completed", count: 2},
        {label: "Plan to Watch", count: 3},
    ];

    return (
        <div className={`grid py-6 ${isMobile ? "grid-cols-2 gap-2" : "grid-cols-3 gap-4"}`}>
            {tempCounter.map((item, index) => (
                <div
                    key={item.label}
                    style={{transition: "border-color 0.2s ease-in-out"}}
                    className={`
                            hover:border-[#F43F5E] 
                            flex flex-col items-center justify-center
                            bg-[#0b0e13] border border-color-[#F43F5E] rounded-lg p-4
                            ${isMobile && index === 2 ? "col-span-2" : ""}
                      `}>
                      <span
                          className={`text-2xl font-bold ${
                              item.label === "Watching"
                                  ? "text-blue-500"
                                  : item.label === "Completed"
                                      ? "text-green-500"
                                      : "text-yellow-500"
                          }`}>
                        {item.count}
                      </span>
                    <span className="text-sm text-gray-400 mt-1">{item.label}</span>
                </div>
            ))}
        </div>
    );
};
