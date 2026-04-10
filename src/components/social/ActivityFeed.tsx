// 활동 피드 아이템 컴포넌트
import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

export interface ActivityItem {
  id: number;
  userName: string;
  userAvatar: string;
  type: '완료' | '프로젝트' | '토론' | '그룹';
  content: string;
  detail?: string;
  tags: string[];
  timestamp: string;
  initialLikes: number;
  initialComments: number;
}

interface ActivityFeedProps {
  activity: ActivityItem;
  index: number;
}

// 활동 타입별 라벨 색상
const typeStyles: Record<string, string> = {
  '완료': 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  '프로젝트': 'bg-[var(--color-brand)]/10 text-[var(--color-brand)]',
  '토론': 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  '그룹': 'bg-purple-50 text-purple-600',
};

export default function ActivityFeed({ activity, index }: ActivityFeedProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(activity.initialLikes);
  const [commentCount] = useState(activity.initialComments);

  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-border-hover)] transition-colors"
    >
      {/* 헤더 */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
            {activity.userAvatar}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[var(--color-text)]">
              {activity.userName}
            </span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeStyles[activity.type] || ''}`}
            >
              {activity.type}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {activity.timestamp}
            </span>
          </div>

          <p className="mt-1.5 text-sm text-[var(--color-text)]">{activity.content}</p>

          {activity.detail && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {activity.detail}
            </p>
          )}

          {/* 태그 */}
          {activity.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {activity.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 상호작용 버튼 */}
          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                liked
                  ? 'text-[var(--color-error)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-error)]'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </button>

            <button className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{commentCount}</span>
            </button>

            <button className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              <Share2 className="w-4 h-4" />
              <span>공유</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
