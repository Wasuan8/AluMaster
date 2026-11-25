import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard";

export const metadata: Metadata = {
    title: "Workspace",
    robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
