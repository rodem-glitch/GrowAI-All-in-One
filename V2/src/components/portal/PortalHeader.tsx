"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Solutions", href: "#services" },
  { label: "AI Engine", href: "#ai-engine" },
  { label: "Methodology", href: "#methodology" },
  { label: "Use Cases", href: "#use-cases" },
];

export default function PortalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#06060a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold text-white"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 34 34"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="portalLogoBg"
                x1="0"
                y1="0"
                x2="34"
                y2="34"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="34" height="34" rx="8" fill="url(#portalLogoBg)" />
            <path
              d="M30 2Q23 9 13 19Q5 27 3 33Q16 25 25 14Q31 7 30 2Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M30 2Q17 17 3 33"
              stroke="white"
              strokeWidth="0.9"
              strokeOpacity="0.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          GrowAI
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white hover:bg-white/[0.06]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/login"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Sign In
          </a>
          <a
            href="#contact"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`block h-0.5 w-6 bg-gray-400 transition-transform duration-300 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-400 transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-400 transition-transform duration-300 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[#06060a]/95 backdrop-blur-xl px-6 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.06]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <hr className="my-3 border-white/[0.06]" />
            <a
              href="/login"
              className="rounded-lg px-3 py-3 text-sm font-medium text-gray-400 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </a>
            <a
              href="#contact"
              className="mt-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
