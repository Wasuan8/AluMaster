import { ImageResponse } from "next/og";

export const alt = "AluMaster — Professional Aluminium Estimation Made Simple";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "#0F172A", color: "white" }}>
            <div style={{ display: "flex", fontSize: 32, color: "#38BDF8", marginBottom: 32 }}>AluMaster</div>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>Professional Aluminium Estimation Made Simple.</div>
            <div style={{ display: "flex", fontSize: 25, color: "#94A3B8", marginTop: 32 }}>Less time calculating. More time building.</div>
        </div>,
        size
    );
}
