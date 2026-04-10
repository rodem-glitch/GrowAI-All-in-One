// 프로젝트 카드 — Skillshare 스타일
import { motion } from 'motion/react';
import { Heart, Eye } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatarUrl?: string;
  thumbnailUrl?: string;
  tags: string[];
  likes: number;
  views: number;
  gradientFrom?: string;
  gradientTo?: string;
}

// 아바타 이니셜 추출
function getInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}

export default function ProjectCard({
  title,
  description,
  authorName,
  authorAvatarUrl,
  thumbnailUrl,
  tags,
  likes,
  views,
  gradientFrom = '#6366f1',
  gradientTo = '#8b5cf6',
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden transition-shadow hover:shadow-lg"
    >
      {/* 썸네일 / 그래디언트 */}
      <div className="relative aspect-video overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="p-4">
        {/* 작성자 */}
        <div className="flex items-center gap-2 mb-2.5">
          {authorAvatarUrl ? (
            <img
              src={authorAvatarUrl}
              alt={authorName}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-[var(--color-brand)] flex items-center justify-center">
              <span className="text-white text-[10px] font-semibold">
                {getInitials(authorName)}
              </span>
            </div>
          )}
          <span className="text-xs text-[var(--color-text-secondary)] font-medium truncate">
            {authorName}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="text-sm font-semibold text-[var(--color-text)] leading-snug line-clamp-1">
          {title}
        </h3>

        {/* 설명 */}
        <p className="mt-1 text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* 태그 */}
        {tags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 통계 */}
        <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
            <Heart className="w-3.5 h-3.5" />
            {likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
            <Eye className="w-3.5 h-3.5" />
            {views.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
