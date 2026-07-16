"use client";

export default function AIChatButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => alert("AI 助手即将上线，敬请期待！")}
        className="w-12 h-12 rounded-full bg-brand-500 text-white shadow-lg
          hover:bg-brand-600 hover:shadow-xl hover:scale-105
          transition-all duration-300 flex items-center justify-center
          animate-pulse"
        aria-label="AI Assistant"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
}
