import * as React from "react";
import { useState } from "react";
import { ToggleButton, ToggleButtonGroup, TextField, Button, Box } from "@mui/material";
import { useDevice } from "../../../utils/MobileContext.tsx";
import type { UserCreationRequestModel } from "../../../model/ApiModel/Request/UserCreationRequestModel.ts";
import { useMessageService } from "../../../share-component/MessageService.tsx";
import {useAuth} from "../../../utils/AuthContext.tsx";
import {AnimeExplorerConstants} from "../../../constants/anime-explorer-constant.ts";
import {UserRestService} from "../../../rest-service/user-rest.service.ts";

interface LoginModalProps {
    onClose: () => void;
}

export const LoginModal = ({ onClose }: LoginModalProps) => {
    const { isMobile } = useDevice();
    const { showMessage } = useMessageService();
    const { login } = useAuth();
    const textFieldStyles = AnimeExplorerConstants.textFieldStyles(isMobile);
    const buttonStyles = AnimeExplorerConstants.buttonStyles(isMobile);

    const [loginModalSelection, setLoginModalSelection] = useState("login");
    const [isLoading, setIsLoading] = useState(false);

    // FormGroup Creation
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });

    // Button List
    const toggleOptions = [
        { value: "login", label: "Login" },
        { value: "register", label: "Register" }
    ];

    const handleLoginSelectionChange = (_event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        if (newSelection !== null) setLoginModalSelection(newSelection);
    };

    const handleLoginFormChange = (field: keyof typeof loginForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({ ...prev, [field]: event.target.value }));
    };

    const handleRegisterFormChange = (field: keyof typeof registerForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm(prev => ({ ...prev, [field]: event.target.value }));
    };

    // Login
    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const loginData = {
            userEmail: loginForm.email,
            userPassword: loginForm.password,
        }

        try {
            const userObj = await UserRestService.checkUserLogin(loginData);

            if (userObj) {
                showMessage({
                    message: "Login Successful",
                    severity: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                });

                // Use the context login function
                login(userObj);

                // Reset form and close modal
                setLoginForm({ email: "", password: "" });
                onClose();
            }
        } catch (err: any) {
            showMessage({
                message: "Invalid Email or Password",
                severity: "error",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "top", horizontal: "center" }
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Register
    const handleRegisterSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const user: UserCreationRequestModel = {
            userName: registerForm.username,
            userEmail: registerForm.email,
            userPassword: registerForm.password,
        };

        try {
            // Call API
            const response = await UserRestService.createUser(user);

            // If Successful
            if (response) {
                // Show Successful Message
                showMessage({
                    message: "Account Registration Successful",
                    severity: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "top", horizontal: "center" }
                });

                // Reset Form
                setRegisterForm({ username: "", email: "", password: "", confirmPassword: "" });

                // Switch to Log in Form
                setLoginModalSelection("login");

                // Auto-fill login form with registered email
                setLoginForm(prev => ({ ...prev, email: user.userEmail }));
            }

        } catch (err: any) {
            showMessage({
                message: err.response?.data?.message || "Registration failed. Please try again.",
                severity: "error",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "top", horizontal: "center" }
            });

        } finally {
            setIsLoading(false);
        }
    };

    const isLoginFormValid = loginForm.email && loginForm.password;
    const isRegisterFormValid =
        registerForm.username &&
        registerForm.email &&
        registerForm.password &&
        registerForm.confirmPassword &&
        registerForm.password === registerForm.confirmPassword;

    return (
        <div className={`rounded-lg py-2 ${isMobile ? "px-1 w-full" : "px-6 "} `}>
            <ToggleButtonGroup
                value={loginModalSelection}
                exclusive
                onChange={handleLoginSelectionChange}
                className="w-full bg-[#1f1f2e] p-1 rounded-md mb-6"
                sx={{ display: "flex", gap: "4px", height: isMobile ? 36 : 40 }}>
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

            {loginModalSelection === "login" ? (
                <Box component="form" onSubmit={handleLoginSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 2 : 3 }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={loginForm.email}
                        onChange={handleLoginFormChange('email')}
                        required
                        fullWidth
                        sx={textFieldStyles}
                        disabled={isLoading}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={loginForm.password}
                        onChange={handleLoginFormChange('password')}
                        required
                        fullWidth
                        sx={textFieldStyles}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isLoginFormValid || isLoading}
                        fullWidth
                        className="bg-gradient-primary text-white"
                        sx={{
                            ...buttonStyles,
                            background: !isLoginFormValid || isLoading ? '#2d3748' : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                            '&:hover': {
                                opacity: (!isLoginFormValid || isLoading) ? 1 : 0.9,
                                background: (!isLoginFormValid || isLoading) ? '#2d3748' : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                            }
                        }}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </Box>
            ) : (
                <Box component="form" onSubmit={handleRegisterSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 2 : 3 }}>
                    <TextField
                        label="Username"
                        type="text"
                        value={registerForm.username}
                        onChange={handleRegisterFormChange('username')}
                        required
                        fullWidth
                        sx={textFieldStyles}
                        disabled={isLoading}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={registerForm.email}
                        onChange={handleRegisterFormChange('email')}
                        required
                        fullWidth
                        sx={textFieldStyles}
                        disabled={isLoading}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={registerForm.password}
                        onChange={handleRegisterFormChange('password')}
                        required
                        fullWidth
                        sx={textFieldStyles}
                        disabled={isLoading}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterFormChange('confirmPassword')}
                        required
                        fullWidth
                        error={registerForm.confirmPassword !== '' && registerForm.password !== registerForm.confirmPassword}
                        helperText={registerForm.confirmPassword !== '' && registerForm.password !== registerForm.confirmPassword ? "Passwords don't match" : ""}
                        sx={textFieldStyles}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isRegisterFormValid || isLoading}
                        fullWidth
                        className="bg-gradient-primary text-white"
                        sx={{
                            ...buttonStyles,
                            background: !isRegisterFormValid || isLoading ? '#2d3748' : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                            '&:hover': {
                                opacity: (!isRegisterFormValid || isLoading) ? 1 : 0.9,
                                background: (!isRegisterFormValid || isLoading) ? '#2d3748' : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                            }
                        }}>
                        {isLoading ? "Registering..." : "Register"}
                    </Button>
                </Box>
            )}
        </div>
    );
};