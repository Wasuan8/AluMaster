"use client";

import { create } from "zustand";
import type { User } from "@/types";
import { authApi } from "@/services/api/auth";

interface Session {
    user: User | null;
    ready: boolean;
    refresh: () => Promise<void>;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

export const useSession = create<Session>((set) => ({
    user: null,
    ready: false,

    /**
     * Fetch the current user from the server using the httpOnly cookie.
     * Called on app mount and after every login action.
     * Gracefully handles 401 (not logged in) by setting user to null.
     */
    refresh: async () => {
        try {
            const user = await authApi.me();
            set({ user, ready: true });
        } catch {
            set({ user: null, ready: true });
        }
    },

    /**
     * Directly set user in store (used after login to avoid a round-trip).
     */
    setUser: (user: User | null) => {
        set({ user, ready: true });
    },

    /**
     * Logout — clears server cookie + local state.
     */
    logout: async () => {
        await authApi.logout();
        set({ user: null, ready: true });
    },
}));
