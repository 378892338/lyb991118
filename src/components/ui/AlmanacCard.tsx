"use client";

import { useState, useEffect, useRef } from "react";
import type { AlmanacDay } from "@/lib/almanac";

interface FallingLeaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
  sway: number;
}

/**
 * 黄历卡片 — 小巧精致，宣纸质感，hover放大
 */
export default function AlmanacCard({
  data,
  onClose,
}: {
  data: AlmanacDay;
  onClose: () => void;
}) {
  const [leaves, setLeaves] = useState<FallingLeaf[]>([]);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 生成叶子
  useEffect(() => {
    const list: FallingLeaf[] = [];
    for (let i = 0; i < 8; i++) {
      list.push({
        id: i,
        left: 60 + Math.random() * 25, // 从聊天窗口右侧飘出
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        rotation: Math.random() * 360,
        size: 10 + Math.random() * 8,
        sway: -20 + Math.random() * 40,
      });
    }
    setLeaves(list);
  }, []);

  return (
    <>
      {/* 叶子飘落 */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="fixed pointer-events-none z-[101]"
          style={{
            left: `${leaf.left}%`,
            top: "-20px",
            animation: `leaf-fall-${leaf.id} ${leaf.duration}s ${leaf.delay}s ease-in forwards`,
            fontSize: leaf.size,
            opacity: 0,
            "--sway": `${leaf.sway}px`,
            "--rot": `${leaf.rotation}deg`,
          } as React.CSSProperties}
        >
          🍂
        </div>
      ))}

      {/* 卡片 */}
      <div
        ref={cardRef}
        className="fixed z-[102]"
        style={{
          right: "80px",
          bottom: hovered ? "100px" : "88px",
          width: hovered ? "260px" : "180px",
          maxHeight: hovered ? "380px" : "240px",
          transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* 宣纸卡片 */}
        <div
          className="rounded-md overflow-hidden"
          style={{
            background: "#f5ecd7",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
            border: "1px solid rgba(139, 119, 80, 0.18)",
            boxShadow: "0 2px 12px rgba(40, 25, 10, 0.08), 0 1px 3px rgba(40, 25, 10, 0.04)",
            writingMode: "vertical-rl",
            color: "#3d2b1f",
            fontFamily: "'KaiTi', 'STKaiti', 'FangSong', serif",
            padding: hovered ? "20px 14px" : "12px 8px",
            cursor: "pointer",
          }}
        >
          {/* 关闭 */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-600"
            style={{ writingMode: "horizontal-tb", fontSize: "10px", lineHeight: 1 }}
          >
            ✕
          </button>

          {/* 内边框 */}
          <div
            className="absolute inset-1 pointer-events-none"
            style={{ border: "1px solid rgba(139, 119, 80, 0.08)", borderRadius: "2px" }}
          />

          {/* 阳历日期 */}
          <div
            style={{
              position: "absolute",
              top: hovered ? "12px" : "8px",
              right: hovered ? "16px" : "10px",
              writingMode: "horizontal-tb",
              fontSize: hovered ? "13px" : "10px",
              fontWeight: 700,
              color: "#c41e3a",
              letterSpacing: "1px",
              transition: "all 0.35s ease",
            }}
          >
            {data.solarDate.slice(5)}
          </div>

          {/* 竖排正文 */}
          <div
            className="relative flex flex-col items-center"
            style={{
              gap: hovered ? "14px" : "8px",
              margin: `${hovered ? 24 : 16}px 0`,
              fontSize: hovered ? "14px" : "11px",
              lineHeight: 2,
              letterSpacing: hovered ? "3px" : "1px",
              transition: "all 0.35s ease",
            }}
          >
            {/* 农历 */}
            <div>
              <div style={{ fontSize: hovered ? "10px" : "8px", color: "#8b7750", letterSpacing: hovered ? "4px" : "2px", marginBottom: "2px", transition: "all 0.35s ease" }}>
                农历
              </div>
              <div>{data.lunarDate}</div>
            </div>

            {/* 干支 */}
            <div>
              <div style={{ fontSize: hovered ? "10px" : "8px", color: "#8b7750", letterSpacing: hovered ? "4px" : "2px", marginBottom: "2px", transition: "all 0.35s ease" }}>
                干支
              </div>
              <div style={{ fontSize: hovered ? "12px" : "10px", transition: "all 0.35s ease" }}>
                {data.ganzhiYear}
                <br />
                {data.ganzhiMonth}
                <br />
                {data.ganzhiDay}
              </div>
            </div>

            {/* 宜 */}
            <div>
              <div style={{ fontSize: hovered ? "10px" : "8px", color: "#8b7750", letterSpacing: hovered ? "3px" : "1px", marginBottom: "2px", transition: "all 0.35s ease" }}>
                宜
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", justifyContent: "center" }}>
                {data.yi.map((item) => (
                  <span key={item} style={{ fontSize: hovered ? "12px" : "10px", transition: "all 0.35s ease" }}>{item}</span>
                ))}
              </div>
            </div>

            {/* 忌 */}
            <div>
              <div style={{ fontSize: hovered ? "10px" : "8px", color: "#8b7750", letterSpacing: hovered ? "3px" : "1px", marginBottom: "2px", transition: "all 0.35s ease" }}>
                忌
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", justifyContent: "center" }}>
                {data.ji.map((item) => (
                  <span key={item} style={{ fontSize: hovered ? "12px" : "10px", transition: "all 0.35s ease" }}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 印章 */}
          <div
            style={{
              position: "absolute",
              bottom: hovered ? "16px" : "10px",
              right: hovered ? "14px" : "8px",
              width: hovered ? "52px" : "40px",
              height: hovered ? "52px" : "40px",
              border: "2px solid #c41e3a",
              borderRadius: "3px",
              color: "#c41e3a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              writingMode: "horizontal-tb",
              transform: `rotate(${-5 + Math.random() * 10}deg)`,
              transition: "all 0.35s ease",
            }}
          >
            <span style={{ fontSize: hovered ? "11px" : "9px", fontWeight: 700, lineHeight: 1.3, textAlign: "center", letterSpacing: "1px", transition: "all 0.35s ease" }}>
              {"第\n二\n曲\n线"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
