import type { Metadata } from "next";
import { Auth } from "@/components/auth/auth";

export const metadata: Metadata = {
    title: "Login",
description: "Login — AluMaster aluminium business platform.",
alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function Page() { return <Auth mode="login" />; }
