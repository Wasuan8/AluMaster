"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState, useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { SmartForm, type Field } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { authApi, readOtpSession } from "@/services/api/auth";
import { useSession } from "@/store/session";

// ─── Page title map ────────────────────────────────────────────────────────
const TITLES: Record<string, string> = {
    login: "Welcome back.",
    register: "Your next project starts here.",
    "forgot-password": "Recover your access.",
    "verify-otp": "Check your phone.",
};

// ─── Social provider config ────────────────────────────────────────────────
type SocialProvider = { id: string; label: string; icon: string; enabled: boolean };

const SOCIAL_PROVIDERS: SocialProvider[] = [
    { id: "google",   label: "Continue with Google",   icon: "G", enabled: true  },
    { id: "apple",    label: "Continue with Apple",    icon: "🍎", enabled: false },
    { id: "facebook", label: "Continue with Facebook", icon: "f", enabled: false  },
];

export function Auth({ mode }: { mode: string }) {
    const router = useRouter();
    const setUser = useSession((s) => s.setUser);

    const [socialBusy, setSocialBusy] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [resendCountdown, setResendCountdown] = useState(0);

    const isOtp = mode === "verify-otp";

    // ── After successful auth: refresh session then navigate ────────────────
    async function finish(user: import("@/types").User) {
        setUser(user); // instant — no extra network call
        const params = new URLSearchParams(
            typeof window !== "undefined" ? window.location.search : ""
        );
        const plan = params.get("plan");
        router.push(
            plan && ["free", "pro", "contractor"].includes(plan) ? "/pricing" : "/dashboard"
        );
    }

    // ── Google OAuth — code flow via @react-oauth/google ───────────────────
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setSocialBusy("google");
            setError("");
            try {
                // @react-oauth/google returns an access_token, but our backend
                // needs the id_token. We use the credential (id_token) flow instead.
                // Note: This branch is reached when flow="auth-code" is NOT set.
                // For id_token flow use GoogleLogin component (see below).
                const user = await authApi.googleLogin(tokenResponse.access_token);
                await finish(user);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Google sign-in failed.");
            } finally {
                setSocialBusy(null);
            }
        },
        onError: () => {
            setError("Google sign-in was cancelled or failed. Please try again.");
            setSocialBusy(null);
        },
    });

    // ── Resend OTP countdown helper ─────────────────────────────────────────
    const startResendCountdown = useCallback(() => {
        setResendCountdown(60);
        const timer = setInterval(() => {
            setResendCountdown((c) => {
                if (c <= 1) { clearInterval(timer); return 0; }
                return c - 1;
            });
        }, 1000);
    }, []);

    // ── Form fields ─────────────────────────────────────────────────────────
    const fields: Field[] = isOtp
        ? [
            {
                name: "code",
                label: "Verification code",
                placeholder: "Enter 6-digit OTP",
                rule: z.string().regex(/^\d{6}$/, "Enter exactly 6 digits."),
            },
        ]
        : [
            {
                name: "country",
                label: "Country code",
                options: ["+91", "+1", "+44", "+971", "+61", "+65"],
                rule: z.string().min(1),
            },
            {
                name: "phone",
                label: "Phone number",
                type: "tel",
                placeholder: "9876543210",
                rule: z.string().regex(/^\d{7,12}$/, "Enter 7–12 digits."),
            },
        ];

    // ── OTP page: look up stored phone for display ──────────────────────────
    const otpSession = isOtp && typeof window !== "undefined" ? readOtpSession() : null;

    return (
        <section className="container grid min-h-[75vh] items-center gap-12 py-16 lg:grid-cols-2">
            {/* Left panel — hero copy */}
            <div className="hidden lg:block">
                <p className="eyebrow">More clarity. Less calculation.</p>
                <h2 className="mt-5 max-w-lg text-5xl font-bold leading-tight tracking-tight">
                    Built for the people<br />
                    who build{" "}
                    <span className="text-sky-500">better spaces.</span>
                </h2>
                <p className="muted mt-6 max-w-md leading-8">
                    Bring your aluminium projects, people, and plans into one workspace.
                </p>
                <div className="mt-8 flex gap-5 text-sm">
                    <span>✓ Free to explore</span>
                    <span>✓ No card required</span>
                    <span>✓ OTP login — no passwords</span>
                </div>
            </div>

            {/* Right panel — auth card */}
            <div className="card mx-auto w-full max-w-md !p-8">
                <h1 className="text-3xl font-bold tracking-tight">{TITLES[mode]}</h1>

                {isOtp ? (
                    <p className="muted mb-7 mt-3 text-sm">
                        {otpSession
                            ? `We sent a 6-digit code to ${otpSession.phone}. It expires in ${otpSession.expiresInMinutes} minutes.`
                            : "Enter the 6-digit code sent to your phone."}
                    </p>
                ) : (
                    <p className="muted mb-7 mt-3 text-sm">
                        Enter your phone number to receive a one-time code. No password needed.
                    </p>
                )}

                {/* ── Phone / OTP form ──────────────────────────────────────── */}
                <SmartForm
                    fields={fields}
                    defaults={{ country: "+91" }}
                    submitLabel={isOtp ? "Verify and continue" : "Continue with phone"}
                    onSubmit={async (values) => {
                        setError("");
                        if (isOtp) {
                            const user = await authApi.verifyOtp(values.code);
                            await finish(user);
                        } else {
                            const phone = values.country + values.phone;
                            await authApi.requestOtp(phone);
                            startResendCountdown();
                            router.push("/verify-otp" + window.location.search);
                        }
                    }}
                />

                {/* ── OTP page extras ───────────────────────────────────────── */}
                {isOtp && (
                    <div className="mt-4">
                        <button
                            type="button"
                            disabled={resendCountdown > 0 || !otpSession}
                            className="text-sm text-sky-500 disabled:opacity-40 disabled:cursor-not-allowed"
                            onClick={async () => {
                                if (!otpSession) return;
                                setError("");
                                try {
                                    await authApi.resendOtp(otpSession.phone);
                                    startResendCountdown();
                                } catch (err) {
                                    setError(err instanceof Error ? err.message : "Could not resend OTP.");
                                }
                            }}
                        >
                            {resendCountdown > 0
                                ? `Resend in ${resendCountdown}s`
                                : "Didn't receive a code? Resend"}
                        </button>
                    </div>
                )}

                {/* ── Social login (login page only) ────────────────────────── */}
                {!isOtp && (
                    <>
                        <div className="muted my-6 flex items-center gap-4 text-xs">
                            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                            or continue with
                            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                        </div>

                        <div className="grid gap-2">
                            {SOCIAL_PROVIDERS.map((provider) => (
                                <Button
                                    key={provider.id}
                                    variant="outline"
                                    disabled={!!socialBusy || !provider.enabled}
                                    onClick={() => {
                                        if (!provider.enabled) {
                                            setError(`${provider.label.replace("Continue with ", "")} login is coming soon.`);
                                            return;
                                        }
                                        if (provider.id === "google") {
                                            setSocialBusy("google");
                                            setError("");
                                            handleGoogleLogin();
                                        }
                                    }}
                                    className="relative"
                                >
                                    <span className="mr-2 font-bold">{provider.icon}</span>
                                    {socialBusy === provider.id
                                        ? "Signing in…"
                                        : provider.enabled
                                        ? provider.label
                                        : `${provider.label} (Coming soon)`}
                                </Button>
                            ))}
                        </div>
                    </>
                )}

                {/* ── Error display ─────────────────────────────────────────── */}
                {error && (
                    <p role="alert" className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                        {error}
                    </p>
                )}

                {/* ── Nav links ─────────────────────────────────────────────── */}
                <div className="muted mt-6 flex flex-wrap justify-between gap-3 text-xs">
                    <Link href="/login">Log in</Link>
                    <Link href="/register">Create account</Link>
                    <Link href="/forgot-password">Recover access</Link>
                </div>

                {isOtp && (
                    <Link href="/login" className="mt-5 block text-sm text-sky-500">
                        ← Use a different number
                    </Link>
                )}

                <p className="muted mt-6 border-t pt-5 text-xs leading-6">
                    By continuing, you agree to the{" "}
                    <Link className="underline" href="/terms">Terms of Service</Link>{" "}
                    and{" "}
                    <Link className="underline" href="/privacy-policy">Privacy Policy</Link>.
                </p>
            </div>
        </section>
    );
}
