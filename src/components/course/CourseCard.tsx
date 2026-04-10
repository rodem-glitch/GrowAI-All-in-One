// 강좌 카드 컴포넌트 (Udemy/Coursera 하이브리드)
import { Link } from 'react-router-dom';
import { Clock, Users, BarChart } from 'lucide-react';
import RatingStars from './RatingStars';

/** 아이콘 맵 — 카테고리에 따라 썸네일 아이콘 결정 */
const CATEGORY_ICONS: Record<string, string> = {
  ai: 'AI',
  data: 'DA',
  dev: 'DEV',
  design: 'UX',
  business: 'BIZ',
  default: 'EDU',
};

/** 카테고리별 그라디언트 */
const CATEGORY_GRADIENTS: Record<string, string> = {
  ai: 'from-violet-500 to-purple-600',
  data: 'from-cyan-500 to-blue-600',
  dev: 'from-emerald-500 to-teal-600',
  design: 'from-pink-500 to-rose-600',
  business: 'from-amber-500 to-orange-600',
  default: 'from-slate-500 to-slate-700',
};

export interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  instructorInitial?: string;  // 아바타 이니셜
  category?: string;
  badge?: string;              // "베스트셀러", "신규", "HOT" 등
  rating: number;
  ratingCount: number;
  price: number;
  originalPrice?: number;      // 할인 전 가격
  duration: string;            // "12시간", "8주" 등
  students: number;
  level: string;               // "초급", "중급", "고급"
}

export default function CourseCard({
  id,
  title,
  instructor,
  instructorInitial,
  category = 'default',
  badge,
  rating,
  ratingCount,
  price,
  originalPrice,
  duration,
  students,
  level,
}: CourseCardProps) {
  const gradient = CATEGORY_GRADIENTS[category] ?? CATEGORY_GRADIENTS.default;
  const iconText = CATEGORY_ICONS[category] ?? CATEGORY_ICONS.default;

  return (
    <Link
      to={`/course/${id}`}
      className="group flex flex-col rounded-xl overflow-hidden transition-shadow hover:shadow-lg"
      style={{
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* 썸네일 영역 */}
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-white/80 text-3xl font-extrabold tracking-wider select-none">
          {iconText}
        </span>

        {/* 배지 오버레이 */}
        {badge && (
          <span
            className="absolute top-3 right-3 px-2 py-0.5 rounded text-[11px] font-semibold text-white"
            style={{ backgroundColor: 'var(--color-brand)' }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* 제목 */}
        <h3
          className="font-semibold text-sm leading-snug line-clamp-2 group-hover:underline"
          style={{ color: 'var(--color-text)' }}
        >
          {title}
        </h3>

        {/* 강사 정보 */}
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
            style={{ backgroundColor: 'var(--color-brand)' }}
          >
            {instructorInitial ?? instructor.charAt(0).toUpperCase()}
          </div>
          <span
            className="text-xs truncate"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {instructor}
          </span>
        </div>

        {/* 별점 */}
        <RatingStars rating={rating} count={ratingCount} size="sm" />

        {/* 가격 */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span
            className="font-bold text-base"
            style={{ color: 'var(--color-text)' }}
          >
            {price === 0 ? '무료' : `${price.toLocaleString()}원`}
          </span>
          {originalPrice !== undefined && originalPrice > price && (
            <span
              className="text-xs line-through"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {originalPrice.toLocaleString()}원
            </span>
          )}
        </div>

        {/* 메타 정보 */}
        <div
          className="flex items-center gap-3 pt-2 text-[11px]"
          style={{
            color: 'var(--color-text-muted)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <span className="flex items-center gap-1">
            <Clock size={12} /> {duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <BarChart size={12} /> {level}
          </span>
        </div>
      </div>
    </Link>
  );
}
