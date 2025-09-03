/*
    Zi An: Customized single file to control isMobile or not in a single variable callable in every component. 
*/

import { createContext, useContext } from "react";
import {useMediaQuery} from "@mui/material";

type MobileContextType = { isMobile: boolean };
const MobileContext = createContext<MobileContextType>({ isMobile: false });

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isMobile = useMediaQuery("(max-width: 900px)");
    return (
        <MobileContext.Provider value={{ isMobile }}>
            {children}
        </MobileContext.Provider>
    );
};

export const useDevice = () => useContext(MobileContext);
