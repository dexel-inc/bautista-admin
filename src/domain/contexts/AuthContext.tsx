import {useEffect, useState} from "react";
import {User} from "@/domain/models/User.ts";
import authService from "@/domain/services/Auth.service.ts";
import {getUser, setUser} from "@/domain/storage/user";

import { createContext } from 'react';

export interface AuthContextType {
    login: (data: Partial<User>) => Promise<{ user: User | null; success: boolean; error?: any }>;
    logout: () => Promise<boolean>;
    isLoading: boolean;
    activeUser: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeUser, setActiveUser] = useState<User | null>(null);

    const login = async (data: Partial<User>) => {
        setIsLoading(true);

        try {
            const authUser = await authService.login(data);
            if (authUser.user) {
                setActiveUser(authUser);
                setUser(authUser);
                return { user: authUser, success: true };
            }
            return { user: null, success: false };
        } catch (error) {
            return { user: null, success: false, error };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            setUser(null);
            setActiveUser(null);
            setIsLoading(false);
            return true
        } catch (error) {
            setIsLoading(false);
            return false
        }
    };

    useEffect(() => {
        const storedUser = getUser();

        if (storedUser) {
            setActiveUser(storedUser);
        }

        setIsLoading(false);
    }, []);

    return (<AuthContext.Provider value={{
        login,
        logout,
        isLoading,
        activeUser
    }}> {children} </AuthContext.Provider>);
}