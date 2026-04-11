"use client";

import Link from "next/link";

const footerLinks = {
  platform: {
    title: "Platform",
    items: [
      { label: "LearnForm", href: "/learnform" },
      { label: "LMS", href: "/lms" },
      { label: "MAP", href: "/map" },
      { label: "VLS", href: "/vls" },
      { label: "VAS", href: "/vas" },
    ],
  },
  solutions: {
    title: "Solutions",
    items: [
      { label: "CCB", href: "/ccb" },
      { label: "CCS", href: "/ccs" },
      { label: "CDN", href: "/cdn" },
      { label: "CMS", href: "/cms" },
    ],
  },
  resources: {
    title: "Resources",
    items: [
      { label: "Documentation", href: "#docs" },
      { label: "API Reference", href: "#api" },
      { label: "Community", href: "#community" },
      { label: "Blog", href: "#blog" },
    ],
  },
  company: {
    title: "Company",
    items: [
      { label: "About NEWKLE Inc.", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
};

export default function PortalFooter() {
  return (
    <footer className="bg-[#030305] border-t border-white/[0.06] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-white mb-4"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 34 34"
                fill="none"
              >
                <defs>
                  <linearGradient
                    id="footerLogoBg"
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
                <rect
                  width="34"
                  height="34"
                  rx="8"
                  fill="url(#footerLogoBg)"
                />
                <path
                  d="M30 2Q23 9 13 19Q5 27 3 33Q16 25 25 14Q31 7 30 2Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
              GrowAI
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              All-in-One AI Solutions
              <br />
              by NEWKLE Inc.
            </p>
            <a
              href="mailto:help@newkl.net"
              className="text-sm text-gray-600 hover:text-gray-400 transition-colors mt-3 block"
            >
              help@newkl.net
            </a>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-700">
            &copy; {new Date().getFullYear()} GrowAI by NEWKLE Inc. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#terms"
              className="text-xs text-gray-700 hover:text-gray-400 transition-colors"
            >
              Terms
            </a>
            <a
              href="#privacy"
              className="text-xs text-gray-700 hover:text-gray-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#security"
              className="text-xs text-gray-700 hover:text-gray-400 transition-colors"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
