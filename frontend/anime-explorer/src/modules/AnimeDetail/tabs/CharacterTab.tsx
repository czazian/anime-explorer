import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import {useState} from "react";
import SwipeableViews from "react-swipeable-views";
import {Box, MobileStepper, Button} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useDevice} from "../../../utils/MobileContext.tsx";

export const CharacterTab = () => {
    const {isMobile} = useDevice();
    
    const casts = [
        {
            "characterId": "1",
            "characterName": "Rio Karasuki / Haruto Amakawa",
            "characterImage": "https://cdn.myanimelist.net/images/characters/15/464752.jpg",
            "castName": "Yoshitsugu Matsuoka",
        },
        {
            "characterId": "2",
            "characterName": "Celia Claire",
            "characterImage": "https://cdn.rafled.com/anime-icons/images/01f8240d7e4a071203877a223df6c7d44b120892992a91ad561cb648a74bebff.jpg",
            "castName": "Akane Fujita",
        },
        {
            "characterId": "3",
            "characterName": "Aishia",
            "characterImage": "https://i.redd.it/aishia-being-a-cutie-v0-e97oapatkcvd1.jpg?width=1080&format=pjpg&auto=webp&s=e5ca48f29b32c86539bebb517382c6639dbcea0c",
            "castName": "Yuuki Kuwahara",
        }
    ];

    const slidesPerView = 2;
    const slides = [];

    for (let i = 0; i < casts.length; i += slidesPerView) {
        slides.push(casts.slice(i, i + slidesPerView));
    }

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = slides.length;

    return (
        <div className={`border border-gray-800 rounded-md p-6`}>
            <div className={`flex items-center text-xl font-bold text-white mb-7`}>
                <PeopleOutlineOutlinedIcon className={`mr-2`}/> Character & CVs
            </div>

            <Box>
                <SwipeableViews
                    index={activeStep}
                    onChangeIndex={setActiveStep}
                    style={{height: "auto"}}
                    slideStyle={{display: "flex", justifyContent: "center"}}>
                    {slides.map((group, index) => (
                        <Box key={index} sx={{display: "flex", justifyContent: "center", gap: { xs: 2, sm: 3, md: 6 },}}>
                            {group.map((cast) => (
                                <Box
                                    key={cast.characterId}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        width: "50%",
                                    }}>
                                    <Box
                                        sx={{
                                            width: { xs: "100px", sm: "120px", md: "130px" },
                                            height: { xs: "100px", sm: "120px", md: "130px" },
                                            borderRadius: "50%",
                                            overflow: "hidden",
                                            mb: 2,
                                            backgroundColor: "transparent",
                                        }}>
                                        <img
                                            src={cast.characterImage}
                                            alt={cast.characterName}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </Box>
                                    <div className={`flex flex-col justify-between`}>
                                        <div className={`${isMobile ? "text-sm" : "text-base"} text-white font-bold mb-1`}>{cast.characterName}</div>
                                        <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-400`}>CV: {cast.castName}</div>
                                    </div>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </SwipeableViews>

                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={() => setActiveStep((prev) => (prev + 1) % maxSteps)}
                            sx={{ color: "#F43F5E" }}>
                            Next <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={() => setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps)}
                            sx={{ color: "#F43F5E" }}>
                            <KeyboardArrowLeft /> Back
                        </Button>
                    }
                    sx={{
                        backgroundColor: "transparent",
                        mt: 2,
                        "& .MuiMobileStepper-dot": {
                            backgroundColor: "#d3d3d3",
                            width: 10,
                            height: 10,
                            margin: "0 4px",
                        },
                        "& .MuiMobileStepper-dotActive": {
                            backgroundColor: "#F43F5E",
                        },
                    }}/>
            </Box>
        </div>
    );
};
