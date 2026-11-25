import type { Metadata } from "next";
import { Legal } from "@/components/content-pages";

export const metadata: Metadata = {
    title: "Terms & Conditions",
description: "Terms & Conditions — AluMaster aluminium business platform.",
alternates: { canonical: "/terms" },
  
};

export default function Page() { return <Legal kind="terms" />; }
