import {Box} from "@mui/material";
import {useDevice} from "../../../utils/MobileContext.tsx";
import HdrAutoOutlinedIcon from '@mui/icons-material/HdrAutoOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import {useState, useEffect} from "react";
import * as React from "react";
import {ToggleButton, ToggleButtonGroup, Button} from "@mui/material";

interface NewsDetailContentProps {
    news: News;
}

export const NewsDetailContent = ({news}: NewsDetailContentProps) => {
    const {isMobile} = useDevice();
    const [textSize, setTextSize] = useState<string>("md");
    const [isReadRunning, setIsReadRunning] = useState(false);

    const textSizeOptions = [
        {value: "sm", iconSize: "small", icon: HdrAutoOutlinedIcon},
        {value: "md", iconSize: "medium", icon: HdrAutoOutlinedIcon},
        {value: "lg", iconSize: "large", icon: HdrAutoOutlinedIcon},
    ]

    const handleTextSizeChange = (_event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        if (newSelection !== null) setTextSize(newSelection);
    };

    const getTextSizeClass = (textSize: string) => {
        switch (textSize) {
            case "sm":
                return "text-sm";
            case "md":
                return "text-base";
            case "lg":
                return "text-lg";
            default:
                return "text-base";
        }
    };

    // Extract plain text from HTML content
    const extractTextFromHTML = (htmlString: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return doc.body.textContent || doc.body.innerText || '';
    };

    const handleReadClick = () => {
        if (!('speechSynthesis' in window)) {
            alert('Text-to-speech is not supported in this browser');
            return;
        }

        if (isReadRunning) {
            // Stop speaking
            window.speechSynthesis.cancel();
            setIsReadRunning(false);
        } else {
            // Start speaking
            const textToSpeak = extractTextFromHTML(news.newsContent);

            if (!textToSpeak.trim()) {
                alert('No text content to read');
                return;
            }

            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            // Speech settings
            utterance.rate = 0.9;   // Speed of speech
            utterance.pitch = 1;
            utterance.volume = 1;

            // Select preferred voices (English)
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice =>
                voice.lang.startsWith('en') &&
                /female|woman|zira|samantha/i.test(voice.name)
            ) || voices.find(voice => voice.lang.startsWith('en'));

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            // Event listeners
            utterance.onstart = () => {
                setIsReadRunning(true);
            };

            utterance.onend = () => {
                setIsReadRunning(false);
            };

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event.error);
                setIsReadRunning(false);
            };

            utterance.onpause = () => {
                setIsReadRunning(false);
            };

            utterance.onresume = () => {
                setIsReadRunning(true);
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    // Clean up speech synthesis when component unmounts
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Handle page visibility change to pause speech when tab is hidden
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && isReadRunning) {
                window.speechSynthesis.pause();
            } else if (!document.hidden && window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isReadRunning]);

    return (
        <div className="flex flex-col h-full">
            <Box
                className={`${isMobile ? "w-full h-[300px] my-2" : "w-full h-[500px] my-4"} flex-shrink-0`}
                sx={{
                    overflow: 'hidden',
                    borderRadius: '8px',
                }}>
                <Box
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url('${news.newsPoster}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    sx={{
                        transition: 'transform 0.3s ease-in-out',
                        transformOrigin: 'center',
                    }}
                />
            </Box>

            <div className={`w-full border border-gray-700 py-6 px-8 mt-3 rounded-xl`}>
                <div className={`flex justify-between`}>
                    <div className="mb-4">
                        <ToggleButtonGroup
                            value={textSize}
                            exclusive
                            onChange={handleTextSizeChange}
                            className="w-fit bg-[#1f1f2e] p-1 rounded-md mb-2"
                            sx={{ display: "flex", gap: "4px", height: isMobile ? 32 : 40 }}>
                            {textSizeOptions.map((option) => {
                                const Icon = option.icon;
                                return (
                                    <ToggleButton
                                        key={option.value}
                                        value={option.value}
                                        sx={{
                                            flex: 1,
                                            border: "none",
                                            borderRadius: "4px",
                                            color: "#96a1b1",
                                            textTransform: "none",
                                            fontSize: isMobile ? "12px" : "14px",
                                            backgroundColor: "transparent",
                                            "&.Mui-selected": {
                                                backgroundColor: "#0b0e13 !important",
                                                fontWeight: "bold",
                                                color: "white",
                                            },
                                        }}>
                                        <Icon
                                            className="py-1"
                                            fontSize={isMobile ? "small" : option.iconSize} 
                                        />
                                    </ToggleButton>
                                );
                            })}
                        </ToggleButtonGroup>
                    </div>
                    <div>
                        <Button
                            onClick={handleReadClick}
                            sx={{
                                fontSize: isMobile ? "12px" : "14px",
                                color: isReadRunning ? "#f8286c" : "#96a1b1",
                                "& svg": {
                                    fontSize: isMobile ? "18px" : "22px",
                                },
                                "&:hover": {
                                    backgroundColor: "rgba(150, 161, 177, 0.1)",
                                },
                            }}>
                            <RecordVoiceOverOutlinedIcon className="mr-1" />
                            {!isMobile && (isReadRunning ? "Stop" : "Read Aloud")}
                        </Button>
                    </div>
                </div>
                <div className={`text-justify leading-6 text-gray-300 ${getTextSizeClass(textSize)}`}
                     dangerouslySetInnerHTML={{__html: news.newsContent}}></div>
            </div>
        </div>
    );
}