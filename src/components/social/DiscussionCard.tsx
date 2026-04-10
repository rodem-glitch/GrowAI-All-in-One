// 토론 카드 — 커뮤니티 스레드
import { motion } from 'motion/react';
import { MessageSquare, Eye, Heart, ArrowUpRight } from 'lucide-react';

export interface Discussion {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  preview: string;
  replies: number;
  views: number;
  likes: number;
  tags: string[];
}

interface DiscussionCardProps {
  discussion: Discussion;
  index: number;
}

// 카테고리 색상 매핑
const categoryStyles: Record<string, string> = {
  '질문': 'bg-[var(--color-brand)] text-white',
  '토론': 'bg-[var(--color-success)] text-white',
  '공유': 'bg-[var(--color-warning)] text-white',
  '공지': 'bg-[var(--color-error)] text-white',
};

export default function DiscussionCard({ discussion, index }: DiscussionCardProps) {
  const badgeClass = categoryStyles[discussion.category] || 'bg-[var(--color-brand)] text-white';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      className="group p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-border-hover)] transition-all hover:shadow-sm cursor-pointer"
    >
      {/* 헤더: 카테고리 배지 + 작성자 */}
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${badgeClass}`}>
          {discussion.category}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center">
            <span className="text-[8px] font-semibold text-[var(--color-text-secondary)]">
              {discussion.authorAvatar}
            </span>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">{discussion.author}</span>
        </div>
      </div>

      {/* 제목 */}
      <div className="flex items-center gap-1.5">
        <h4 className="text-sm font-semibold text-[var(--color-text)] line-clamp-1 group-hover:text-[var(--color-brand)] transition-colors">
          {discussion.title}
        </h4>
        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </div>

      {/* 미리보기 텍스트 */}
      <p className="mt-1.5 text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
        {discussion.preview}
      </p>

      {/* 태그 */}
      {discussion.tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {discussion.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-medium bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 통계: 답글, 조회, 좋아요 */}
      <div className="mt-3 pt-2.5 border-t border-[var(--color-border)] flex items-center gap-4">
        <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <MessageSquare className="w-3.5 h-3.5" />
          {discussion.replies}
        </span>
        <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <Eye className="w-3.5 h-3.5" />
          {discussion.views.toLocaleString()}
        </span>
        <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <Heart className="w-3.5 h-3.5" />
          {discussion.likes}
        </span>
      </div>
    </motion.div>
  );
}
