import type { Metadata } from "next";
import { Contact } from "@/components/content-pages";

export const metadata: Metadata = {
    title: "Contact",
description: "Contact — AluMaster aluminium business platform.",
alternates: { canonical: "/contact" },
  
};

export default function Page() { return <Contact  />; }
