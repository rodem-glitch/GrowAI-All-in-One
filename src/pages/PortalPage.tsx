import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const services = [
  {
    code: 'LearnForm',
    name: 'AI E-Learning Content Platform',
    desc: 'CREATOR x FKDS 기반 AI 이러닝 콘텐츠 자동 생성',
    path: '/learnform',
  },
  {
    code: 'LMS',
    name: 'Learning Management System',
    desc: '체계적인 학습 관리와 진도 추적 시스템',
    path: '/lms',
  },
  {
    code: 'MAP',
    name: 'Manufacturing AI Platform',
    desc: '생산 공정의 지능화와 품질 최적화',
    path: '/map',
  },
  {
    code: 'VLS',
    name: 'Video Lecture System',
    desc: '시공간 제약 없는 실시간 화상 교육',
    path: '/vls',
  },
  {
    code: 'VAS',
    name: 'Video Auto Summary',
    desc: 'AI 기반 영상 자동 요약으로 학습 효율 극대화',
    path: '/vas',
  },
  {
    code: 'CCB',
    name: 'Customer Care Bot',
    desc: '다국어 AI 챗봇으로 글로벌 고객 소통 혁신',
    path: '/ccb',
  },
  {
    code: 'CCS',
    name: 'Claude Code Skill',
    desc: 'AI 코드 어시스턴트로 개발 생산성의 도약',
    path: '/ccs',
  },
  {
    code: 'CDN',
    name: 'Content Delivery Network',
    desc: '글로벌 엣지 캐싱으로 끊김 없는 미디어 경험',
    path: '/cdn',
  },
  {
    code: 'CMS',
    name: 'Construction Management System',
    desc: 'IoT + AI 기반 건설 현장 관리의 스마트화',
    path: '/cms',
  },
];

export default function PortalPage() {
  const { colors, mode, toggleMode } = useTheme();

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f1112] transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a1d1e]/80 backdrop-blur-md border-b border-[#e5e7eb] dark:border-gray-800">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <a href="/" className="flex shrink-0 items-center gap-2 text-xl font-bold" style={{ color: colors.primary }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <defs>
                <linearGradient id="logoBg" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={colors.primaryDark} />
                  <stop offset="100%" stopColor={colors.primary} />
                </linearGradient>
                <radialGradient id="highlight" cx="75%" cy="25%" r="40%">
                  <stop offset="0%" stopColor="white" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="white" stopOpacity={0} />
                </radialGradient>
              </defs>
              <rect width="34" height="34" rx="8" fill="url(#logoBg)" />
              <path d="M30 2Q23 9 13 19Q5 27 3 33Q16 25 25 14Q31 7 30 2Z" fill="white" fillOpacity={0.85} />
              <path d="M30 2Q17 17 3 33" stroke="white" strokeWidth="0.9" strokeOpacity={0.4} strokeLinecap="round" fill="none" />
              <rect width="34" height="34" rx="8" fill="url(#highlight)" />
            </svg>
            GrowAI
          </a>

          <button
            onClick={toggleMode}
            className="p-2 rounded-lg text-[#555c5d] dark:text-gray-400 hover:bg-[#f0f1f2] dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {mode === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#242727] dark:text-white">
          GrowAI Platform
        </h1>
        <p className="mt-3 text-lg text-[#555c5d] dark:text-gray-400">
          All-in-One AI Solutions
        </p>
      </section>

      {/* Service Cards Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <Link
              key={svc.code}
              to={svc.path}
              className="group block rounded-2xl border border-[#e5e7eb] dark:border-gray-800 bg-white dark:bg-[#1a1d1e] p-6 transition-shadow hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/30"
            >
              {/* TLA Badge */}
              <span
                className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-lg text-white"
                style={{ backgroundColor: colors.primary }}
              >
                {svc.code}
              </span>

              {/* Name */}
              <h3 className="mt-4 text-lg font-semibold text-[#242727] dark:text-white">
                {svc.name}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-[#555c5d] dark:text-gray-400 leading-relaxed">
                {svc.desc}
              </p>

              {/* Enter link */}
              <span
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:underline"
                style={{ color: colors.primary }}
              >
                Enter
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] dark:border-gray-800 py-8 text-center text-sm text-[#555c5d] dark:text-gray-500">
        &copy; {new Date().getFullYear()} GrowAI by Nucle Inc. All rights reserved.
      </footer>
    </div>
  );
}
