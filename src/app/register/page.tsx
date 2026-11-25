import type { Metadata } from "next";
import { Auth } from "@/components/auth/auth";

export const metadata: Metadata = {
    title: "Register",
description: "Register — AluMaster aluminium business platform.",
alternates: { canonical: "/register" },
  robots: { index: false, follow: false },
};

export default function Page() { return <Auth mode="register" />; }
