// 리더보드 행 — 순위 + 아바타 + 이름 + 점수 + 배지
import { motion } from 'motion/react';
import { Trophy, Award } from 'lucide-react';

interface LeaderboardRowProps {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  badges: string[];
  index: number;
}

// 상위 3등 메달 색상
const medalColors: Record<number, string> = {
  1: 'text-yellow-500',
  2: 'text-gray-400',
  3: 'text-amber-600',
};

export default function LeaderboardRow({
  rank,
  name,
  avatar,
  score,
  badges,
  index,
}: LeaderboardRowProps) {
  const hasMedal = rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ scale: 1.01, x: 4 }}
      className="flex items-center gap-3 py-2.5 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-border-hover)] transition-all hover:shadow-sm"
    >
      {/* 순위 */}
      <div className="w-7 flex items-center justify-center shrink-0">
        {hasMedal ? (
          <Trophy className={`w-4.5 h-4.5 ${medalColors[rank]}`} />
        ) : (
          <span className="text-sm font-bold text-[var(--color-text-muted)]">{rank}</span>
        )}
      </div>

      {/* 아바타 */}
      <div className="w-9 h-9 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
          {avatar}
        </span>
      </div>

      {/* 이름 */}
      <span className="flex-1 text-sm font-medium text-[var(--color-text)] truncate min-w-0">
        {name}
      </span>

      {/* 배지 */}
      {badges.length > 0 && (
        <div className="hidden sm:flex items-center gap-1 shrink-0">
          {badges.slice(0, 3).map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
            >
              <Award className="w-2.5 h-2.5" />
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* 점수 */}
      <div className="shrink-0 text-right">
        <span className="text-sm font-bold text-[var(--color-brand)]">
          {score.toLocaleString()}
        </span>
        <span className="text-[10px] text-[var(--color-text-muted)] ml-0.5">pt</span>
      </div>
    </motion.div>
  );
}
