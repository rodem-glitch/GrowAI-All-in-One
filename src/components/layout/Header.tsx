import { useState, useRef, useEffect } from "react";
import { useLanguage, type Locale } from "../../contexts/LanguageContext";
import { useTheme, type AccentColor } from "../../contexts/ThemeContext";

type DropdownKey = "features" | "solutions" | "resources" | null;

/* ── Accent color swatch map ── */
const ACCENT_SWATCHES: Record<AccentColor, string> = {
  teal:   "#14a1c8",
  blue:   "#3b82f6",
  purple: "#8b5cf6",
  orange: "#f97316",
  green:  "#22c55e",
};

/* ── SVG helpers ── */
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`ml-1 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ── Main component ── */
export default function Header() {
  const { locale, setLocale, t } = useLanguage();
  const { mode, toggleMode, accent, setAccent, colors, accentOptions } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* Build menu data from translations */
  const FEATURES_ITEMS = [
    { label: t.navFeatures.aiContent.label, desc: t.navFeatures.aiContent.desc, href: "#ai-content" },
    { label: t.navFeatures.creator.label,   desc: t.navFeatures.creator.desc,   href: "#creator" },
    { label: t.navFeatures.fkds.label,      desc: t.navFeatures.fkds.desc,      href: "#fkds" },
    { label: t.navFeatures.assessment.label,desc: t.navFeatures.assessment.desc,href: "#assessment" },
    { label: t.navFeatures.lms.label,       desc: t.navFeatures.lms.desc,       href: "#lms" },
  ];

  const SOLUTIONS_MENU = {
    teams: {
      title: t.navSolutions.teams,
      items: [
        { label: t.navSolutions.instructor.label, desc: t.navSolutions.instructor.desc, href: "#instructor" },
        { label: t.navSolutions.corporate.label,  desc: t.navSolutions.corporate.desc,  href: "#corporate" },
        { label: t.navSolutions.vocational.label, desc: t.navSolutions.vocational.desc, href: "#vocational" },
      ],
    },
    useCases: {
      title: t.navSolutions.useCases,
      items: [
        { label: t.navSolutions.lmsIntegration.label, desc: t.navSolutions.lmsIntegration.desc, href: "#lms-integration" },
        { label: t.navSolutions.aiIntegration.label,  desc: t.navSolutions.aiIntegration.desc,  href: "#ai-integration" },
      ],
    },
    scale: {
      title: t.navSolutions.scale,
      items: [
        { label: t.navSolutions.enterprise.label, desc: t.navSolutions.enterprise.desc, href: "#enterprise" },
      ],
    },
  };

  const RESOURCES_ITEMS = [
    { label: t.navResources.help.label,      desc: t.navResources.help.desc,      href: "#help" },
    { label: t.navResources.community.label, desc: t.navResources.community.desc, href: "#community" },
    { label: t.navResources.blog.label,      desc: t.navResources.blog.desc,      href: "#blog" },
    { label: t.navResources.apiDocs.label,   desc: t.navResources.apiDocs.desc,   href: "#api-docs" },
  ];

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleEnter(key: DropdownKey) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }

  function toggleMobileExpanded(key: DropdownKey) {
    setMobileExpanded((prev) => (prev === key ? null : key));
  }

  function cycleLocale() {
    const locales: Locale[] = ["en", "ko"];
    const next = locales[(locales.indexOf(locale) + 1) % locales.length];
    setLocale(next);
  }

  /* Shared classes */
  const navBtnCls =
    "flex items-center gap-0.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";

  const dropdownPanelCls =
    "absolute top-full mt-1 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900";

  const dropdownItemCls =
    "flex flex-col rounded-lg px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800";

  const controlBtnCls =
    "flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/95">
      <div
        ref={navRef}
        className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6"
      >
        {/* ── Logo ── */}
        <a
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold"
          style={{ color: colors.primary }}
        >
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="logoBg" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={colors.primaryDark} />
                <stop offset="100%" stopColor={colors.primary} />
              </linearGradient>
              <radialGradient id="highlight" cx="75%" cy="25%" r="40%">
                <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="34" height="34" rx="8" fill="url(#logoBg)" />
            {/* 월계수 잎 하나: 우상단에서 좌하단으로 대각선, 크게 */}
            <path
              d="M30 2Q23 9 13 19Q5 27 3 33Q16 25 25 14Q31 7 30 2Z"
              fill="white" fillOpacity="0.85"
            />
            {/* 잎맥: 중심선 */}
            <path
              d="M30 2Q17 17 3 33"
              stroke="white" strokeWidth="0.9" strokeOpacity="0.4" strokeLinecap="round" fill="none"
            />
            <rect width="34" height="34" rx="8" fill="url(#highlight)" />
          </svg>
          LearnForm
        </a>

        {/* ── Desktop navigation ── */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {/* Features */}
          <div
            className="relative"
            onMouseEnter={() => handleEnter("features")}
            onMouseLeave={handleLeave}
          >
            <button className={navBtnCls} aria-haspopup="true" aria-expanded={activeDropdown === "features"}>
              {t.nav.features}
              <ChevronDown open={activeDropdown === "features"} />
            </button>
            {activeDropdown === "features" && (
              <div className={`${dropdownPanelCls} left-0 w-[340px]`}>
                {FEATURES_ITEMS.map((item) => (
                  <a key={item.href} href={item.href} className={dropdownItemCls}>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Solutions (mega menu) */}
          <div
            className="relative"
            onMouseEnter={() => handleEnter("solutions")}
            onMouseLeave={handleLeave}
          >
            <button className={navBtnCls} aria-haspopup="true" aria-expanded={activeDropdown === "solutions"}>
              {t.nav.solutions}
              <ChevronDown open={activeDropdown === "solutions"} />
            </button>
            {activeDropdown === "solutions" && (
              <div className={`${dropdownPanelCls} left-1/2 w-[600px] -translate-x-1/2 p-6`}>
                <div className="grid grid-cols-3 gap-6">
                  {Object.values(SOLUTIONS_MENU).map((group) => (
                    <div key={group.title}>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {group.title}
                      </h4>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="flex flex-col rounded-lg px-3 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resources */}
          <div
            className="relative"
            onMouseEnter={() => handleEnter("resources")}
            onMouseLeave={handleLeave}
          >
            <button className={navBtnCls} aria-haspopup="true" aria-expanded={activeDropdown === "resources"}>
              {t.nav.resources}
              <ChevronDown open={activeDropdown === "resources"} />
            </button>
            {activeDropdown === "resources" && (
              <div className={`${dropdownPanelCls} right-0 w-[300px]`}>
                {RESOURCES_ITEMS.map((item) => (
                  <a key={item.href} href={item.href} className={dropdownItemCls}>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <a href="#pricing" className={navBtnCls}>
            {t.nav.pricing}
          </a>
        </nav>

        {/* ── Desktop right actions ── */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Language toggle */}
          <button
            type="button"
            onClick={cycleLocale}
            className={`${controlBtnCls} w-auto px-2 text-xs font-semibold tracking-wide`}
            aria-label="Toggle language"
            title={locale === "en" ? "Switch to Korean" : "Switch to English"}
          >
            {locale.toUpperCase()}
          </button>

          {/* Theme mode toggle */}
          <button
            type="button"
            onClick={toggleMode}
            className={controlBtnCls}
            aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={mode === "light" ? "Dark mode" : "Light mode"}
          >
            {mode === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Accent color picker */}
          <div className="flex items-center gap-2" role="group" aria-label="Accent color">
            {accentOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAccent(opt)}
                aria-label={`Set ${opt} accent color`}
                title={opt.charAt(0).toUpperCase() + opt.slice(1)}
                className="h-4 w-4 rounded-full transition-transform hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  backgroundColor: ACCENT_SWATCHES[opt],
                  outline: accent === opt ? `2px solid ${ACCENT_SWATCHES[opt]}` : undefined,
                  outlineOffset: accent === opt ? "2px" : undefined,
                  opacity: accent === opt ? 1 : 0.55,
                }}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" aria-hidden="true" />

          {/* Login */}
          <a
            href="/login"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            style={{ ["--hover-color" as string]: colors.primary }}
          >
            {t.nav.login}
          </a>

          {/* CTA */}
          <a
            href="/try"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.primary }}
          >
            {t.nav.cta}
          </a>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => {
            setMobileOpen((prev) => !prev);
            setMobileExpanded(null);
          }}
        >
          <span
            className={`block h-0.5 w-6 bg-gray-700 transition-transform duration-300 dark:bg-gray-300 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-700 transition-opacity duration-300 dark:bg-gray-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-700 transition-transform duration-300 dark:bg-gray-300 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-64px)] w-full overflow-y-auto border-t border-gray-100 bg-white px-4 pb-6 pt-2 dark:border-gray-700 dark:bg-gray-900 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {/* Features accordion */}
            <button
              onClick={() => toggleMobileExpanded("features")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {t.nav.features}
              <ChevronDown open={mobileExpanded === "features"} />
            </button>
            {mobileExpanded === "features" && (
              <div
                className="mb-2 ml-3 space-y-1 border-l-2 pl-4"
                style={{ borderColor: `${colors.primary}33` }}
              >
                {FEATURES_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                  </a>
                ))}
              </div>
            )}

            {/* Solutions accordion */}
            <button
              onClick={() => toggleMobileExpanded("solutions")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {t.nav.solutions}
              <ChevronDown open={mobileExpanded === "solutions"} />
            </button>
            {mobileExpanded === "solutions" && (
              <div
                className="mb-2 ml-3 space-y-3 border-l-2 pl-4"
                style={{ borderColor: `${colors.primary}33` }}
              >
                {Object.values(SOLUTIONS_MENU).map((group) => (
                  <div key={group.title}>
                    <div className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {group.title}
                    </div>
                    {group.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                        onClick={() => setMobileOpen(false)}
                      >
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Resources accordion */}
            <button
              onClick={() => toggleMobileExpanded("resources")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {t.nav.resources}
              <ChevronDown open={mobileExpanded === "resources"} />
            </button>
            {mobileExpanded === "resources" && (
              <div
                className="mb-2 ml-3 space-y-1 border-l-2 pl-4"
                style={{ borderColor: `${colors.primary}33` }}
              >
                {RESOURCES_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                  </a>
                ))}
              </div>
            )}

            {/* Pricing */}
            <a
              href="#pricing"
              className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.pricing}
            </a>

            <hr className="my-3 border-gray-100 dark:border-gray-700" />

            {/* Mobile controls row */}
            <div className="flex items-center gap-3 px-3 py-2">
              {/* Language toggle */}
              <button
                type="button"
                onClick={cycleLocale}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Toggle language"
              >
                {locale.toUpperCase()}
              </button>

              {/* Theme mode toggle */}
              <button
                type="button"
                onClick={toggleMode}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                {mode === "light" ? <MoonIcon /> : <SunIcon />}
              </button>

              {/* Accent color picker */}
              <div className="flex items-center gap-2.5" role="group" aria-label="Accent color">
                {accentOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAccent(opt)}
                    aria-label={`Set ${opt} accent color`}
                    className="h-5 w-5 rounded-full transition-transform hover:scale-125"
                    style={{
                      backgroundColor: ACCENT_SWATCHES[opt],
                      outline: accent === opt ? `2px solid ${ACCENT_SWATCHES[opt]}` : undefined,
                      outlineOffset: accent === opt ? "2px" : undefined,
                      opacity: accent === opt ? 1 : 0.55,
                    }}
                  />
                ))}
              </div>
            </div>

            <hr className="my-1 border-gray-100 dark:border-gray-700" />

            {/* Login */}
            <a
              href="/login"
              className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.login}
            </a>

            {/* CTA */}
            <a
              href="/try"
              className="mt-1 rounded-lg px-3 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
