import type { Metadata } from "next";
import { About } from "@/components/content-pages";

export const metadata: Metadata = {
    title: "About Us",
description: "About Us — AluMaster aluminium business platform.",
alternates: { canonical: "/about" },
  
};

export default function Page() { return <About  />; }
