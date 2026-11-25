import type { Metadata } from "next";
import { Auth } from "@/components/auth/auth";

export const metadata: Metadata = {
    title: "Forgot Password",
description: "Forgot Password — AluMaster aluminium business platform.",
alternates: { canonical: "/forgot-password" },
  robots: { index: false, follow: false },
};

export default function Page() { return <Auth mode="forgot-password" />; }
