import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = siteConfig.description;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          background: "#FFCD11",
          color: "#2D2D2D",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              background: "#2D2D2D",
              color: "#FFCD11",
              fontSize: 32,
              fontWeight: 800,
              borderRadius: 8,
            }}
          >
            SG
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.15 }}>
            국내 생산 철제 분전반
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.15 }}>
            SUS 스테인리스 분전함
          </div>
          <div style={{ fontSize: 28, marginTop: 24, opacity: 0.8 }}>
            맞춤 사이즈 · 1-3일 빠른 납기 · 경기도 화성
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
