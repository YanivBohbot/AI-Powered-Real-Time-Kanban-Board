import React, { createContext, useContext, useState, useEffect, Children } from 'react';
import { type User, AuthService } from '../features/auth/api/auth.service';

interface AuthContextType {
    user: User | null ; 
    login: (token: string) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export  const AuthProvider = ({ children }: { children: React.ReactNode }) =>{
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) AuthService.getProfile().then(setUser).catch(() => localStorage.removeItem('token'));
    }, []);

    const login = (token: string)=>{
        localStorage.setItem("token", token);
        AuthService.getProfile().then(setUser);
    }

    return (
        <AuthContext.Provider value= {{user,login , isAuthenticated: !!user}}>
            {children}
        </AuthContext.Provider>
    )
    
};
export const useAuth = () => useContext(AuthContext)!;