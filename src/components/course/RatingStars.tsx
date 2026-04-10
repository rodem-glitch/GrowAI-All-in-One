// 별점 표시 컴포넌트 (1-5, 반별 지원)
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;       // 0 ~ 5 (0.5 단위)
  count?: number;       // 평가 수
  size?: 'sm' | 'md';
}

export default function RatingStars({ rating, count, size = 'sm' }: RatingStarsProps) {
  const starSize = size === 'sm' ? 14 : 18;
  const textClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center gap-1">
      {/* 숫자 표시 */}
      <span
        className={`font-bold ${textClass}`}
        style={{ color: 'var(--color-warning)' }}
      >
        {rating.toFixed(1)}
      </span>

      {/* 별 아이콘 */}
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = rating >= i + 1;
          const half = !filled && rating >= i + 0.5;

          return (
            <span key={i} className="relative inline-flex">
              {/* 빈 별 (배경) */}
              <Star
                size={starSize}
                className="stroke-current"
                style={{ color: 'var(--color-border-hover)' }}
                fill="var(--color-border-hover)"
              />
              {/* 채워진 별 (전체 또는 반) */}
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? '50%' : '100%' }}
                >
                  <Star
                    size={starSize}
                    className="stroke-current"
                    style={{ color: 'var(--color-warning)' }}
                    fill="var(--color-warning)"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* 평가 수 */}
      {count !== undefined && (
        <span
          className={`${textClass}`}
          style={{ color: 'var(--color-text-secondary)' }}
        >
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
