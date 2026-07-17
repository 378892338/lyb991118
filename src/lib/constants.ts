export const SITE_CONFIG = {
  name: "Second Curve Lab",
  shortName: "SCL",
  tagline: "AI时代的人生第二曲线实验室",
  url: "https://liuybhub.top",
  description:
    "一个20年制造业财务人的AI重构实践 — 80% AI实验室 + 20% 企业AI顾问",
  email: "",
  github: "https://github.com/378892338",
  social: {
    github: "https://github.com/378892338",
  },
};

export const NAV_ITEMS = [
  { label: "Home", labelCn: "首页", href: "/#hero" },
  { label: "Journey", labelCn: "历程", href: "/#journey" },
  { label: "Experiments", labelCn: "实验", href: "/experiments" },
  { label: "AI Insights", labelCn: "洞察", href: "/ai-insights" },
  { label: "Cases", labelCn: "案例", href: "/cases" },
  { label: "Articles", labelCn: "文章", href: "/articles" },
  { label: "About", labelCn: "关于", href: "/about" },
  { label: "Contact", labelCn: "联系", href: "/contact" },
] as const;

export const CONTENT_TAG_LINES = [
  { id: "career-transition", label: "人生第二曲线", color: "brand" },
  { id: "enterprise-ai", label: "企业AI应用", color: "brand" },
  { id: "manufacturing-digital", label: "制造业数字化", color: "brand" },
] as const;
