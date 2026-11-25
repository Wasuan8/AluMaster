import type { Metadata } from "next";
import { Pricing } from "@/components/pricing/pricing";

export const metadata: Metadata = {
    title: "Pricing",
description: "Pricing — AluMaster aluminium business platform.",
alternates: { canonical: "/pricing" },
  
};

export default function Page() { return <Pricing  />; }
