"use client";

import { useState, useCallback } from "react";
import { MessageCircle } from "lucide-react";
import AlmanacCard from "./AlmanacCard";
import type { AlmanacDay } from "@/lib/almanac";

interface Props {
  todayData?: AlmanacDay | null;
}

export default function AIChatButton({ todayData }: Props) {
  const [showAlmanac, setShowAlmanac] = useState(false);

  const handleChat = useCallback(() => {
    alert("AI 助手即将上线，敬请期待！");
  }, []);

  const handleAlmanac = useCallback(() => {
    if (!showAlmanac) setShowAlmanac(true);
  }, [showAlmanac]);

  return (
    <>
      {showAlmanac && todayData && (
        <AlmanacCard data={todayData} onClose={() => setShowAlmanac(false)} />
      )}

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {/* 黄历按钮 — 小叶子图标 */}
        {!showAlmanac && todayData && (
          <button
            onClick={handleAlmanac}
            className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 shadow-md hover:bg-amber-200 hover:shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center text-lg"
            aria-label="今日黄历"
            title="今日黄历"
          >
            🍂
          </button>
        )}

        {/* 聊天按钮 */}
        <button
          onClick={handleChat}
          className="w-12 h-12 rounded-full bg-brand-500 text-white shadow-lg hover:bg-brand-600 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center animate-pulse"
          aria-label="AI Assistant"
        >
          <MessageCircle size={20} />
        </button>
      </div>
    </>
  );
}
