// 커뮤니티 페이지 — LinkedIn/Skillshare 스타일 소셜 학습 커뮤니티
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Tag, TrendingUp } from 'lucide-react';
import ActivityFeed, { type ActivityItem } from '../../components/social/ActivityFeed';
import DiscussionCard, { type Discussion } from '../../components/social/DiscussionCard';
import LeaderboardRow from '../../components/social/LeaderboardRow';
import UserProfileCard from '../../components/social/UserProfileCard';
import { currentUser, communityMembers } from '../../data/users';

// ── 필터 탭 ──
const FILTER_TABS = ['전체', '완료', '프로젝트', '토론', '그룹'] as const;
type FilterTab = (typeof FILTER_TABS)[number];

// ── 목 데이터: 활동 피드 ──
const mockActivities: ActivityItem[] = [
  {
    id: 1,
    userName: '김하린',
    userAvatar: '김하',
    type: '완료',
    content: '"딥러닝 자연어 처리(NLP)" 강좌를 완료했습니다.',
    detail: 'Transformer 아키텍처부터 GPT 파인튜닝까지 50시간 과정을 마쳤습니다.',
    tags: ['NLP', 'PyTorch', 'AI'],
    timestamp: '2시간 전',
    initialLikes: 42,
    initialComments: 8,
  },
  {
    id: 2,
    userName: '이수민',
    userAvatar: '이수',
    type: '프로젝트',
    content: '실시간 대시보드 프로젝트를 공유했습니다.',
    detail: 'React + WebSocket 기반으로 실시간 데이터 시각화를 구현한 프로젝트입니다.',
    tags: ['React', 'WebSocket', '프론트엔드'],
    timestamp: '4시간 전',
    initialLikes: 67,
    initialComments: 15,
  },
  {
    id: 3,
    userName: '박성호',
    userAvatar: '박성',
    type: '토론',
    content: 'Spring Boot 3.x에서 가상 스레드를 실무에 적용해본 분 계신가요?',
    detail: 'Project Loom 기반 가상 스레드의 실제 성능 개선 사례가 궁금합니다.',
    tags: ['Spring', 'Java', '백엔드'],
    timestamp: '5시간 전',
    initialLikes: 31,
    initialComments: 23,
  },
  {
    id: 4,
    userName: '최유나',
    userAvatar: '최유',
    type: '그룹',
    content: '"AI 논문 읽기 모임" 그룹에 가입했습니다.',
    tags: ['AI', '스터디', '논문'],
    timestamp: '6시간 전',
    initialLikes: 18,
    initialComments: 4,
  },
  {
    id: 5,
    userName: '정우진',
    userAvatar: '정우',
    type: '완료',
    content: '"Docker와 Kubernetes 실전 가이드" 강좌를 완료했습니다.',
    detail: 'Helm Chart 배포까지 진행하는 실전 프로젝트가 매우 유익했습니다.',
    tags: ['Docker', 'Kubernetes', 'DevOps'],
    timestamp: '8시간 전',
    initialLikes: 55,
    initialComments: 11,
  },
  {
    id: 6,
    userName: '한서영',
    userAvatar: '한서',
    type: '프로젝트',
    content: '디자인 시스템 피그마 파일을 공개했습니다.',
    detail: '100개 이상의 컴포넌트와 토큰을 포함한 오픈소스 디자인 시스템입니다.',
    tags: ['Figma', '디자인시스템', 'UX'],
    timestamp: '10시간 전',
    initialLikes: 89,
    initialComments: 27,
  },
  {
    id: 7,
    userName: '오태민',
    userAvatar: '오태',
    type: '토론',
    content: 'Flutter vs React Native, 2025년 기준 어떤 것을 선택해야 할까요?',
    detail: '신규 프로젝트 기술 선택에서 고민 중입니다. 경험 공유 부탁드립니다.',
    tags: ['Flutter', 'React Native', '모바일'],
    timestamp: '12시간 전',
    initialLikes: 45,
    initialComments: 38,
  },
  {
    id: 8,
    userName: '양준서',
    userAvatar: '양준',
    type: '완료',
    content: '"사이버 보안 전문가 과정" 강좌를 완료했습니다.',
    tags: ['보안', '네트워크', 'CTF'],
    timestamp: '1일 전',
    initialLikes: 33,
    initialComments: 6,
  },
];

