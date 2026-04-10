// 학습 경로 카드 컴포넌트 (edX 스타일)
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Clock, BarChart, ArrowRight } from 'lucide-react';

/** 학습 경로 데이터 타입 */
export interface LearningPath {
  id: number;
  title: string;
  description: string;
  courseCount: number;
  duration: string;         // "120시간", "3개월" 등
  level: string;            // "입문", "중급", "고급"
  gradient: string;         // CSS gradient 문자열
  enrolled?: boolean;       // 등록 여부
  progress?: number;        // 0 ~ 100
}

export interface LearningPathCardProps {
  path: LearningPath;
  index?: number;           // 애니메이션 stagger용
}

export default function LearningPathCard({ path, index = 0 }: LearningPathCardProps) {
  const {
    id,
    title,
    description,
    courseCount,
    duration,
    level,
    gradient,
    enrolled = false,
    progress = 0,
  } = path;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/learning-path/${id}`}
        className="group flex flex-col rounded-xl overflow-hidden transition-all hover:shadow-lg"
        style={{
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* 그라디언트 헤더 */}
        <div
          className="h-3 w-full"
          style={{ background: gradient }}
        />

        <div className="flex flex-col flex-1 p-5">
          {/* 상단: 레벨 뱃지 */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded"
              style={{
                color: 'var(--color-brand)',
                backgroundColor: 'color-mix(in srgb, var(--color-brand) 10%, transparent)',
              }}
            >
              {level}
            </span>
            {enrolled && (
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded"
                style={{
                  color: 'var(--color-success)',
                  backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
                }}
              >
                {progress}% 완료
              </span>
            )}
          </div>

          {/* 제목 */}
          <h3
            className="font-bold text-base leading-snug mb-2 group-hover:underline"
            style={{ color: 'var(--color-text)' }}
          >
            {title}
          </h3>

          {/* 설명 */}
          <p
            className="text-sm line-clamp-2 mb-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {description}
          </p>

          {/* 메타 정보 */}
          <div
            className="flex items-center gap-4 text-xs mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span className="flex items-center gap-1">
              <BookOpen size={13} /> {courseCount}개 강좌
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {duration}
            </span>
            <span className="flex items-center gap-1">
              <BarChart size={13} /> {level}
            </span>
          </div>

          {/* 진행률 바 (등록된 경우) */}
          {enrolled && (
            <div className="mb-4">
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(0, progress))}%`,
                    backgroundColor: 'var(--color-success)',
                  }}
                />
              </div>
            </div>
          )}

          {/* CTA 버튼 */}
          <div className="mt-auto">
            <span
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: 'var(--color-brand)' }}
            >
              {enrolled ? '이어서 학습하기' : '시작하기'}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
