"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, type Locale } from "@/contexts/LanguageContext";
import { useTheme, type AccentColor } from "@/contexts/ThemeContext";
import Link from "next/link";
import {
  BookOpen, LayoutDashboard, Factory, Video, FileVideo,
  MessageCircle, Code2, Globe, HardHat,
  Sparkles, Route, Brain, Captions, FileSearch,
  Bot, Terminal, Gauge, ShieldCheck,
} from "lucide-react";

type DropdownKey = "features" | "solutions" | "resources" | null;

const ACCENT_SWATCHES: Record<AccentColor, string> = {
  teal: "#14a1c8", blue: "#3b82f6", purple: "#8b5cf6",
  orange: "#f97316", green: "#22c55e",
};

/* ── 9개 솔루션 대표 AI 기능 ── */
const FEATURES_ITEMS = [
  { icon: Sparkles, label: "AI 콘텐츠 자동 생성", desc: "멀티 AI로 교수설계부터 콘텐츠까지", href: "/learnform" },
  { icon: Route, label: "AI 학습 경로 설계", desc: "학습자별 맞춤 커리큘럼 자동 생성", href: "/lms" },
  { icon: Brain, label: "AI 품질 예측", desc: "실시간 불량 감지 및 공정 최적화", href: "/map" },
  { icon: Captions, label: "AI 실시간 자막", desc: "다국어 자동 자막 및 번역", href: "/vls" },
  { icon: FileSearch, label: "AI 영상 요약", desc: "핵심 내용 자동 추출 및 챕터 분할", href: "/vas" },
  { icon: Bot, label: "AI 다국어 챗봇", desc: "20개 언어 24/7 고객 자동 응답", href: "/ccb" },
  { icon: Terminal, label: "AI 코드 어시스턴트", desc: "코드 생성 · 리뷰 · 디버깅 자동화", href: "/ccs" },
  { icon: Gauge, label: "적응형 스트리밍", desc: "글로벌 엣지 초저지연 콘텐츠 전송", href: "/cdn" },
  { icon: ShieldCheck, label: "AI 안전 예측", desc: "IoT 센서 기반 사고 예방 시스템", href: "/cms" },
];

/* ── 9개 AI 솔루션 (3 카테고리) ── */
const SOLUTIONS_GROUPS = [
  {
    title: "교육 · Education",
    items: [
      { icon: BookOpen, code: "LearnForm", label: "AI LMS Content Platform", href: "/learnform" },
      { icon: LayoutDashboard, code: "LMS", label: "Learning Management System", href: "/lms" },
      { icon: Video, code: "VLS", label: "Video Lecture System", href: "/vls" },
    ],
  },
  {
    title: "산업 · Industry",
    items: [
      { icon: Factory, code: "MAP", label: "Manufacturing AI Platform", href: "/map" },
      { icon: HardHat, code: "CMS", label: "Construction Management", href: "/cms" },
      { icon: Globe, code: "CDN", label: "Content Delivery Network", href: "/cdn" },
    ],
  },
  {
    title: "AI 서비스",
    items: [
      { icon: FileVideo, code: "VAS", label: "Video Auto Summary", href: "/vas" },
      { icon: MessageCircle, code: "CCB", label: "Customer Care Bot", href: "/ccb" },
      { icon: Code2, code: "CCS", label: "Claude Code Skill", href: "/ccs" },
    ],
  },
];

const RESOURCES_ITEMS = [
  { label: "도움말", desc: "사용 가이드 및 튜토리얼", href: "#help" },
  { label: "커뮤니티", desc: "사용자 포럼 및 토론", href: "#community" },
  { label: "블로그", desc: "최신 소식 및 활용 팁", href: "#blog" },
  { label: "API 문서", desc: "개발자 레퍼런스", href: "#api-docs" },
];

