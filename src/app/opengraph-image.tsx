import { ImageResponse } from "next/og";
import { site } from "@/content/profile";

export const alt = site.title;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(145deg, #050508 0%, #0c0d12 45%, #0a1a18 100%)",
          color: "#f4f4f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#2dd4bf",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#a1a1aa",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {site.description}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            color: "#2dd4bf",
          }}
        >
          alperenus.site
        </div>
      </div>
    ),
    { ...size },
  );
}
