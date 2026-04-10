// 프로필 드롭다운 메뉴 (Coursera/LinkedIn 스타일)
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  Bell,
  User,
  BookOpen,
  Award,
  Trophy,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';

// 임시 mock 사용자 데이터
const currentUser = {
  name: '김민수',
  email: 'minsu.kim@growai.dev',
  initials: '김민',
  role: '수강생',
  notificationCount: 3,
};

interface ProfileMenuProps {
  className?: string;
}

export default function ProfileMenu({ className = '' }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = true; // mock: 항상 로그인 상태

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // 비로그인 상태 (현재는 표시되지 않음)
  if (!isLoggedIn) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{ color: 'var(--color-brand)' }}
        >
          <LogIn className="w-4 h-4 inline-block mr-1" />
          로그인
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--color-brand)' }}
        >
          <UserPlus className="w-4 h-4 inline-block mr-1" />
          회원가입
        </Link>
      </div>
    );
  }

  const menuItems = [
    { label: '내 프로필', icon: User, to: '/profile' },
    { label: '나의 강의실', icon: BookOpen, to: '/lms' },
    { label: '수료증', icon: Award, to: '/lms/certificates' },
    { label: '리더보드', icon: Trophy, to: '/leaderboard' },
    { label: '설정', icon: Settings, to: '/settings' },
  ];

  return (
    <div ref={menuRef} className={`flex items-center gap-3 ${className}`}>
      {/* 알림 벨 */}
      <button
        className="relative p-2 rounded-lg transition-colors hover:opacity-80"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="알림"
      >
        <Bell className="w-5 h-5" />
        {currentUser.notificationCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white rounded-full px-1"
            style={{ backgroundColor: 'var(--color-error)' }}
          >
            {currentUser.notificationCount}
          </span>
        )}
      </button>

      {/* 프로필 버튼 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1 rounded-lg transition-colors hover:opacity-80"
        aria-label="프로필 메뉴"
        aria-expanded={open}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
          style={{ backgroundColor: 'var(--color-brand)' }}
        >
          {currentUser.initials.charAt(0)}
        </div>
        <span
          className="text-sm font-medium hidden md:block max-w-[100px] truncate"
          style={{ color: 'var(--color-text)' }}
        >
          {currentUser.name}
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-2 w-60 rounded-xl shadow-lg border z-50 overflow-hidden"
            style={{
              backgroundColor: 'var(--color-bg)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* 사용자 정보 헤더 */}
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
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
              </div>
            </div>

            {/* 메뉴 항목 */}
            <div className="py-1">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:opacity-80"
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
                  <item.icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: 'var(--color-text-secondary)' }}
                  />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* 로그아웃 */}
            <div
              className="border-t py-1"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors hover:opacity-80"
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
                <LogOut className="w-4 h-4 shrink-0" />
                로그아웃
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
