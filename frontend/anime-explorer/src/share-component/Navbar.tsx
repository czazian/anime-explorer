import {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {NavbarNavigation} from "../routes/NavbarNavigation.ts";
import {Button, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import {LoginModal} from "../modules/home/components/LoginModal.tsx";
import {useDevice} from "../utils/MobileContext.tsx";
import MenuIcon from '@mui/icons-material/Menu';
import {MobileNavBar} from "./MobileNavBar.tsx";

export const Navbar = () => {
    //// Variable Declaration ////
    // Declare mobile view check
    const {isMobile} = useDevice();

    // Call navigation list from routes
    const navigation = NavbarNavigation;

    // React Router hook that gives the current URL/location object.
    const location = useLocation();

    // Check if the user is logged-in
    const isUserLogin = false;
    const isAdmin = false;

    // Set State of Variable. E.g. Controlling the Open of Login Modal
    const [loginOpen, setLoginOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Change the Login Modal States
    const handleOpen = () => setLoginOpen(true);
    const handleClose = () => setLoginOpen(false);

    //// Return Content ////
    return (
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">

                {/* Nav Bar Container */}
                <div className="flex items-center justify-between h-16">
                    <div className="flex flex-row">

                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <NavLink to="/"
                                     className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                                AnimeExplorer
                            </NavLink>
                        </div>

                        {/* Navigation Links */}
                        <div className={` ${isMobile ? "hidden" : "block"} `}>
                            <div className="ml-10 flex items-baseline space-x-4">

                                {/* Get the declared NavbarNavigation and do Mapping */}
                                {navigation
                                    // If user not login and is not admin, hide "Admin" button
                                    .filter((item) => {
                                        if (item.name === 'Admin' && (!isUserLogin || !isAdmin)) {
                                            return false;
                                        } else if (item.name === 'Profile' && (!isUserLogin)) {
                                            return false
                                        }
                                        return true;
                                    })
                                    .map((item) => {
                                        const Icon = item.icon;
                                        const isActive = location.pathname === item.href;

                                        return (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                                    isActive
                                                        ? "bg-primary text-primary-foreground"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                                }`}>
                                                <Icon className="h-4 w-4"/>
                                                {item.name}
                                            </NavLink>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    {/* Login Control */}
                    <div className="flex items-center gap-4">
                        {!isUserLogin ? (
                            <div>
                                {/* Login Button to open dialog */}
                                {isMobile ? '' :
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            borderColor: '#F43F5E',
                                            color: '#F43F5E',
                                            '&:hover': {
                                                borderColor: '#F43F5E',
                                                backgroundColor: '#F43F5E',
                                                color: 'white',
                                            },
                                        }}
                                        onClick={handleOpen}>
                                        <LoginIcon className="pr-2"></LoginIcon> Login
                                    </Button>
                                }

                                {/* Login Dialog */}
                                <Dialog
                                    open={loginOpen}
                                    onClose={handleClose}
                                    sx={{
                                        '& .MuiDialog-paper': {
                                            width: isMobile ? '100%' : '500px',
                                            marginX: '20px',
                                        }
                                    }}>
                                    <div className="w-full p-[1px] rounded-sm bg-gradient-primary">
                                        <div className="bg-[#0b0e13] rounded-sm py-2">
                                            <DialogTitle className="p-0 text-center relative">
                                                <span
                                                    className={`font-bold bg-gradient-primary bg-clip-text text-transparent ${isMobile ? 'text-xl' : 'text-2xl'} `}>
                                                    Welcome to AnimeExplorer
                                                </span>
                                                <IconButton
                                                    aria-label="close"
                                                    onClick={handleClose}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: isMobile ? 1 : 5,
                                                        top: isMobile ? 1 : 3,
                                                        color: '#96a1b1',
                                                        '&:hover': {color: 'white'},
                                                    }}>
                                                    <CloseIcon fontSize="small"/>
                                                </IconButton>
                                            </DialogTitle>
                                            <DialogContent>
                                                <LoginModal/>
                                            </DialogContent>
                                        </div>
                                    </div>
                                </Dialog>
                            </div>
                        ) : (
                            <Button variant="outlined" size="small">
                                Logout
                            </Button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    { isMobile && (
                        <>
                            <Button
                                onClick={() => setDrawerOpen(true)}
                                variant="text"
                                size="small"
                                sx={{minWidth: 0, p: 0, backgroundColor: "transparent"}}>
                                <MenuIcon fontSize="medium" className="text-red-600"/>
                            </Button>

                            <MobileNavBar
                                open={drawerOpen}
                                onClose={() => setDrawerOpen(false)}
                                isUserLogin={isUserLogin}
                                isAdmin={isAdmin}
                                handleOpenLogin={handleOpen}
                                handleLogout={() => {
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}