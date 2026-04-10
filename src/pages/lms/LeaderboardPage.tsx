// 리더보드 페이지 — 학습 랭킹
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Medal,
  TrendingUp,
  BookOpen,
  Users,
  Star,
  Crown,
} from "lucide-react";
import { currentUser, communityMembers, type User } from "../../data/users";
import SectionHeading from "../../components/common/SectionHeading";

/* ── 탭 타입 ── */
type LeaderboardTab = "weekly" | "monthly" | "all";

const tabs: { key: LeaderboardTab; label: string }[] = [
  { key: "weekly", label: "주간" },
  { key: "monthly", label: "월간" },
  { key: "all", label: "전체" },
];

/* ── 랭킹 데이터 생성 (탭별 가중치 적용) ── */
function getRankedUsers(
  users: User[],
  tab: LeaderboardTab
): (User & { score: number })[] {
  const multiplier: Record<LeaderboardTab, number> = {
    weekly: 0.3,
    monthly: 0.6,
    all: 1,
  };
  const factor = multiplier[tab];

  return users
    .map((u) => ({
      ...u,
      score: Math.round(u.coursesCompleted * factor * 100 + u.followers * factor * 0.5),
    }))
    .sort((a, b) => b.score - a.score);
}

/* ── 포디움 색상 ── */
const podiumColors = [
  { bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", text: "#92600a" },
  { bg: "linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)", text: "#4a4a4a" },
  { bg: "linear-gradient(135deg, #CD7F32 0%, #B87333 100%)", text: "#5c3a1a" },
];

const podiumIcons = [Crown, Medal, Medal];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("all");

  const allUsers = useMemo(
    () => [currentUser, ...communityMembers],
    []
  );

  const ranked = useMemo(
    () => getRankedUsers(allUsers, activeTab),
    [allUsers, activeTab]
  );

  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  return (
    <div className="container-page py-10">
      {/* ── 헤더 ── */}
      <SectionHeading
        title="학습 리더보드"
        subtitle="가장 열정적으로 학습하는 멤버들을 확인해보세요"
      />

      {/* ── 탭 ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <div
          className="inline-flex rounded-lg p-1"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={[
                "px-5 py-2 text-sm font-medium rounded-md transition-all cursor-pointer relative",
                activeTab === tab.key
                  ? "text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
              ].join(" ")}
              style={
                activeTab === tab.key
                  ? { backgroundColor: "var(--color-brand)" }
                  : {}
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Top 3 포디움 ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {/* 모바일: 1-2-3 순서, 데스크탑: 2-1-3 순서 */}
            {[1, 0, 2].map((podiumIndex, gridPos) => {
              const user = top3[podiumIndex];
              if (!user) return null;
              const rank = podiumIndex + 1;
              const color = podiumColors[podiumIndex];
              const Icon = podiumIcons[podiumIndex];

              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: gridPos * 0.1,
                  }}
                  className={[
                    "rounded-xl border border-[var(--color-border)] p-6 text-center relative overflow-hidden",
                    rank === 1 ? "sm:row-start-1 sm:-mt-4" : "",
                    // 모바일 순서 조정
                    rank === 1
                      ? "order-first sm:order-2"
                      : rank === 2
                        ? "order-2 sm:order-1"
                        : "order-3 sm:order-3",
                  ].join(" ")}
                >
                  {/* 랭크 뱃지 */}
                  <div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: color.bg }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ color: color.text }}
                    >
                      {rank}
                    </span>
                  </div>

                  {/* 아이콘 */}
                  <div className="flex justify-center mb-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: color.bg }}
                    >
                      <Icon size={16} style={{ color: color.text }} />
                    </div>
                  </div>

                  {/* 아바타 */}
                  <div
                    className={[
                      "mx-auto rounded-full flex items-center justify-center font-bold text-white border-4",
                      rank === 1 ? "w-20 h-20 text-xl" : "w-16 h-16 text-lg",
                    ].join(" ")}
                    style={{
                      backgroundColor: "var(--color-brand)",
                      borderColor: "var(--color-bg)",
                      boxShadow: `0 0 0 2px ${rank === 1 ? "#FFD700" : rank === 2 ? "#C0C0C0" : "#CD7F32"}`,
                    }}
                  >
                    {user.avatar}
                  </div>

                  {/* 이름 + 역할 */}
                  <h3 className="mt-3 font-bold text-[var(--color-text)]">
                    {user.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    {user.role}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {user.company}
                  </p>

                  {/* 점수 */}
                  <div
                    className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold"
                    style={{
                      background: color.bg,
                      color: color.text,
                    }}
                  >
                    <Trophy size={14} />
                    {user.score.toLocaleString()}점
                  </div>

                  {/* 상세 통계 */}
                  <div className="mt-3 flex justify-center gap-4 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} />
                      {user.coursesCompleted}과정
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={11} />
                      {user.followers}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── 전체 랭킹 테이블 ── */}
          <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
            {/* 테이블 헤더 */}
            <div
              className="hidden sm:grid sm:grid-cols-[60px_1fr_120px_100px_100px_100px] gap-2 px-4 py-3 text-xs font-medium text-[var(--color-text-muted)]"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
              <span>순위</span>
              <span>학습자</span>
              <span className="text-center">점수</span>
              <span className="text-center">수료 과정</span>
              <span className="text-center">팔로워</span>
              <span className="text-center">스킬</span>
            </div>

            {/* 랭킹 행 */}
            {ranked.map((user, i) => (
              <LeaderboardRow
                key={user.id}
                user={user}
                rank={i + 1}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── 리더보드 행 ── */
interface LeaderboardRowProps {
  user: User & { score: number };
  rank: number;
  index: number;
  key?: string | number;
}

function LeaderboardRow({ user, rank, index }: LeaderboardRowProps) {
  const isTop3 = rank <= 3;
  const rankColor =
    rank === 1
      ? "#FFD700"
      : rank === 2
        ? "#C0C0C0"
        : rank === 3
          ? "#CD7F32"
          : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="grid grid-cols-[40px_1fr_auto] sm:grid-cols-[60px_1fr_120px_100px_100px_100px] gap-2 items-center px-4 py-3 border-t border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors"
    >
      {/* 순위 */}
      <div className="flex items-center justify-center">
        {isTop3 ? (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background:
                rank === 1
                  ? "linear-gradient(135deg, #FFD700, #FFA500)"
                  : rank === 2
                    ? "linear-gradient(135deg, #C0C0C0, #A0A0A0)"
                    : "linear-gradient(135deg, #CD7F32, #B87333)",
            }}
          >
            <span className="text-xs font-bold text-white">{rank}</span>
          </div>
        ) : (
          <span className="text-sm font-medium text-[var(--color-text-muted)]">
            {rank}
          </span>
        )}
      </div>

      {/* 사용자 정보 */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{
            backgroundColor: "var(--color-brand)",
            boxShadow: rankColor
              ? `0 0 0 2px ${rankColor}`
              : undefined,
          }}
        >
          {user.avatar}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-[var(--color-text)] truncate">
              {user.name}
            </span>
            {isTop3 && (
              <Star
                size={12}
                fill={rankColor}
                color={rankColor}
              />
            )}
          </div>
          <span className="text-xs text-[var(--color-text-muted)] truncate block">
            {user.role} / {user.company}
          </span>
        </div>
      </div>

      {/* 점수 — 모바일에서는 오른쪽 끝에 표시 */}
      <div className="text-center">
        <span
          className="inline-flex items-center gap-1 text-sm font-bold"
          style={{ color: isTop3 ? rankColor : "var(--color-brand)" }}
        >
          <TrendingUp size={13} />
          {user.score.toLocaleString()}
        </span>
      </div>

      {/* 수료 과정 — 모바일 숨김 */}
      <div className="hidden sm:flex items-center justify-center gap-1 text-sm text-[var(--color-text-secondary)]">
        <BookOpen size={13} />
        {user.coursesCompleted}
      </div>

      {/* 팔로워 — 모바일 숨김 */}
      <div className="hidden sm:flex items-center justify-center gap-1 text-sm text-[var(--color-text-secondary)]">
        <Users size={13} />
        {user.followers.toLocaleString()}
      </div>

      {/* 스킬 — 모바일 숨김 */}
      <div className="hidden sm:flex items-center justify-center">
        <span className="text-xs text-[var(--color-text-muted)]">
          {user.skills.length}개
        </span>
      </div>
    </motion.div>
  );
}
