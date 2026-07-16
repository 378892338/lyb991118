import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChatButton from "@/components/ui/AIChatButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://liuybhub.top"),
  title: {
    default: "Second Curve Lab | 第二曲线实验室",
    template: "%s | Second Curve Lab",
  },
  description:
    "AI时代的人生第二曲线实验室 — 80% AI实验室 + 20% 企业AI顾问。一个20年制造业财务人的AI重构实践。",
  openGraph: {
    title: "Second Curve Lab | 第二曲线实验室",
    description:
      "AI时代的人生第二曲线实验室 — 80% AI实验室 + 20% 企业AI顾问",
    url: "https://liuybhub.top",
    siteName: "Second Curve Lab",
    locale: "zh_CN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-neutral-0 text-neutral-900 font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AIChatButton />
      </body>
    </html>
  );
}
