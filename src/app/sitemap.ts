import type { MetadataRoute } from "next";
import { publicRoutes } from "@/constants/content";

export default function sitemap(): MetadataRoute.Sitemap {
    const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return publicRoutes.map(route => ({
        url: new URL(route, site).toString(),
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : route === "/pricing" ? 0.9 : 0.5,
    }));
}
