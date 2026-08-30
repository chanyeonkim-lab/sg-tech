import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = siteConfig.description;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [bold, black] = await Promise.all([
    fetch(new URL("/fonts/Pretendard-Bold.woff2", siteConfig.url)).then((r) =>
      r.arrayBuffer()
    ),
    fetch(new URL("/fonts/Pretendard-Black.woff2", siteConfig.url)).then((r) =>
      r.arrayBuffer()
    ),
  ]);

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
          fontFamily: "Pretendard",
        }}
      >
        {/* 브래킷 로고 마크 */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ width: 12, height: 20, background: "#2D2D2D" }} />
            <div style={{ flex: 1, height: 8, background: "#2D2D2D" }} />
            <div style={{ width: 12, height: 20, background: "#2D2D2D" }} />
          </div>
          <div
            style={{
              padding: "12px 20px",
              fontSize: 56,
              fontWeight: 900,
              fontFamily: "Pretendard-Black",
              display: "flex",
              gap: 4,
              lineHeight: 1,
            }}
          >
            <span style={{ color: "#2D2D2D" }}>SG</span>
            <span style={{ color: "#2D2D2D" }}>기전</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: 12, height: 20, background: "#2D2D2D" }} />
            <div style={{ flex: 1, height: 8, background: "#2D2D2D" }} />
            <div style={{ width: 12, height: 20, background: "#2D2D2D" }} />
          </div>
        </div>

        {/* 카피 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 72, fontWeight: 900, fontFamily: "Pretendard-Black", lineHeight: 1.1 }}>
            국내 생산 철제 분전반
          </div>
          <div style={{ fontSize: 72, fontWeight: 900, fontFamily: "Pretendard-Black", lineHeight: 1.1 }}>
            SUS 스테인리스 분전함
          </div>
          <div style={{ fontSize: 30, marginTop: 24, opacity: 0.75 }}>
            맞춤 사이즈 · 1-3일 빠른 납기 · 국가 자격증 보유
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: bold, style: "normal", weight: 700 },
        { name: "Pretendard-Black", data: black, style: "normal", weight: 900 },
      ],
    }
  );
}
