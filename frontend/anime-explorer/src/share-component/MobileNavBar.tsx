import {NavLink, useLocation} from "react-router-dom";
import {Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import {NavbarNavigation} from "../routes/NavbarNavigation";


// Similar to Input Declarator in Angular
// Can pass in state to control previous called component state
export const MobileNavBar = ({
                                 open,
                                 onClose,
                                 isUserLogin,
                                 isAdmin,
                                 handleOpenLogin,
                                 handleLogout,
                             }: {
                                open: boolean;
                                onClose: () => void;
                                isUserLogin: boolean;
                                isAdmin: boolean;
                                handleOpenLogin: () => void;
                                handleLogout: () => void;
}) => {
    const location = useLocation();
    
    return (
        <Drawer anchor="left" open={open} onClose={onClose} 
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 260,
                        backgroundColor: "#0b0e13",
                        color: "white",
                    },
                }}
                >
            <Box
                sx={{
                    width: 260,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}>
                
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2,
                        py: 2,
                    }}>
                    <NavLink
                        to="/"
                        onClick={onClose}
                        className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        AnimeExplorer
                    </NavLink>
                    <CloseIcon
                        fontSize="small"
                        onClick={onClose}
                        className="cursor-pointer text-gray-500 hover:text-black"
                    />
                </Box>

                <Divider/>

                {/* Navigation Links */}
                <List sx={{flex: 1}}>
                    {NavbarNavigation
                        .filter((item) => {
                            if (item.name === "Admin" && (!isUserLogin || !isAdmin)) {
                                return false;
                            } else if (item.name === "Profile" && !isUserLogin) {
                                return false;
                            }
                            return true;
                        })
                        .map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;

                            return (
                                <ListItem key={item.name} disablePadding>
                                    <ListItemButton
                                        sx={{
                                            "&.Mui-selected": {
                                                backgroundColor: "#F43F5E",
                                                color: "white",
                                                "& .MuiListItemIcon-root": {
                                                    color: "white",
                                                },
                                            },
                                            "&.Mui-selected:hover": {
                                                backgroundColor: "#F43F5E",
                                            },
                                        }}
                                        component={NavLink}
                                        to={item.href}
                                        onClick={onClose}
                                        selected={isActive}>
                                        <ListItemIcon>
                                            <Icon style={{ color: 'white' }} fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText primary={item.name}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                </List>

                <Divider/>

                {/* Login / Logout Control */}
                <Box sx={{p: 2}}>
                    {!isUserLogin ? (
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<LoginIcon/>}
                            onClick={() => {
                                onClose();
                                handleOpenLogin();
                            }}
                            sx={{
                                borderColor: "#F43F5E",
                                color: "#F43F5E",
                                "&:hover": {
                                    borderColor: "#F43F5E",
                                    backgroundColor: "#F43F5E",
                                    color: "white",
                                },
                            }}>
                            Login
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<LogoutIcon/>}
                            onClick={() => {
                                onClose();
                                handleLogout();
                            }}>
                            Logout
                        </Button>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};
