export const WatchCounter = () => {
    const tempCounter = [
        { label: "Watching", count: 1 },
        { label: "Completed", count: 2 },
        { label: "Plan to Watch", count: 3 },
    ];

    return (
        <div className="flex gap-4 py-6">
            {tempCounter.map((item) => (
                <div
                    style={{
                        transition: 'border-color 0.2s ease-in-out',
                    }}
                    key={item.label} className="hover:border-[#F43F5E] flex-1 flex flex-col items-center justify-center bg-[#0b0e13] border border-color-[#F43F5E] rounded-lg p-4">
                    <span className={`text-2xl font-bold text-white ${item.label === "Watching"? "text-blue-500" : item.label === "Completed" ? "text-green-500" : "text-yellow-500"}`}>{item.count}</span>
                    <span className="text-sm text-gray-400 mt-1">{item.label}</span>
                </div>
            ))}
        </div>
    );
};
