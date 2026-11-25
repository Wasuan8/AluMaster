import type { Metadata, Viewport } from "next";
import { Shell } from "@/components/shell";
import { Providers } from "@/components/providers";
import "./globals.css";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(site),
    title: { default: "AluMaster — Aluminium Estimation Made Simple", template: "%s | AluMaster" },
    description: "Explore aluminium estimation, material planning, quotations, projects, and team management with AluMaster.",
    applicationName: "AluMaster",
    openGraph: {
        title: "AluMaster — Professional Aluminium Estimation",
        description: "Less time calculating. More time building.",
        siteName: "AluMaster",
        type: "website",
        locale: "en_IN",
    },
    twitter: { card: "summary_large_image" },
    manifest: "/manifest.webmanifest",
    icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0F172A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>
                    <Shell>{children}</Shell>
                </Providers>
            </body>
        </html>
    );
}
