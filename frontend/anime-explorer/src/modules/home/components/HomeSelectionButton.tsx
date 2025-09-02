import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDevice } from "../../../utils/MobileContext.tsx";

export const HomeSelectionButton = () => {
    const navigate = useNavigate();
    const { isMobile } = useDevice();

    const buttonList = [
        {
            icon: TrendingUpIcon,
            text: 'Top Rated',
            desc: 'Discover the highest-rated anime',
            bgStyle: 'bg-gradient-primary',
            iconSize: 45,
            redirectTo: '/ranking'
        },
        {
            icon: CalendarTodayIcon,
            text: 'Upcoming',
            desc: 'See what\'s releasing soon',
            bgStyle: 'bg-gradient-accent',
            iconSize: 33,
            redirectTo: '/'
        },
        {
            icon: StarBorderIcon,
            text: 'Seasonal',
            desc: 'Current season highlights',
            bgStyle: 'bg-gradient-secondary',
            iconSize: 45,
            redirectTo: '/'
        },
        {
            icon: PersonSearchIcon,
            text: 'Voice Actors',
            desc: 'Acknowledge all voice actors',
            bgStyle: 'bg-gradient-primary',
            iconSize: 45,
            redirectTo: '/'
        },
    ];

    return (
        <div
            className={`grid w-full py-8 gap-6 
                     ${isMobile ? "grid-cols-2 gap-3" : "grid-cols-4"}`}>
            { buttonList.map(({ icon: Icon, text, desc, bgStyle, iconSize, redirectTo }) => (
                <Button
                    onClick={() => navigate(redirectTo)}
                    key={text}
                    className={`${bgStyle} flex flex-col items-center justify-center gap-2 rounded-xl
                                ${isMobile ? "h-[120px]" : "h-[165px] min-w-[250px]"}`}
                    sx={{
                        transition: 'transform .2s ease-in, box-shadow 1s ease-in-out',
                        '&:hover': !isMobile ? {
                            transform: 'scale(1.05)',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                        } : {}
                    }}
                    disableElevation>
                    <Icon
                        className="text-white"
                        sx={{ fontSize: isMobile ? iconSize - 12 : iconSize }}
                    />
                    <Typography className="line-clamp-1" sx={{
                        fontSize: isMobile ? '0.9rem' : '1.2rem',
                        fontWeight: '700',
                        marginTop: '4px',
                        color: 'white'
                    }}>
                        {text}
                    </Typography>
                    <Typography className="line-clamp-2" sx={{
                        fontSize: isMobile ? '0.7rem' : '0.9rem',
                        fontWeight: '400',
                        textTransform: 'capitalize',
                        color: 'white'
                    }}>
                        {desc}
                    </Typography>
                </Button>
            ))}
        </div>
    );
};
