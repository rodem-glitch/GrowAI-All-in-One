// 나의 강의 페이지 — 수강중 / 완료 / 찜한과정 탭
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, BookOpen, Clock } from 'lucide-react';
import { courses } from '../../data/courses';
import Badge from '../../components/common/Badge';

/* ── 탭 정의 ── */
type TabKey = 'inProgress' | 'completed' | 'bookmarked';

const tabs: { key: TabKey; label: string; count: number }[] = [
  { key: 'inProgress', label: '수강중', count: 3 },
  { key: 'completed', label: '완료', count: 2 },
  { key: 'bookmarked', label: '찜한과정', count: 1 },
];

/* ── 수강 과정 목 데이터 ── */
interface EnrolledCourse {
  course: (typeof courses)[number];
  progress: number;
  lastAccessed: string;
  status: TabKey;
}

const enrolledCourses: EnrolledCourse[] = [
  // 수강중
  { course: courses[0], progress: 68, lastAccessed: '2026-04-09', status: 'inProgress' },
  { course: courses[4], progress: 42, lastAccessed: '2026-04-08', status: 'inProgress' },
  { course: courses[6], progress: 15, lastAccessed: '2026-04-06', status: 'inProgress' },
  // 완료
  { course: courses[2], progress: 100, lastAccessed: '2026-03-28', status: 'completed' },
  { course: courses[3], progress: 100, lastAccessed: '2026-03-15', status: 'completed' },
  // 찜한과정
  { course: courses[11], progress: 0, lastAccessed: '-', status: 'bookmarked' },
];

/* ── 카드 공통 스타일 ── */
const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-bg)',
  border: '1px solid var(--color-border)',
  borderRadius: 12,
};

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('inProgress');

  const filtered = enrolledCourses.filter((ec) => ec.status === activeTab);

  return (
    <div className="container-page py-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-1.5 text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
        <Link to="/" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
          GrowAI
        </Link>
        <ChevronRight size={14} />
        <Link to="/lms" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
          LMS
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-text)' }}>나의 강의</span>
      </nav>

      {/* 헤더 */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
        나의 강의
      </h1>

      {/* 탭 */}
      <div
        className="flex gap-1 mb-6 p-1 rounded-lg w-fit"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer"
              style={{
                backgroundColor: isActive ? 'var(--color-bg)' : 'transparent',
                color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)',
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {/* 과정 목록 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-4"
        >
          {filtered.length === 0 && (
            <p className="text-center py-16 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              해당 탭에 과정이 없습니다.
            </p>
          )}

          {filtered.map(({ course, progress, lastAccessed }) => (
            <div
              key={course.id}
              className="flex flex-col sm:flex-row gap-4 p-4"
              style={cardStyle}
            >
              {/* 썸네일 */}
              <div
                className="w-full sm:w-48 h-28 sm:h-32 rounded-lg shrink-0 flex items-center justify-center"
                style={{ background: course.thumbnail }}
              >
                <BookOpen size={28} color="#ffffff" />
              </div>

              {/* 정보 */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={progress === 100 ? 'success' : progress === 0 ? 'default' : 'info'}>
                      {progress === 100 ? '완료' : progress === 0 ? '미시작' : '수강중'}
                    </Badge>
                    <Badge>{course.category}</Badge>
                  </div>
                  <h3 className="font-semibold text-base" style={{ color: 'var(--color-text)' }}>
                    {course.title}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    {course.instructor}
                  </p>
                </div>

                <div className="mt-3">
                  {/* 진행률 바 */}
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      진행률
                    </span>
                    <span className="font-medium" style={{ color: progress === 100 ? 'var(--color-success)' : 'var(--color-brand)' }}>
                      {progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: progress === 100 ? 'var(--color-success)' : 'var(--color-brand)',
                      }}
                    />
                  </div>
                  {/* 최근 접속 */}
                  <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <Clock size={12} />
                    <span>최근 학습: {lastAccessed}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
