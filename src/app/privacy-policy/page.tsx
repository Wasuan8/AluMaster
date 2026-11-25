import type { Metadata } from "next";
import { Legal } from "@/components/content-pages";

export const metadata: Metadata = {
    title: "Privacy Policy",
description: "Privacy Policy — AluMaster aluminium business platform.",
alternates: { canonical: "/privacy-policy" },
  
};

export default function Page() { return <Legal kind="privacy" />; }