/* ── SVG helpers ── */
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
      className={`ml-1 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
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

export default function Header() {
  const { locale, setLocale, t } = useLanguage();
  const { mode, toggleMode, accent, setAccent, colors, accentOptions } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

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
    setLocale(locales[(locales.indexOf(locale) + 1) % locales.length]);
  }

  const navBtnCls = "flex items-center gap-0.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";
  const controlBtnCls = "flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/95">
      <div ref={navRef} className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">

        {/* ── Logo ── */}
        <Link href="/" className="flex shrink-0 items-center gap-2 text-xl font-bold" style={{ color: colors.primary }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="logoBg" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={colors.primaryDark} />
                <stop offset="100%" stopColor={colors.primary} />
              </linearGradient>
            </defs>
            <rect width="34" height="34" rx="8" fill="url(#logoBg)" />
            <path d="M30 2Q23 9 13 19Q5 27 3 33Q16 25 25 14Q31 7 30 2Z" fill="white" fillOpacity="0.85" />
            <path d="M30 2Q17 17 3 33" stroke="white" strokeWidth="0.9" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
          </svg>
          GrowAI
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">

          {/* 기능 — 9개 AI 대표 기능 메가메뉴 */}
          <div className="relative" onMouseEnter={() => handleEnter("features")} onMouseLeave={handleLeave}>
            <button className={navBtnCls} aria-haspopup="true" aria-expanded={activeDropdown === "features"}>
              {t.nav.features}
              <ChevronDown open={activeDropdown === "features"} />
            </button>
            {activeDropdown === "features" && (
              <div className="absolute top-full left-1/2 mt-1 -translate-x-1/2 w-[720px] rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  9개 AI 핵심 기능
                </h4>
                <div className="grid grid-cols-3 gap-1">
                  {FEATURES_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${colors.primary}15` }}
                        >
                          <Icon className="h-4 w-4" style={{ color: colors.primary }} strokeWidth={1.8} />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</span>
                          <span className="block text-xs text-gray-500 dark:text-gray-400">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 솔루션 — 9개 AI 솔루션 메가메뉴 (3열) */}
          <div className="relative" onMouseEnter={() => handleEnter("solutions")} onMouseLeave={handleLeave}>
            <button className={navBtnCls} aria-haspopup="true" aria-expanded={activeDropdown === "solutions"}>
              {t.nav.solutions}
              <ChevronDown open={activeDropdown === "solutions"} />
            </button>
            {activeDropdown === "solutions" && (
              <div className="absolute top-full left-1/2 mt-1 -translate-x-1/2 w-[700px] rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <div className="grid grid-cols-3 gap-6">
                  {SOLUTIONS_GROUPS.map((group) => (
                    <div key={group.title}>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {group.title}
                      </h4>
                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                                style={{ backgroundColor: `${colors.primary}15` }}
                              >
                                <Icon className="h-4 w-4" style={{ color: colors.primary }} strokeWidth={1.8} />
                              </div>
                              <div>
                                <span className="text-xs font-bold tracking-wider uppercase" style={{ color: colors.primary }}>
                                  {item.code}
                                </span>
                                <span className="block text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 리소스 */}
          <div className="relative" onMouseEnter={() => handleEnter("resources")} onMouseLeave={handleLeave}>
            <button className={navBtnCls} aria-haspopup="true" aria-expanded={activeDropdown === "resources"}>
              {t.nav.resources}
              <ChevronDown open={activeDropdown === "resources"} />
            </button>
            {activeDropdown === "resources" && (
              <div className="absolute top-full right-0 mt-1 w-[280px] rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                {RESOURCES_ITEMS.map((item) => (
                  <a key={item.href} href={item.href} className="flex flex-col rounded-lg px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* ── Desktop Right Actions ── */}
        <div className="hidden items-center gap-2 lg:flex">
          <button type="button" onClick={cycleLocale} className={`${controlBtnCls} w-auto px-2 text-xs font-semibold tracking-wide`} aria-label="Toggle language">
            {locale.toUpperCase()}
          </button>
          <button type="button" onClick={toggleMode} className={controlBtnCls} aria-label="Toggle theme">
            {mode === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <div className="flex items-center gap-2" role="group" aria-label="Accent color">
            {accentOptions.map((opt) => (
              <button key={opt} type="button" onClick={() => setAccent(opt)} aria-label={`Set ${opt}`}
                className="h-4 w-4 rounded-full transition-transform hover:scale-125"
                style={{ backgroundColor: ACCENT_SWATCHES[opt], outline: accent === opt ? `2px solid ${ACCENT_SWATCHES[opt]}` : undefined, outlineOffset: accent === opt ? "2px" : undefined, opacity: accent === opt ? 1 : 0.55 }}
              />
            ))}
          </div>
          <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
          <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">{t.nav.login}</a>
          <a href="/try" className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: colors.primary }}>{t.nav.cta}</a>
        </div>

        {/* ── Hamburger ── */}
        <button type="button" className="flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden" aria-label={mobileOpen ? "Close" : "Menu"} aria-expanded={mobileOpen}
          onClick={() => { setMobileOpen(!mobileOpen); setMobileExpanded(null); }}>
          <span className={`block h-0.5 w-6 bg-gray-700 dark:bg-gray-300 transition-transform duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-gray-700 dark:bg-gray-300 transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-gray-700 dark:bg-gray-300 transition-transform duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-64px)] w-full overflow-y-auto border-t border-gray-100 bg-white px-4 pb-6 pt-2 dark:border-gray-700 dark:bg-gray-900 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">

            {/* 기능 */}
            <button onClick={() => toggleMobileExpanded("features")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
              {t.nav.features}<ChevronDown open={mobileExpanded === "features"} />
            </button>
            {mobileExpanded === "features" && (
              <div className="mb-2 ml-3 space-y-1 border-l-2 pl-4" style={{ borderColor: `${colors.primary}33` }}>
                {FEATURES_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      onClick={() => setMobileOpen(false)}>
                      <Icon className="h-4 w-4 shrink-0" style={{ color: colors.primary }} strokeWidth={1.8} />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* 솔루션 */}
            <button onClick={() => toggleMobileExpanded("solutions")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
              {t.nav.solutions}<ChevronDown open={mobileExpanded === "solutions"} />
            </button>
            {mobileExpanded === "solutions" && (
              <div className="mb-2 ml-3 space-y-3 border-l-2 pl-4" style={{ borderColor: `${colors.primary}33` }}>
                {SOLUTIONS_GROUPS.map((group) => (
                  <div key={group.title}>
                    <div className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{group.title}</div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          onClick={() => setMobileOpen(false)}>
                          <Icon className="h-4 w-4 shrink-0" style={{ color: colors.primary }} strokeWidth={1.8} />
                          <div>
                            <div className="font-medium">{item.code}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {/* 리소스 */}
            <button onClick={() => toggleMobileExpanded("resources")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
              {t.nav.resources}<ChevronDown open={mobileExpanded === "resources"} />
            </button>
            {mobileExpanded === "resources" && (
              <div className="mb-2 ml-3 space-y-1 border-l-2 pl-4" style={{ borderColor: `${colors.primary}33` }}>
                {RESOURCES_ITEMS.map((item) => (
                  <a key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => setMobileOpen(false)}>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                  </a>
                ))}
              </div>
            )}

            <hr className="my-3 border-gray-100 dark:border-gray-700" />

            <div className="flex items-center gap-3 px-3 py-2">
              <button type="button" onClick={cycleLocale} className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800">
                {locale.toUpperCase()}
              </button>
              <button type="button" onClick={toggleMode} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                {mode === "light" ? <MoonIcon /> : <SunIcon />}
              </button>
              <div className="flex items-center gap-2.5">
                {accentOptions.map((opt) => (
                  <button key={opt} type="button" onClick={() => setAccent(opt)} aria-label={`Set ${opt}`}
                    className="h-5 w-5 rounded-full transition-transform hover:scale-125"
                    style={{ backgroundColor: ACCENT_SWATCHES[opt], outline: accent === opt ? `2px solid ${ACCENT_SWATCHES[opt]}` : undefined, outlineOffset: accent === opt ? "2px" : undefined, opacity: accent === opt ? 1 : 0.55 }}
                  />
                ))}
              </div>
            </div>

            <hr className="my-1 border-gray-100 dark:border-gray-700" />
            <a href="/login" className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800" onClick={() => setMobileOpen(false)}>{t.nav.login}</a>
            <a href="/try" className="mt-1 rounded-lg px-3 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: colors.primary }} onClick={() => setMobileOpen(false)}>{t.nav.cta}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
