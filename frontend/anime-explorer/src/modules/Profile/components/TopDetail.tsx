import {Box, Button} from "@mui/material";
import {useState} from "react";
import Avatar from "../../../assets/avatar.png";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {useDevice} from "../../../utils/MobileContext.tsx";
import EditIcon from '@mui/icons-material/Edit';
import {EditModal} from "./EditModal.tsx";
import {useAuth} from "../../../utils/AuthContext.tsx";

export const TopDetail = () => {
    const {isMobile} = useDevice();
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);

    const formatDate = (date: number) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    return (
        <div
            className={`flex justify-between border border-gray-800 rounded-md px-6 py-8 relative ${isMobile ? "flex-col" : "flex-row"}`}>
            <div className={`bg-gradient-primary absolute top-0 w-full left-0 rounded-t-md ${isMobile ? "min-h-3" : "min-h-2"}`}></div>
            <div className={`${isMobile ? "flex-col gap-2" : "flex-row gap-7 mr-10"} flex flex-row`}>
                <Box
                    sx={{
                        border: "4px solid #1F2937",
                        width: isMobile ? 100 : 120,
                        height: isMobile ? 100 : 120,
                        overflow: "hidden",
                        borderRadius: "50%",
                        flexShrink: 0,
                        backgroundColor: "white",
                    }}>
                    {user?.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt={user.username}
                            width={isMobile ? 100 : 120}
                            height={isMobile ? 100 : 120}
                        />
                    ) : (
                        <img
                            src={Avatar}
                            alt="No Profile"
                            width={isMobile ? 100 : 120}
                            height={isMobile ? 100 : 120}
                        />
                    )}
                </Box>

                <div className={`flex flex-col`}>
                    <div className={`flex flex-col ${isMobile ? "gap-1" : "gap-3"}`}>
                        <div className={`font-bold ${isMobile ? "text-lg" : "text-3xl"}`}>{user?.username}</div>
                        <div className={`text-sm text-gray-400`}><CalendarTodayIcon fontSize="small"
                                                                      className="mr-1 mb-1"/>Joined&nbsp;{user?.createdAt ? formatDate(user.createdAt) : ""}
                        </div>
                    </div>
                    <div
                        className={`text-sm mt-4 text-gray-400 text-justify leading-6`}>{user?.profileDescription ? user?.profileDescription : "This user hasn’t added a profile description..."}</div>
                </div>
            </div>

            <div style={{display: "flex", marginTop: "auto", height: "100%"}}>
                <Button onClick={() => setModalOpen(true)}
                        sx={{minWidth: "115px", textTransform: "capitalize", color: "white", fontWeight: "500", fontSize: "13px", marginTop: isMobile ? "20px" : "", width: isMobile ? "100%" : "fit-content"}}
                        className="bg-gradient-primary hover:opacity-[0.9]">
                    <EditIcon className="mr-1"/> Edit Profile
                </Button>
            </div>

            {modalOpen && (
                <EditModal onClose={() => setModalOpen(false)}/>
            )}
        </div>
    );
};
