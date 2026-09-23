import { ImageResponse } from "next/og";

// Google Search 는 favicon 이 48px 의 배수일 것을 요구한다.
// 32×32 는 브라우저 탭에는 뜨지만 Google favicon 인덱서에서 스킵됨.
// 96×96 은 48 의 배수이면서 레티나 디스플레이에도 선명하게 다운스케일된다.
export const runtime = "edge";
export const size = { width: 96, height: 96 };
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
            marginTop: 6,
          }}
        >
          <div style={{ width: 9, height: 18, background: "#F5C63C" }} />
          <div
            style={{
              flex: 1,
              height: 9,
              background: "#F5C63C",
              alignSelf: "flex-start",
            }}
          />
          <div style={{ width: 9, height: 18, background: "#F5C63C" }} />
        </div>

        {/* SG letters */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#F5C63C",
            lineHeight: 1,
            letterSpacing: -1.5,
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
            marginBottom: 6,
          }}
        >
          <div style={{ width: 9, height: 18, background: "#2D2D2D" }} />
          <div
            style={{
              flex: 1,
              height: 9,
              background: "#2D2D2D",
              alignSelf: "flex-end",
            }}
          />
          <div style={{ width: 9, height: 18, background: "#2D2D2D" }} />
        </div>
      </div>
    ),
    size,
  );
}
