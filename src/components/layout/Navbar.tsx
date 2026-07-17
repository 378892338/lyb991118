"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import type { NavItem } from "@/lib/constants";
import { Menu, X } from "lucide-react";

function NavLink({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href || "#"}
      className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
    >
      {item.label}
      <span className="ml-1 text-neutral-300">/</span>
      <span className="ml-1 text-neutral-400">{item.labelCn}</span>
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-0/80 backdrop-blur-xl border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 hover:text-brand-600 transition-colors"
        >
          {SITE_CONFIG.shortName}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-neutral-0/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
