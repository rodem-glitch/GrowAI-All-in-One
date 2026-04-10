// TopNav.tsx — LearnForm 스타일 네비게이션
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronRight, User, Settings, LogOut, BookOpen,
  Factory, GraduationCap, Video, FileText, MessageSquare,
  Code2, Globe, HardHat,
} from 'lucide-react';
import Logo from './Logo';

// ─── 서비스 브랜드 ──────────────────────────────────────────────────────────

interface SubMenu { label: string; to: string; desc: string; }
interface ServiceBrand {
  tla: string; fullName: string; korName: string; value: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string; sub: SubMenu[];
}

const services: ServiceBrand[] = [
  { tla: 'MAP', fullName: 'Manufacturing AI Platform', korName: '제조', value: '생산 공정의 지능화', icon: Factory, color: '#3b82f6',
    sub: [
      { label: '스마트공장 진단', to: '/map/diagnosis', desc: '공장 수준 평가 및 로드맵' },
      { label: 'AI 공정 최적화', to: '/map/optimization', desc: '실시간 공정 데이터 분석' },
      { label: '예지보전 시스템', to: '/map/predictive', desc: 'AI 기반 설비 고장 예측' },
      { label: '품질관리 자동화', to: '/map/quality', desc: '비전 검사 및 SPC 자동화' },
    ],
  },
  { tla: 'LMS', fullName: 'Learning Management System', korName: '교육', value: '교육 운영의 디지털화', icon: GraduationCap, color: '#8b5cf6',
    sub: [
      { label: '교육과정 탐색', to: '/explore', desc: '전체 교육과정 카탈로그' },
      { label: '나의 강의실', to: '/lms', desc: '수강 현황 및 진도 관리' },
      { label: '학습경로', to: '/paths', desc: 'AI 맞춤 커리큘럼' },
      { label: '자격증 관리', to: '/lms/certificates', desc: '취득 및 신청 관리' },
    ],
  },
  { tla: 'VLS', fullName: 'Video Lecture System', korName: '영상', value: '시공간 제약 없는 교육', icon: Video, color: '#ec4899',
    sub: [
      { label: '라이브 강의', to: '/vls/live', desc: '실시간 화상 강의' },
      { label: 'VOD 라이브러리', to: '/vls/vod', desc: '녹화 강의 무제한 시청' },
      { label: '실습 영상', to: '/vls/practice', desc: '현장 실습 촬영 콘텐츠' },
      { label: '스트리밍 관리', to: '/vls/manage', desc: '강사용 방송 도구' },
    ],
  },
  { tla: 'VAS', fullName: 'Video Auto Summary', korName: '요약', value: '학습 효율의 극대화', icon: FileText, color: '#f59e0b',
    sub: [
      { label: 'AI 영상 요약', to: '/vas/summary', desc: '강의 핵심 자동 추출' },
      { label: '스마트 노트', to: '/vas/notes', desc: 'AI 생성 학습 노트' },
      { label: '퀴즈 자동 생성', to: '/vas/quiz', desc: '영상 기반 문제 출제' },
      { label: '자막 번역', to: '/vas/translate', desc: '다국어 자동 자막' },
    ],
  },
  { tla: 'CCB', fullName: 'Customer Care Bot', korName: '상담', value: '글로벌 고객 소통 혁신', icon: MessageSquare, color: '#10b981',
    sub: [
      { label: 'AI 학습 상담', to: '/ai-tutor', desc: '24/7 AI 튜터' },
      { label: '학습지원센터', to: '/ccb/support', desc: '1:1 전문 상담' },
      { label: '커뮤니티', to: '/community', desc: '학습자 커뮤니티' },
      { label: 'FAQ', to: '/ccb/faq', desc: '자주 묻는 질문' },
    ],
  },
  { tla: 'CCS', fullName: 'Claude Code Skill', korName: '개발', value: '개발 생산성의 도약', icon: Code2, color: '#6366f1',
    sub: [
      { label: '코드 스킬 학습', to: '/ccs/learn', desc: 'AI 페어 프로그래밍' },
      { label: '프로젝트 갤러리', to: '/projects', desc: '학습 프로젝트 공유' },
      { label: '코드 리뷰', to: '/ccs/review', desc: 'AI 코드 리뷰' },
      { label: '개발 도구', to: '/ccs/tools', desc: 'GStack 개발 도구' },
    ],
  },
  { tla: 'CDN', fullName: 'Content Delivery Network', korName: '전송', value: '끊김 없는 미디어 경험', icon: Globe, color: '#06b6d4',
    sub: [
      { label: '글로벌 전송', to: '/cdn/global', desc: '전 세계 엣지 배포' },
      { label: '미디어 최적화', to: '/cdn/media', desc: '적응형 스트리밍' },
      { label: '성능 분석', to: '/cdn/analytics', desc: '전송 품질 모니터링' },
      { label: '보안 설정', to: '/cdn/security', desc: 'DRM 및 접근 제어' },
    ],
  },
  { tla: 'CMS', fullName: 'Construction Management System', korName: '건설', value: '현장 관리의 스마트화', icon: HardHat, color: '#f97316',
    sub: [
      { label: '현장 관리', to: '/cms/site', desc: '공정 및 인력 관리' },
      { label: '안전 교육', to: '/cms/safety', desc: '법정 의무 교육' },
      { label: 'BIM 연동', to: '/cms/bim', desc: '3D 모델 기반 관리' },
      { label: '일보 관리', to: '/cms/report', desc: '현장 보고서 자동화' },
    ],
  },
];

