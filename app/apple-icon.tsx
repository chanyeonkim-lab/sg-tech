import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* Top yellow bracket */}
        <div
          style={{
            display: "flex",
            width: "72%",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: 18,
          }}
        >
          <div style={{ width: 14, height: 30, background: "#F5C63C" }} />
          <div
            style={{
              flex: 1,
              height: 14,
              background: "#F5C63C",
              alignSelf: "flex-start",
            }}
          />
          <div style={{ width: 14, height: 30, background: "#F5C63C" }} />
        </div>

        {/* SG letters */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#F5C63C",
            lineHeight: 1,
            letterSpacing: -3,
            display: "flex",
            margin: "8px 0",
          }}
        >
          SG
        </div>

        {/* Bottom black bracket */}
        <div
          style={{
            display: "flex",
            width: "72%",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 18,
          }}
        >
          <div style={{ width: 14, height: 30, background: "#2D2D2D" }} />
          <div
            style={{
              flex: 1,
              height: 14,
              background: "#2D2D2D",
              alignSelf: "flex-end",
            }}
          />
          <div style={{ width: 14, height: 30, background: "#2D2D2D" }} />
        </div>
      </div>
    ),
    size,
  );
}
