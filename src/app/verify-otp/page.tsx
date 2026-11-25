import type { Metadata } from "next";
import { Auth } from "@/components/auth/auth";

export const metadata: Metadata = {
    title: "Verify Otp",
description: "Verify Otp — AluMaster aluminium business platform.",
alternates: { canonical: "/verify-otp" },
  robots: { index: false, follow: false },
};

export default function Page() { return <Auth mode="verify-otp" />; }
