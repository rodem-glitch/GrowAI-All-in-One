"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const columnHeadingClass =
  "text-sm font-semibold text-white uppercase tracking-wider mb-4";

const linkClass =
  "text-sm text-gray-400 hover:text-white transition-colors duration-200";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    product: [
      { label: t.footer.productLinks[0], href: "#" },
      { label: t.footer.productLinks[1], href: "#" },
      { label: t.footer.productLinks[2], href: "#" },
      { label: t.footer.productLinks[3], href: "#" },
    ],
    resources: [
      { label: t.footer.resourceLinks[0], href: "#" },
      { label: t.footer.resourceLinks[1], href: "#" },
      { label: t.footer.resourceLinks[2], href: "#" },
      { label: t.footer.resourceLinks[3], href: "#" },
    ],
    company: [
      { label: t.footer.companyLinks[0], href: "#" },
      { label: t.footer.companyLinks[1], href: "#" },
      { label: t.footer.companyLinks[2], href: "#" },
      { label: t.footer.companyLinks[3], href: "#" },
      { label: t.footer.companyLinks[4], href: "#" },
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
                  <radialGradient id="fHighlight" cx="75%" cy="25%" r="40%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="34" height="34" rx="8" fill="url(#fLogoBg)" />
                <path d="M30 2Q23 9 13 19Q5 27 3 33Q16 25 25 14Q31 7 30 2Z" fill="white" fillOpacity="0.85" />
                <path d="M30 2Q17 17 3 33" stroke="white" strokeWidth="0.9" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
                <rect width="34" height="34" rx="8" fill="url(#fHighlight)" />
              </svg>
              LearnForm
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
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
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
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
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
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
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
