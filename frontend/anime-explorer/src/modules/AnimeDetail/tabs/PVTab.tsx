import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';

interface PVTabProps {
    animePvUrl: string;
}

export const PVTab = ({ animePvUrl }: PVTabProps) => {
    
    // Convert YouTube URL to embed format
    const getEmbedUrl = (url: string) => {
        try {
            if (url.includes("youtu.be/")) {
                // Short link
                const videoId = url.split("/").pop()?.split("?")[0];
                return `https://www.youtube.com/embed/${videoId}`;
            } else if (url.includes("youtube.com/watch")) {
                // Standard YouTube link
                const videoId = new URL(url).searchParams.get("v");
                return `https://www.youtube.com/embed/${videoId}`;
            }
            return url;
        } catch {
            return url;
        }
    };

    const embedUrl = getEmbedUrl(animePvUrl);
    
    return (
        <div className="border border-gray-800 rounded-md p-6">
            <div className="flex items-center text-xl font-bold text-white mb-5">
                <PlayCircleOutlineOutlinedIcon className="mr-2" /> Anime PV
            </div>

            <div>
                <iframe
                    className="xs:h-[300px] sm:h-[350px] md:h-[400px]"
                    src={embedUrl}
                    width="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="PV"
                    style={{ borderRadius: "8px" }}
                />
            </div>
        </div>
    );
};
