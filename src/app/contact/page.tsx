import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "商业合作、交流联系 — 一起探索AI的可能性。",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">
          Contact
        </h1>
        <p className="text-lg text-neutral-400 mb-12">
          商业合作、交流入口
        </p>

        <div className="space-y-8">
          <div className="p-8 rounded-xl bg-neutral-50 border border-neutral-100">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">
              企业AI合作
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              如果您的企业在探索AI应用落地，欢迎联系交流。
              我可以提供AI转型咨询、AI应用方案设计等服务。
            </p>
          </div>

          <div className="p-8 rounded-xl bg-neutral-50 border border-neutral-100">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">
              交流与反馈
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              如果您对AI、职业转型或制造业数字化有兴趣，欢迎通过以下方式联系。
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-700 transition-colors"
              >
                GitHub →
              </a>
            </div>
          </div>

          <p className="text-sm text-neutral-400 text-center pt-8 border-t border-neutral-100">
            联系入口持续完善中...
          </p>
        </div>
      </div>
    </div>
  );
}
