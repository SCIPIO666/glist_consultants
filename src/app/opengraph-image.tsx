import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default share card for every page that has no image of its own. Brand colours only. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#002025", color: "#fff", position: "relative", padding: 80 }}>
        <div style={{ position: "absolute", right: -140, top: -140, width: 560, height: 560, borderRadius: 9999, border: "2px solid rgba(255,255,255,0.14)", display: "flex" }} />
        <div style={{ position: "absolute", right: 90, bottom: 70, width: 220, height: 220, borderRadius: 9999, background: "#d9a62e", display: "flex" }} />
        <div style={{ position: "absolute", right: 250, bottom: 250, width: 70, height: 70, borderRadius: 9999, background: "#d62828", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", width: "70%" }}>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, textTransform: "uppercase", color: "#d9a62e" }}>{site.descriptor}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
            <div style={{ display: "flex", fontSize: 40, marginTop: 24, color: "rgba(255,255,255,0.78)" }}>{site.tagline}</div>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.6)" }}>Tax, payroll, registrations, bookkeeping and rental property management in Kenya</div>
        </div>
      </div>
    ),
    size,
  );
}
