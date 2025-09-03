import * as React from "react";
import { useState } from "react";
import { ToggleButton, ToggleButtonGroup, TextField, Button, Box } from "@mui/material";
import { useDevice } from "../../../utils/MobileContext.tsx";

export const LoginModal = () => {
    const { isMobile } = useDevice();
    const [loginModalSelection, setLoginModalSelection] = useState("login");

    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });

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

    const handleLoginSubmit = (event: React.FormEvent) => { event.preventDefault(); /*TODO*/ };
    const handleRegisterSubmit = (event: React.FormEvent) => { event.preventDefault(); /*TODO*/ };

    const isLoginFormValid = loginForm.email && loginForm.password;
    const isRegisterFormValid =
        registerForm.username &&
        registerForm.email &&
        registerForm.password &&
        registerForm.confirmPassword &&
        registerForm.password === registerForm.confirmPassword;

    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            color: 'white',
            backgroundColor: 'transparent',
            '& fieldset': { borderColor: '#1f1f1f', borderWidth: '1px' },
            '&:hover fieldset': { borderWidth: '2px' },
            '&.Mui-focused fieldset': { borderColor: '#f8286c', borderWidth: '2px' },
            '&.Mui-error fieldset': { borderColor: '#ff4444 !important', borderWidth: '2px !important' },
            '&.Mui-error:hover fieldset': { borderColor: '#ff4444 !important' },
            '&.Mui-error.Mui-focused fieldset': { borderColor: '#ff4444 !important' },
            '& .MuiInputBase-input': {
                fontSize: isMobile ? '12px' : '14px',
                padding: isMobile ? '8px 10px' : '12px 14px',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#96a1b1',
            fontSize: isMobile ? '12px' : '14px',
            transform: 'translate(14px, 12px) scale(1)',
            '&.Mui-focused': { color: '#f8286c', transform: 'translate(14px, -9px) scale(0.75)' },
            '&.MuiInputLabel-shrink': { transform: 'translate(14px, -9px) scale(0.75)' },
            '&.Mui-error': { color: '#ff4444' },
            '&.Mui-error.Mui-focused': { color: '#ff4444' },
        },
        '& .MuiFormHelperText-root': {
            color: '#ff4444',
            fontSize: isMobile ? '10px' : '12px',
            marginLeft: 0,
            marginTop: '4px',
        },
    };

    const buttonStyles = {
        textTransform: 'none',
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '600',
        padding: isMobile ? '8px' : '12px',
        backgroundColor: 'transparent',
        '&:hover': { opacity: 0.9, backgroundColor: 'transparent' },
    };

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
                    <TextField label="Email" type="email" value={loginForm.email} onChange={handleLoginFormChange('email')} required fullWidth sx={textFieldStyles} />
                    <TextField label="Password" type="password" value={loginForm.password} onChange={handleLoginFormChange('password')} required fullWidth sx={textFieldStyles} />
                    <Button type="submit" variant="contained" disabled={!isLoginFormValid} fullWidth className="bg-gradient-primary text-white" sx={{ ...buttonStyles, backgroundColor: isLoginFormValid ? 'transparent' : '#2d3748', '&:hover': { opacity: isLoginFormValid ? 0.9 : 1, backgroundColor: isLoginFormValid ? 'transparent' : '#2d3748' } }}>
                        Login
                    </Button>
                </Box>
            ) : (
                <Box component="form" onSubmit={handleRegisterSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 2 : 3 }}>
                    <TextField label="Username" type="text" value={registerForm.username} onChange={handleRegisterFormChange('username')} required fullWidth sx={textFieldStyles} />
                    <TextField label="Email" type="email" value={registerForm.email} onChange={handleRegisterFormChange('email')} required fullWidth sx={textFieldStyles} />
                    <TextField label="Password" type="password" value={registerForm.password} onChange={handleRegisterFormChange('password')} required fullWidth sx={textFieldStyles} />
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
                    />
                    <Button type="submit" variant="contained" disabled={!isRegisterFormValid} fullWidth className="bg-gradient-primary text-white" sx={{ ...buttonStyles, backgroundColor: isRegisterFormValid ? 'transparent' : '#2d3748', '&:hover': { opacity: isRegisterFormValid ? 0.9 : 1, backgroundColor: isRegisterFormValid ? 'transparent' : '#2d3748' } }}>
                        Register
                    </Button>
                </Box>
            )}
        </div>
    );
};
