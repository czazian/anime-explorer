import { useDevice } from "../../../utils/MobileContext.tsx";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useMessageService } from "../../../share-component/MessageService.tsx";

export const NewsShareBox = () => {
    const { isMobile } = useDevice();
    const location = useLocation();
    const { showMessage } = useMessageService();

    const copyShareUrl = async () => {
        const url = window.location.origin + location.pathname + location.search + location.hash;

        try {
            await navigator.clipboard.writeText(url);
            showMessage({
                message: "Share URL copied to clipboard",
                severity: "success",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "top", horizontal: "center" }
            });
        } catch (err) {
            console.error("Failed to copy URL:", err);
        }
    };


    return (
        <div className={`${isMobile ? "p-4" : "px-8"} w-full border border-gray-700 py-6 my-5 rounded-xl flex flex-row justify-between`}>
            <div className="flex flex-col gap-1">
                <div className={`font-bold ${isMobile ? "text-base" : "text-2xl"}`}>Share this news</div>
                <div className={`text-gray-400 ${isMobile ? "text-xs" : "text-base"}`}>Help spread the word about this news</div>
            </div>
            <Button
                className="bg-gradient-primary"
                onClick={copyShareUrl}
                sx={{
                    alignSelf: "center",
                    height: "100%",
                    color: 'white',
                    paddingY: "8px"
                }}
            >
                <ShareOutlinedIcon className="mr-2" /> { isMobile ? "" : "Share" }
            </Button>
        </div>
    );
};
