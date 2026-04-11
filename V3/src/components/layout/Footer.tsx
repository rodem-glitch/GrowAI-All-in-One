"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { PAGE_VISIBILITY } from "@/config/feature-flags";

const columnHeadingClass =
  "text-sm font-semibold text-white uppercase tracking-wider mb-4";

const linkClass =
  "text-sm text-gray-400 hover:text-white transition-colors duration-200";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    product: [
      PAGE_VISIBILITY.pricing && { label: t.footer.productLinks[0], href: "/pricing" },
      { label: t.footer.productLinks[1], href: "/download" },
      { label: t.footer.productLinks[2], href: "/data-protection" },
      { label: t.footer.productLinks[3], href: "/whats-new" },
    ].filter(Boolean) as { label: string; href: string }[],
    resources: [
      { label: t.footer.resourceLinks[0], href: "/community" },
      { label: t.footer.resourceLinks[1], href: "/discord" },
      { label: t.footer.resourceLinks[2], href: "/help-center" },
      { label: t.footer.resourceLinks[3], href: "/blog" },
    ],
    company: [
      { label: t.footer.companyLinks[0], href: "/about" },
      { label: t.footer.companyLinks[1], href: "/careers" },
      { label: t.footer.companyLinks[2], href: "/terms" },
      { label: t.footer.companyLinks[3], href: "/privacy-policy" },
      { label: t.footer.companyLinks[4], href: "/refund" },
    ],
  };

  return (
    <footer className="py-16 px-6 bg-[#242728] dark:bg-[#0a0b0c] border-t border-gray-700">
      <div className="max-w-[1200px] mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <span className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="fLogoBg" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0c2d48" />
                    <stop offset="100%" stopColor="#1a5276" />
                  </linearGradient>
                </defs>
                <rect width="34" height="34" rx="10" fill="url(#fLogoBg)" />
                <text x="17" y="25" textAnchor="middle" fill="white" fontSize="24" fontFamily="'Times New Roman', Georgia, serif" fontWeight="400">&#937;</text>
              </svg>
              <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}>
                GrowAI
              </span>
            </span>
            <p className="text-sm text-gray-400">{t.footer.tagline}</p>
            <a
              href="mailto:help@newkl.net"
              className="text-sm text-gray-400 mt-4 hover:text-white transition-colors duration-200 block"
            >
              help@newkl.net
            </a>
          </div>

          {/* Column 2 - Product */}
          <div>
            <h3 className={columnHeadingClass}>{t.footer.product}</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className={columnHeadingClass}>{t.footer.resources}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h3 className={columnHeadingClass}>{t.footer.company}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">{t.footer.copyright}</p>
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-gray-400 border border-gray-600 px-3 py-1.5 rounded-lg hover:text-white hover:border-gray-400 transition-colors duration-200"
          >
            {/* Globe icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {t.footer.language}
          </button>
        </div>
      </div>
    </footer>
  );
}
