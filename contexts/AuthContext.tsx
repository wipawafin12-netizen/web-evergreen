import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { pb, ADMINS, AdminRecord } from '../lib/pb';

interface AuthContextType {
    admin: AdminRecord | null;
    isAuthed: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function currentAdmin(): AdminRecord | null {
    const rec = pb.authStore.record;
    if (pb.authStore.isValid && rec && rec.collectionName === ADMINS) {
        return rec as unknown as AdminRecord;
    }
    return null;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [admin, setAdmin] = useState<AdminRecord | null>(() => currentAdmin());

    useEffect(() => {
        // Keep React state in sync with the PocketBase auth store (also fires
        // across tabs and after token refresh / clear).
        return pb.authStore.onChange(() => setAdmin(currentAdmin()));
    }, []);

    const login = async (email: string, password: string) => {
        await pb.collection(ADMINS).authWithPassword(email, password);
    };

    const logout = () => {
        pb.authStore.clear();
    };

    return (
        <AuthContext.Provider value={{ admin, isAuthed: !!admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (ctx === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
};
