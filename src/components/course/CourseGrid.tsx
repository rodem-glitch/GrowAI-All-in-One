// 강좌 그리드 레이아웃 컴포넌트
import CourseCard, { type CourseCardProps } from './CourseCard';

interface CourseGridProps {
  courses: CourseCardProps[];
  loading?: boolean;
  skeletonCount?: number;  // 로딩 시 표시할 스켈레톤 수
}

/** 스켈레톤 카드 */
function SkeletonCard() {
  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden animate-pulse"
      style={{ border: '1px solid var(--color-border)' }}
    >
      {/* 썸네일 스켈레톤 */}
      <div className="h-40" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />

      {/* 콘텐츠 스켈레톤 */}
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 w-full rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />
        <div className="h-4 w-3/4 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />
          <div className="h-3 w-24 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />
        </div>
        <div className="h-3 w-28 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />
        <div className="h-5 w-20 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />
        <div
          className="flex gap-3 pt-2"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div className="h-3 w-14 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />
          <div className="h-3 w-14 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />
          <div className="h-3 w-10 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }} />
        </div>
      </div>
    </div>
  );
}

export default function CourseGrid({ courses, loading = false, skeletonCount = 8 }: CourseGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="py-16 text-center" style={{ color: 'var(--color-text-muted)' }}>
        <p className="text-lg font-medium">강좌가 없습니다</p>
        <p className="text-sm mt-1">다른 검색어로 시도해 보세요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </div>
  );
}
