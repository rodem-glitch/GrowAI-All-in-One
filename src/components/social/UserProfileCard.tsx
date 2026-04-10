// 미니 프로필 카드 — LinkedIn 스타일
import { motion } from 'motion/react';
import { BookOpen, Users, UserPlus } from 'lucide-react';

interface UserProfileCardProps {
  name: string;
  avatar: string;
  role: string;
  company: string;
  skills: string[];
  coursesCompleted: number;
  followers: number;
  following: number;
  isFollowing?: boolean;
  onFollow?: () => void;
}

export default function UserProfileCard({
  name,
  avatar,
  role,
  company,
  skills,
  coursesCompleted,
  followers,
  following,
  isFollowing = false,
  onFollow,
}: UserProfileCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 text-center transition-shadow hover:shadow-md"
    >
      {/* 아바타 (lg) */}
      <div className="flex justify-center mb-3">
        <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] border-2 border-[var(--color-border)] flex items-center justify-center">
          <span className="text-lg font-bold text-[var(--color-text-secondary)]">
            {avatar}
          </span>
        </div>
      </div>

      {/* 이름 + 역할 + 회사 */}
      <h3 className="text-base font-semibold text-[var(--color-text)]">{name}</h3>
      <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
        {role}
        {company && (
          <span className="text-[var(--color-text-muted)]"> / {company}</span>
        )}
      </p>

      {/* 스킬 배지 */}
      {skills.length > 0 && (
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* 통계: 강의, 팔로워, 팔로잉 */}
      <div className="mt-4 pt-3 border-t border-[var(--color-border)] grid grid-cols-3 gap-2">
        <div>
          <div className="flex items-center justify-center text-[var(--color-text-muted)] mb-0.5">
            <BookOpen className="w-3 h-3" />
          </div>
          <p className="text-sm font-semibold text-[var(--color-text)]">{coursesCompleted}</p>
          <p className="text-[10px] text-[var(--color-text-muted)]">강의</p>
        </div>
        <div>
          <div className="flex items-center justify-center text-[var(--color-text-muted)] mb-0.5">
            <Users className="w-3 h-3" />
          </div>
          <p className="text-sm font-semibold text-[var(--color-text)]">{followers}</p>
          <p className="text-[10px] text-[var(--color-text-muted)]">팔로워</p>
        </div>
        <div>
          <div className="flex items-center justify-center text-[var(--color-text-muted)] mb-0.5">
            <UserPlus className="w-3 h-3" />
          </div>
          <p className="text-sm font-semibold text-[var(--color-text)]">{following}</p>
          <p className="text-[10px] text-[var(--color-text-muted)]">팔로잉</p>
        </div>
      </div>

      {/* 팔로우 버튼 */}
      <button
        type="button"
        onClick={onFollow}
        className="mt-4 w-full py-2 rounded-lg text-sm font-medium transition-colors"
        style={{
          backgroundColor: isFollowing ? 'var(--color-bg-tertiary)' : 'var(--color-brand)',
          color: isFollowing ? 'var(--color-text-secondary)' : '#ffffff',
        }}
      >
        {isFollowing ? '팔로잉' : '팔로우'}
      </button>
    </motion.div>
  );
}
