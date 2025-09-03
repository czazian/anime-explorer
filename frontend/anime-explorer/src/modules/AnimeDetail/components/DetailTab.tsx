import type {Anime} from "../../../model/Anime.ts";
import {useDevice} from "../../../utils/MobileContext.tsx";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {CharacterTab} from "../tabs/CharacterTab.tsx";
import {ReviewTab} from "../tabs/ReviewTab.tsx";
import {StaffTab} from "../tabs/StaffTab.tsx";
import {PVTab} from "../tabs/PVTab.tsx";

interface DetailTabProps {
    anime: Anime;
}

export const DetailTab = ({anime}: DetailTabProps) => {
    const {isMobile} = useDevice();

    const [detailTabSelection, setDetailTabSelection] = useState("character");

    const handleDetailTabSelectionChange = (_event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        if (newSelection !== null) setDetailTabSelection(newSelection);
    };

    const toggleOptions = [
        {value: "character", label: "Character"},
        {value: "review", label: "Review"},
        {value: "staff", label: "Staff"},
        {value: "pv", label: "PV"},
    ];

    const renderTabContent = () => {
        switch (detailTabSelection) {
            case "character":
                return <CharacterTab />;
            case "review":
                return <ReviewTab animeRating={anime.animeRating == null ? 0 : anime.animeRating } />;
            case "staff":
                return <StaffTab />;
            case "pv":
                return <PVTab animePvUrl={anime.animePvUrl!} />;
            default:
                return <CharacterTab />;
        }
    };

    return (
        <div className={`w-full min-h-[250px]`}>
            <div className={`my-4`}>
                <ToggleButtonGroup
                    value={detailTabSelection}
                    exclusive
                    onChange={handleDetailTabSelectionChange}
                    className="w-full bg-[#1f1f2e] p-1 rounded-md mb-2"
                    sx={{display: "flex", gap: "4px", height: isMobile ? 36 : 40}}>
                    {toggleOptions.map((option) => (
                        <ToggleButton
                            key={option.value}
                            value={option.value}
                            sx={{
                                flex: 1,
                                border: "none",
                                borderRadius: "4px",
                                color: "#96a1b1",
                                textTransform: "none",
                                fontSize: isMobile ? '13px' : '14px',
                                backgroundColor: "transparent",
                                "&.Mui-selected": {
                                    backgroundColor: "#0b0e13 !important",
                                    fontWeight: "bold",
                                    color: "white"
                                },
                            }}>
                            {option.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
            
            <div className={``}>
                { renderTabContent() }
            </div>
        </div>
    );
}