// LMS 대시보드 페이지 — 스마트제조혁신 LMS
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  BookOpen,
  Award,
  Headphones,
  Bot,
  ChevronRight,
  Clock,
  Users,
  GraduationCap,
  CalendarDays,
} from 'lucide-react';
import { currentUser } from '../../data/users';
import { courses } from '../../data/courses';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';

/* ── 통계 데이터 ── */
const stats = [
  { label: '수강중 과정', value: '3', icon: BookOpen, color: 'var(--color-brand)' },
  { label: '완료 과정', value: '24', icon: GraduationCap, color: 'var(--color-success)' },
  { label: '취득 자격증', value: '2', icon: Award, color: 'var(--color-warning)' },
  { label: '총 학습시간', value: '186h', icon: Clock, color: '#7c3aed' },
];

/* ── 이어서 학습 데이터 ── */
const continueLearning = [
  { course: courses[0], progress: 68, lastAccessed: '오늘' },
  { course: courses[4], progress: 42, lastAccessed: '어제' },
  { course: courses[6], progress: 15, lastAccessed: '3일 전' },
];

/* ── 빠른 접근 항목 ── */
const quickActions = [
  { label: '나의 강의', icon: BookOpen, href: '/lms/courses', color: 'var(--color-brand)' },
  { label: '자격증', icon: Award, href: '/lms/certificates', color: 'var(--color-warning)' },
  { label: '학습지원센터', icon: Headphones, href: '#', color: 'var(--color-success)' },
  { label: 'AI 튜터', icon: Bot, href: '#', color: '#7c3aed' },
];

/* ── 다가오는 일정 ── */
const upcomingSchedule = [
  {
    id: 1,
    title: 'React 심화 라이브 세션',
    date: '2026-04-11',
    time: '14:00 - 15:30',
    type: '라이브 강의',
    instructor: '김민수',
  },
  {
    id: 2,
    title: 'AI/ML 과제 제출 마감',
    date: '2026-04-13',
    time: '23:59',
    type: '과제',
    instructor: '최영진',
  },
];

/* ── 카드 공통 스타일 ── */
const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-bg)',
  border: '1px solid var(--color-border)',
  borderRadius: 12,
};

/* ── 애니메이션 프리셋 ── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <div className="container-page py-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-1.5 text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
        <Link to="/" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
          GrowAI
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-text)' }}>LMS</span>
      </nav>

      {/* 환영 메시지 */}
      <motion.section {...fadeUp} transition={{ duration: 0.4 }} className="mb-8">
        <div className="flex items-center gap-4">
          <Avatar name={currentUser.name} size="xl" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              안녕하세요, {currentUser.name}님
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              스마트제조혁신 LMS에 오신 것을 환영합니다. 오늘도 함께 성장해요.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 통계 카드 4개 */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="p-5" style={cardStyle}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}14`, color: stat.color }}
              >
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
              {stat.value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </motion.section>

      {/* 이어서 학습하기 */}
      <motion.section {...fadeUp} transition={{ duration: 0.4, delay: 0.2 }} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
            이어서 학습하기
          </h2>
          <Link
            to="/lms/courses"
            className="text-sm font-medium flex items-center gap-1"
            style={{ color: 'var(--color-brand)' }}
          >
            전체 보기 <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {continueLearning.map(({ course, progress, lastAccessed }) => (
            <div key={course.id} className="p-4 flex flex-col gap-3" style={cardStyle}>
              {/* 썸네일 */}
              <div
                className="h-32 rounded-lg flex items-center justify-center"
                style={{ background: course.thumbnail }}
              >
                <BookOpen size={32} color="#ffffff" />
              </div>
              {/* 정보 */}
              <div className="flex-1">
                <p className="font-semibold text-sm line-clamp-2" style={{ color: 'var(--color-text)' }}>
                  {course.title}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {course.instructor}
                </p>
              </div>
              {/* 진행률 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: 'var(--color-text-secondary)' }}>{lastAccessed}</span>
                  <span className="font-medium" style={{ color: 'var(--color-brand)' }}>{progress}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${progress}%`, backgroundColor: 'var(--color-brand)' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 하단 2 컬럼 : 빠른 접근 + 다가오는 일정 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 빠른 접근 */}
        <motion.section {...fadeUp} transition={{ duration: 0.4, delay: 0.3 }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
            빠른 접근
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="p-4 flex flex-col items-center gap-2 rounded-xl transition-colors hover:shadow-sm"
                style={{
                  ...cardStyle,
                  textDecoration: 'none',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${action.color}14`, color: action.color }}
                >
                  <action.icon size={22} />
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* 다가오는 일정 */}
        <motion.section {...fadeUp} transition={{ duration: 0.4, delay: 0.35 }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
            다가오는 일정
          </h2>
          <div className="flex flex-col gap-3">
            {upcomingSchedule.map((item) => (
              <div key={item.id} className="p-4 flex items-start gap-4" style={cardStyle}>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: item.type === '라이브 강의' ? '#eff6ff' : '#fef3c7',
                    color: item.type === '라이브 강의' ? 'var(--color-brand)' : 'var(--color-warning)',
                  }}
                >
                  {item.type === '라이브 강의' ? <Users size={18} /> : <CalendarDays size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>
                    {item.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.instructor}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={item.type === '라이브 강의' ? 'info' : 'warning'}>{item.type}</Badge>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {item.date} {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
