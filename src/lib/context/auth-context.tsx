"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { authService } from "@/lib/services/auth.service";
import { tokenStorage } from "@/lib/api-client";
import type { AuthUser, AuthProfile, RefreshResponse, DeleteAccountResponse } from "@/lib/types/api.types";

interface AuthContextValue {
    user: AuthUser | null;
    profile: AuthProfile | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    deleteAccount: () => Promise<DeleteAccountResponse>;
    refreshSession: () => Promise<void>;
    refreshAccessToken: (token?: string) => Promise<RefreshResponse>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [profile, setProfile] = useState<AuthProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshSession = useCallback(async () => {
        if (!tokenStorage.getAccessToken()) {
            setUser(null);
            setProfile(null);
            setIsLoading(false);
            return;
        }
        try {
            const me = await authService.me();
            setUser(me.user);
            setProfile(me.profile);
        } catch {
            setUser(null);
            setProfile(null);
            tokenStorage.clearTokens();
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshSession();
    }, [refreshSession]);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
            setProfile(null);
        }
    }, []);

    const deleteAccount = useCallback(async () => {
        try {
            return await authService.deleteAccount();
        } finally {
            setUser(null);
            setProfile(null);
        }
    }, []);

    const refreshAccessToken = useCallback(async (token?: string) => {
        const res = await authService.refresh(token);
        await refreshSession();
        return res;
    }, [refreshSession]);

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                isLoading,
                isAuthenticated: !!user,
                logout,
                deleteAccount,
                refreshSession,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within <AuthProvider>");
    }
    return ctx;
}