// ── 목 데이터: 인기 토론 ──
const mockDiscussions: Discussion[] = [
  {
    id: 1,
    title: 'AI 코드 리뷰 도구, 실무에서 어떻게 활용하세요?',
    author: '김하린',
    authorAvatar: '김하',
    replies: 47,
    views: 1230,
    tag: 'AI',
  },
  {
    id: 2,
    title: 'Next.js 14 vs Remix, 서버 컴포넌트 관점에서',
    author: '이수민',
    authorAvatar: '이수',
    replies: 32,
    views: 890,
    tag: '프론트엔드',
  },
  {
    id: 3,
    title: 'Rust를 백엔드에 도입한 경험 공유합니다',
    author: '박성호',
    authorAvatar: '박성',
    replies: 28,
    views: 756,
    tag: '백엔드',
  },
];

// ── 목 데이터: 인기 태그 ──
const popularTags = [
  { name: 'React', count: 342 },
  { name: 'Python', count: 298 },
  { name: 'AI', count: 276 },
  { name: 'TypeScript', count: 245 },
  { name: 'DevOps', count: 189 },
  { name: 'Spring', count: 167 },
  { name: 'Next.js', count: 156 },
  { name: 'Docker', count: 143 },
  { name: 'Flutter', count: 121 },
  { name: 'NLP', count: 98 },
  { name: 'Kubernetes', count: 87 },
  { name: 'Figma', count: 76 },
];

// ── 스태거 컨테이너 애니메이션 ──
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('전체');

  // 활동 필터링
  const filteredActivities =
    activeTab === '전체'
      ? mockActivities
      : mockActivities.filter((a) => a.type === activeTab);

  // 리더보드: 완료 수 기준 상위 5명
  const leaderboard = [currentUser, ...communityMembers]
    .sort((a, b) => b.coursesCompleted - a.coursesCompleted)
    .slice(0, 5);

  return (
    <div className="container-page py-8 sm:py-12">
      {/* 페이지 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
          커뮤니티
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)] text-sm sm:text-base">
          함께 배우고, 공유하고, 성장하는 학습 커뮤니티
        </p>
      </motion.div>

      {/* 2/3 + 1/3 레이아웃 */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── 메인 영역 (2/3) ── */}
        <div className="flex-1 min-w-0 lg:max-w-[66.666%]">
          {/* 필터 탭 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 overflow-x-auto pb-1 mb-6 scrollbar-none"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors
                  ${
                    activeTab === tab
                      ? 'bg-[var(--color-brand)] text-white'
                      : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* 활동 피드 목록 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity, idx) => (
                  <motion.div key={activity.id} variants={staggerItem}>
                    <ActivityFeed activity={activity} index={idx} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={staggerItem}
                  className="py-16 text-center text-[var(--color-text-muted)] text-sm"
                >
                  해당 카테고리의 활동이 없습니다.
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 사이드바 (1/3) ── */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-80 xl:w-96 shrink-0 space-y-6"
        >
          {/* 내 프로필 카드 */}
          <UserProfileCard
            name={currentUser.name}
            avatar={currentUser.avatar}
            role={currentUser.role}
            company={currentUser.company}
            skills={currentUser.skills}
            coursesCompleted={currentUser.coursesCompleted}
            followers={currentUser.followers}
            following={currentUser.following}
          />

          {/* 인기 토론 */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
              <MessageSquare className="w-4 h-4 text-[var(--color-brand)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text)]">인기 토론</h3>
            </div>
            <div className="px-1 pb-2">
              {mockDiscussions.slice(0, 3).map((discussion, idx) => (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  index={idx}
                />
              ))}
            </div>
          </div>

          {/* 활발한 학습자 */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
              <TrendingUp className="w-4 h-4 text-[var(--color-brand)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text)]">활발한 학습자</h3>
            </div>
            <div className="px-1 pb-2">
              {leaderboard.map((user, idx) => (
                <LeaderboardRow
                  key={user.id}
                  rank={idx + 1}
                  name={user.name}
                  avatar={user.avatar}
                  company={user.company}
                  coursesCompleted={user.coursesCompleted}
                  index={idx}
                />
              ))}
            </div>
          </div>

          {/* 인기 태그 */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-[var(--color-brand)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text)]">인기 태그</h3>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2"
            >
              {popularTags.map((tag) => (
                <motion.button
                  key={tag.name}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
                >
                  #{tag.name}
                  <span className="ml-1.5 text-[var(--color-text-muted)]">{tag.count}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
