import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0F172A",
                secondary: "#1E293B",
                accent: "#0EA5E9",
                success: "#22C55E",
                warning: "#F59E0B",
            },
        },
    },
    plugins: [],
} satisfies Config;
