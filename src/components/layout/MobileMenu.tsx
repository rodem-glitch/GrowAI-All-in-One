// 모바일 전체 화면 슬라이드 메뉴
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  X,
  Search,
  Compass,
  Users,
  Route,
  FolderKanban,
  Trophy,
  BookOpen,
  Award,
  LogOut,
} from 'lucide-react';

// 임시 mock 사용자 데이터
const currentUser = {
  name: '김민수',
  email: 'minsu.kim@growai.dev',
  initials: '김민',
  role: '수강생',
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: '탐색', icon: Compass, to: '/explore' },
  { label: '커뮤니티', icon: Users, to: '/community' },
  { label: '학습경로', icon: Route, to: '/paths' },
  { label: '프로젝트', icon: FolderKanban, to: '/projects' },
  { label: '리더보드', icon: Trophy, to: '/leaderboard' },
];

const lmsLinks = [
  { label: '나의 강의실', icon: BookOpen, to: '/lms' },
  { label: '수료증', icon: Award, to: '/lms/certificates' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* 슬라이드 패널 */}
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] flex flex-col shadow-2xl overflow-y-auto"
            style={{ backgroundColor: 'var(--color-bg)' }}
            aria-label="모바일 메뉴"
          >
            {/* 닫기 버튼 + 사용자 프로필 카드 */}
            <div
              className="px-5 pt-4 pb-4 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <button
                onClick={onClose}
                className="mb-4 p-1.5 rounded-lg transition-colors hover:opacity-80"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="메뉴 닫기"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 사용자 프로필 카드 */}
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-3"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
                  style={{ backgroundColor: 'var(--color-brand)' }}
                >
                  {currentUser.initials.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {currentUser.name}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {currentUser.email}
                  </p>
                </div>
              </Link>
            </div>

            {/* 검색바 */}
            <div className="px-5 py-3">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <Search
                  className="w-4 h-4 shrink-0"
                  style={{ color: 'var(--color-text-muted)' }}
                />
                <input
                  type="text"
                  placeholder="강의 검색..."
                  className="bg-transparent text-sm w-full outline-none"
                  style={{ color: 'var(--color-text)' }}
                />
              </div>
            </div>

            {/* 주요 내비게이션 */}
            <div
              className="px-3 py-2 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                  style={{
                    color: 'var(--color-text)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      'var(--color-bg-secondary)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <link.icon
                    className="w-5 h-5 shrink-0"
                    style={{ color: 'var(--color-text-secondary)' }}
                  />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* LMS 링크 */}
            <div
              className="px-3 py-2 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {lmsLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                  style={{
                    color: 'var(--color-text)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      'var(--color-bg-secondary)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <link.icon
                    className="w-5 h-5 shrink-0"
                    style={{ color: 'var(--color-text-secondary)' }}
                  />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* 로그아웃 */}
            <div className="px-3 py-2 mt-auto">
              <button
                onClick={onClose}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{
                  color: 'var(--color-error)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    'var(--color-bg-secondary)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
              >
                <LogOut className="w-5 h-5 shrink-0" />
                로그아웃
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
