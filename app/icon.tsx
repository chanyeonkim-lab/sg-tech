import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
        {/* Top yellow bracket ⌐——¬ */}
        <div
          style={{
            display: "flex",
            width: "78%",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: 2,
          }}
        >
          <div style={{ width: 3, height: 6, background: "#F5C63C" }} />
          <div style={{ flex: 1, height: 3, background: "#F5C63C", alignSelf: "flex-start" }} />
          <div style={{ width: 3, height: 6, background: "#F5C63C" }} />
        </div>

        {/* SG letters */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "#F5C63C",
            lineHeight: 1,
            letterSpacing: -0.5,
            display: "flex",
          }}
        >
          SG
        </div>

        {/* Bottom black bracket L——J */}
        <div
          style={{
            display: "flex",
            width: "78%",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 2,
          }}
        >
          <div style={{ width: 3, height: 6, background: "#2D2D2D" }} />
          <div style={{ flex: 1, height: 3, background: "#2D2D2D", alignSelf: "flex-end" }} />
          <div style={{ width: 3, height: 6, background: "#2D2D2D" }} />
        </div>
      </div>
    ),
    size,
  );
}
