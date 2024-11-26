'use client';
import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from 'react';

import axios from 'axios';

interface User {
    username?: string;
    email: string;
    isGuest?: boolean;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (
        username: string,
        email: string,
        password: string
    ) => Promise<void>;
    guestLogin: () => Promise<void>;
    logout: () => void;
    error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );

            setUser(response.data.data);
            setError(null);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Login failed'
            );
            throw error;
        }
    };

    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
                {
                    username,
                    email,
                    password,
                },
                { withCredentials: true }
            );

            setUser(response.data.user);
            setError(null);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Registration failed'
            );
            throw error;
        }
    };

    const guestLogin = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/guest`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            setUser({ ...response.data.user, isGuest: true });
            setError(null);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Guest login failed'
            );
            throw error;
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
                withCredentials: true,
            });

            if (!response.data.success) {
                setError(response.data.error);
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Logout failed'
            );
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                register,
                guestLogin,
                logout,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}