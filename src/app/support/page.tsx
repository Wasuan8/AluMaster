import type { Metadata } from "next";
import { Support } from "@/components/content-pages";

export const metadata: Metadata = {
    title: "Support",
description: "Support — AluMaster aluminium business platform.",
alternates: { canonical: "/support" },
  
};

export default function Page() { return <Support  />; }
