import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from "../model/User.ts";
import {useMessageService} from "../share-component/MessageService.tsx";
import {useLocation, useNavigate} from "react-router-dom";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { showMessage } = useMessageService();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check for existing user session on mount
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("user");

        if(location.pathname === "/profile" || location.pathname === "/admin") {
            navigate("/");
        }

        showMessage({
            message: "Logout Successfully",
            severity: "warning",
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "top", horizontal: "center" }
        });
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};