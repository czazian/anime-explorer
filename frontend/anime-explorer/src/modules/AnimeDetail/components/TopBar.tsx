import type {Anime} from "../../../model/Anime.ts";
import {useEffect} from "react";
import {useDevice} from "../../../utils/MobileContext.tsx";

// Work like Input Declarator
type TopBarProp = {
    anime: Anime;
};

export const TopBar = ({anime}: TopBarProp) => {
    const { isMobile } = useDevice();
    
    useEffect(() => {
        console.log('AnimeDetails TOP BAR: ', anime);
    }, []);
    
    return (
        <div className={`flex flex-col gap-3 mt-[20rem]`}>
            <div className={`${isMobile ? "text-3xl" : "text-5xl"} font-bold`}>
                { anime.animeName }   
            </div>
            <div className={`${isMobile ? "text-xl" : "text-2xl"}`}>
                { anime.animeNameJp }
            </div>
        </div>
    );
}