// ─── 메가메뉴 드롭다운 ─────────────────────────────────────────────────────

function MegaMenu({ service, onClose }: { service: ServiceBrand; onClose: () => void }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="absolute left-0 top-full mt-1 w-[380px] rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 z-50 overflow-hidden"
    >
      <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800" style={{ background: `${service.color}06` }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${service.color}12` }}>
            <Icon className="h-5 w-5" style={{ color: service.color }} />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-bold tracking-widest" style={{ color: service.color }}>{service.tla}</span>
              <span className="text-[10px] text-gray-400">{service.fullName}</span>
            </div>
            <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">{service.value}</p>
          </div>
        </div>
      </div>
      <div className="py-1">
        {service.sub.map((item) => (
          <Link key={item.to} to={item.to} onClick={onClose}
            className="group flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 group-hover:text-[#14a1c8] dark:text-gray-300">{item.label}</p>
              <p className="text-[11px] text-gray-400">{item.desc}</p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// ─── 프로필 드롭다운 ────────────────────────────────────────────────────────

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
        <User className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900 z-50"
          >
            <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">GrowAI User</p>
              <p className="text-[11px] text-gray-400">user@growai.kr</p>
            </div>
            <div className="py-1">
              {[
                { icon: BookOpen, label: '내 학습', to: '/lms' },
                { icon: User, label: '프로필', to: '/profile' },
                { icon: Settings, label: '설정', to: '/settings' },
              ].map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-100 py-1 dark:border-gray-800">
              <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400">
                <LogOut className="h-4 w-4" /> 로그아웃
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 모바일 메뉴 ────────────────────────────────────────────────────────────

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col overflow-hidden"
    >
      {/* 모바일 헤더 */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <Logo />
        <button onClick={onClose} className="flex flex-col items-center justify-center gap-1.5 p-2">
          <span className="block h-0.5 w-6 bg-gray-700 dark:bg-gray-300 translate-y-[4px] rotate-45 transition-transform" />
          <span className="block h-0.5 w-6 bg-gray-700 dark:bg-gray-300 opacity-0" />
          <span className="block h-0.5 w-6 bg-gray-700 dark:bg-gray-300 -translate-y-[4px] -rotate-45 transition-transform" />
        </button>
      </div>

      {/* 모바일 메뉴 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {services.map((svc) => {
          const isOpen = expanded === svc.tla;
          const Icon = svc.icon;
          return (
            <div key={svc.tla} className="border-b border-gray-100 dark:border-gray-800">
              <button onClick={() => setExpanded(isOpen ? null : svc.tla)}
                className="flex w-full items-center gap-3 py-4 text-left">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${svc.color}10` }}>
                  <Icon className="h-4 w-4" style={{ color: svc.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] font-bold tracking-widest" style={{ color: svc.color }}>{svc.tla}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{svc.korName}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">{svc.value}</p>
                </div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="pb-3 pl-12">
                      {svc.sub.map((item) => (
                        <Link key={item.to} to={item.to} onClick={onClose}
                          className={`block py-2 text-sm transition-colors ${location.pathname === item.to ? 'font-medium' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}`}
                          style={location.pathname === item.to ? { color: '#14a1c8' } : undefined}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 모바일 하단 */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <Link to="/login" onClick={onClose} className="block w-full rounded-lg py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#14a1c8' }}>
          시작하기
        </Link>
      </div>
    </motion.div>
  );
}

// ═══ 메인 TopNav ═══════════════════════════════════════════════════════════

export default function TopNav() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleLeave = () => { timeoutRef.current = setTimeout(() => setActiveService(null), 200); };
  const handleEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const activeData = services.find((s) => s.tla === activeService);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">

        {/* 로고 */}
        <Logo />

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={handleLeave} onMouseEnter={handleEnter}>
          {services.map((svc) => (
            <div key={svc.tla} className="relative">
              <button
                onMouseEnter={() => setActiveService(svc.tla)}
                onClick={() => setActiveService(activeService === svc.tla ? null : svc.tla)}
                className={`flex items-center gap-0.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${activeService === svc.tla
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
              >
                {svc.korName}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`ml-1 shrink-0 transition-transform duration-200 ${activeService === svc.tla ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
          <AnimatePresence>
            {activeData && <MegaMenu service={activeData} onClose={() => setActiveService(null)} />}
          </AnimatePresence>
        </nav>

        {/* 우측 액션 — LearnForm 스타일 */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* 언어 전환 */}
          <button type="button"
            className="flex h-8 w-auto items-center justify-center rounded-lg px-2 text-xs font-semibold tracking-wide text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            title="Switch to Korean">
            EN
          </button>

          {/* 다크모드 토글 */}
          <button type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            title="Dark mode">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>

          {/* 액센트 컬러 선택 */}
          <div className="flex items-center gap-2" role="group">
            {[
              { color: '#14a1c8', label: 'Teal', active: true },
              { color: '#3b82f6', label: 'Blue', active: false },
              { color: '#8b5cf6', label: 'Purple', active: false },
              { color: '#f97316', label: 'Orange', active: false },
              { color: '#22c55e', label: 'Green', active: false },
            ].map((c) => (
              <button key={c.label} type="button" title={c.label}
                className="h-4 w-4 rounded-full transition-transform hover:scale-125"
                style={{
                  backgroundColor: c.color,
                  opacity: c.active ? 1 : 0.55,
                  ...(c.active ? { outline: `2px solid ${c.color}`, outlineOffset: '2px' } : {}),
                }}
              />
            ))}
          </div>

          <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />

          {/* Sign In */}
          <Link to="/login"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            style={{ '--hover-color': '#14a1c8' } as React.CSSProperties}>
            Sign In
          </Link>

          {/* Start Free */}
          <Link to="/try"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#14a1c8' }}>
            Start Free
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button onClick={() => setMobileOpen(true)} className="flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden">
          <span className="block h-0.5 w-6 bg-gray-700 dark:bg-gray-300" />
          <span className="block h-0.5 w-6 bg-gray-700 dark:bg-gray-300" />
          <span className="block h-0.5 w-6 bg-gray-700 dark:bg-gray-300" />
        </button>
      </div>

      {/* 모바일 풀스크린 메뉴 */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
