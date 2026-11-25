/**
 * services/api/auth.ts
 *
 * Real HTTP auth service — talks to AluMaster Server (Express + MongoDB).
 *
 * Endpoints used:
 *   POST /api/v1/auth/send-otp
 *   POST /api/v1/auth/resend-otp
 *   POST /api/v1/auth/verify-otp
 *   POST /api/v1/auth/google
 *   GET  /api/v1/auth/profile
 *   POST /api/v1/auth/logout
 *
 * OTP session is persisted in sessionStorage so it survives a page navigation
 * from /login → /verify-otp.
 */

import { http } from "./client";
import type { User, OtpSession, AuthResponse, SendOtpResponse } from "@/types";
import type { AxiosError } from "axios";

const OTP_SESSION_KEY = "alumaster-otp-session";

// ── Error extraction ───────────────────────────────────────────────────────
function extractMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
    const axiosErr = err as AxiosError<{ message?: string; success?: boolean }>;
    return axiosErr?.response?.data?.message || (err instanceof Error ? err.message : fallback);
}

// ── OTP session helpers (sessionStorage) ──────────────────────────────────
export function saveOtpSession(session: OtpSession): void {
    if (typeof window !== "undefined") {
        sessionStorage.setItem(OTP_SESSION_KEY, JSON.stringify(session));
    }
}

export function readOtpSession(): OtpSession | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = sessionStorage.getItem(OTP_SESSION_KEY);
        return raw ? (JSON.parse(raw) as OtpSession) : null;
    } catch {
        return null;
    }
}

export function clearOtpSession(): void {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem(OTP_SESSION_KEY);
    }
}

// ── Auth API ───────────────────────────────────────────────────────────────
export const authApi = {
    /**
     * Request an OTP for a given phone number.
     * Stores the returned verificationId in sessionStorage.
     *
     * @param phone - E.164 format e.g. "+919876543210"
     */
    requestOtp: async (phone: string): Promise<{ verificationId: string; expiresInMinutes: number }> => {
        try {
            const { data } = await http.post<SendOtpResponse>("/auth/send-otp", {
                phoneNumber: phone,
            });
            const { verificationId, expiresInMinutes } = data.data;

            // Persist session so /verify-otp page can pick it up
            saveOtpSession({
                phone,
                verificationId,
                expiresInMinutes,
                sentAt: Date.now(),
            });

            return { verificationId, expiresInMinutes };
        } catch (err) {
            throw new Error(extractMessage(err, "Failed to send OTP."));
        }
    },

    /**
     * Resend OTP to the same phone (uses /resend-otp endpoint).
     */
    resendOtp: async (phone: string): Promise<{ verificationId: string; expiresInMinutes: number }> => {
        try {
            const { data } = await http.post<SendOtpResponse>("/auth/resend-otp", {
                phoneNumber: phone,
            });
            const { verificationId, expiresInMinutes } = data.data;

            saveOtpSession({
                phone,
                verificationId,
                expiresInMinutes,
                sentAt: Date.now(),
            });

            return { verificationId, expiresInMinutes };
        } catch (err) {
            throw new Error(extractMessage(err, "Failed to resend OTP."));
        }
    },

    /**
     * Verify OTP code.
     * Reads verificationId + phone from sessionStorage.
     *
     * @param otp - 6-digit code entered by user
     * @returns authenticated User
     */
    verifyOtp: async (otp: string): Promise<User> => {
        const session = readOtpSession();
        if (!session) {
            throw new Error("No active OTP session. Please request a code first.");
        }

        try {
            const { data } = await http.post<AuthResponse>("/auth/verify-otp", {
                phoneNumber: session.phone,
                verificationId: session.verificationId,
                otp,
            });

            clearOtpSession();
            return data.user;
        } catch (err) {
            throw new Error(extractMessage(err, "OTP verification failed."));
        }
    },

    /**
     * Google Social Login.
     * Send the idToken (credential) from @react-oauth/google to the backend.
     *
     * @param idToken - Google credential string from useGoogleLogin / GoogleLogin
     * @returns authenticated User
     */
    googleLogin: async (idToken: string): Promise<User> => {
        try {
            const { data } = await http.post<AuthResponse>("/auth/google", { idToken });
            return data.user;
        } catch (err) {
            throw new Error(extractMessage(err, "Google sign-in failed."));
        }
    },

    /**
     * Fetch the current authenticated user profile.
     * Returns null if not authenticated (401) instead of throwing.
     */
    me: async (): Promise<User | null> => {
        try {
            const { data } = await http.get<{ success: boolean; data: { user: User } }>("/auth/profile");
            return data.data.user;
        } catch (err) {
            const axiosErr = err as AxiosError;
            if (axiosErr?.response?.status === 401) return null;
            throw new Error(extractMessage(err, "Failed to load profile."));
        }
    },

    /**
     * Logout — clears HTTP-only cookie on the server.
     */
    logout: async (): Promise<void> => {
        try {
            await http.post("/auth/logout");
        } catch {
            // Always clear session locally even if server call fails
        }
    },

    // ── Legacy shim — kept for components still using old API shape ─────────
    /** @deprecated use requestOtp instead */
    social: async (_provider: string): Promise<User | null> => {
        // This is intentionally left as a stub — callers should use googleLogin() directly
        return null;
    },
};
