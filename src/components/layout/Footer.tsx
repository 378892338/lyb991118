import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-neutral-400">
          <Link
            href="/"
            className="font-medium text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            {SITE_CONFIG.shortName}
          </Link>{" "}
          · {SITE_CONFIG.tagline}
        </div>
        <div className="flex items-center gap-4">
          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            GitHub
          </a>
          <span className="text-neutral-200">·</span>
          <span className="text-sm text-neutral-400">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
