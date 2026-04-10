// 프로필 페이지 — LinkedIn 스타일 사용자 프로필
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Users,
  UserPlus,
  FolderOpen,
  Heart,
  MessageCircle,
  Award,
  Calendar,
  MapPin,
  Briefcase,
  Clock,
} from "lucide-react";
import { currentUser } from "../../data/users";
import { activities } from "../../data/activities";
import { projects } from "../../data/projects";
import Button from "../../components/common/Button";

/* ── 탭 타입 ── */
type ProfileTab = "activity" | "projects" | "certificates";

/* ── 수료증 목 데이터 ── */
const mockCertificates = [
  {
    id: 1,
    title: "React 완전 정복: 기초부터 실전까지",
    issuedAt: "2026-03-15",
    credentialId: "CERT-REACT-2026-001",
    instructor: "김민수",
  },
  {
    id: 2,
    title: "TypeScript 심화: 타입 시스템 완벽 이해",
    issuedAt: "2026-02-20",
    credentialId: "CERT-TS-2026-002",
    instructor: "박준혁",
  },
  {
    id: 3,
    title: "Next.js 14 풀스택 개발",
    issuedAt: "2026-01-10",
    credentialId: "CERT-NEXT-2026-003",
    instructor: "김민수",
  },
  {
    id: 4,
    title: "Python 데이터 분석 마스터클래스",
    issuedAt: "2025-12-05",
    credentialId: "CERT-PY-2025-004",
    instructor: "이서연",
  },
];

/* ── 활동 타입 라벨 ── */
const activityTypeLabel: Record<string, string> = {
  completed_course: "과정 수료",
  earned_badge: "배지 획득",
  shared_project: "프로젝트 공유",
  joined_group: "그룹 참여",
  posted_discussion: "토론 작성",
  started_course: "학습 시작",
};

/* ── 탭 정의 ── */
const tabs: { key: ProfileTab; label: string }[] = [
  { key: "activity", label: "활동" },
  { key: "projects", label: "프로젝트" },
  { key: "certificates", label: "수료증" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("activity");
  const user = currentUser;

  // 현재 사용자 관련 활동 (userId: 1 기준, 없으면 최근 5개)
  const userActivities = activities.slice(0, 5);
  // 현재 사용자 관련 프로젝트
  const userProjects = projects.filter(
    (p) => p.authorAvatar === user.avatar
  );
  // 프로젝트가 부족하면 추가
  const displayProjects =
    userProjects.length > 0 ? userProjects : projects.slice(0, 4);

  return (
    <div className="container-page py-8">
      {/* ── 커버 + 프로필 헤더 ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl overflow-hidden border border-[var(--color-border)]"
      >
        {/* 커버 영역 */}
        <div
          className="h-40 sm:h-52"
          style={{
            background:
              "linear-gradient(135deg, #0056d2 0%, #667eea 50%, #764ba2 100%)",
          }}
        />

        {/* 프로필 정보 */}
        <div className="relative px-6 pb-6">
          {/* 아바타 */}
          <div className="absolute -top-12 left-6">
            <div className="w-24 h-24 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center text-2xl font-bold border-4 border-[var(--color-bg)]">
              {user.avatar}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex justify-end pt-3 gap-2">
            <Button variant="secondary" size="sm">
              메시지
            </Button>
            <Button variant="primary" size="sm">
              팔로우
            </Button>
          </div>

          {/* 이름, 역할, 회사 */}
          <div className="mt-2">
            <h1 className="text-2xl font-bold text-[var(--color-text)]">
              {user.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1">
                <Briefcase size={14} />
                {user.role}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {user.company}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {user.joinDate} 가입
              </span>
            </div>
          </div>

          {/* 자기소개 */}
          <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            {user.bio}
          </p>

          {/* 스킬 배지 */}
          <div className="mt-4 flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: "var(--color-bg-tertiary)",
                  color: "var(--color-brand)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* 통계 */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                icon: BookOpen,
                label: "수료 과정",
                value: user.coursesCompleted,
              },
              { icon: Users, label: "팔로워", value: user.followers },
              { icon: UserPlus, label: "팔로잉", value: user.following },
              {
                icon: FolderOpen,
                label: "프로젝트",
                value: displayProjects.length,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-3 rounded-lg"
                style={{ backgroundColor: "var(--color-bg-secondary)" }}
              >
                <stat.icon
                  size={18}
                  className="mx-auto mb-1"
                  style={{ color: "var(--color-brand)" }}
                />
                <div className="text-lg font-bold text-[var(--color-text)]">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── 탭 네비게이션 ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 border-b border-[var(--color-border)]"
      >
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={[
                "px-5 py-3 text-sm font-medium transition-colors relative cursor-pointer",
                activeTab === tab.key
                  ? "text-[var(--color-brand)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
              ].join(" ")}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: "var(--color-brand)" }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── 탭 컨텐츠 ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {activeTab === "activity" && (
            <ActivityTab activities={userActivities} />
          )}
          {activeTab === "projects" && (
            <ProjectsTab projects={displayProjects} />
          )}
          {activeTab === "certificates" && (
            <CertificatesTab certificates={mockCertificates} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── 활동 탭 ── */
function ActivityTab({
  activities: items,
}: {
  activities: typeof activities;
}) {
  return (
    <div className="space-y-4">
      {items.map((activity, i) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                backgroundColor: "var(--color-brand)",
                color: "#ffffff",
              }}
            >
              {activity.userAvatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm text-[var(--color-text)]">
                  {activity.userName}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-bg-tertiary)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {activityTypeLabel[activity.type] || activity.type}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {activity.content}
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <Heart size={12} />
                  {activity.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={12} />
                  {activity.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(activity.timestamp).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── 프로젝트 탭 ── */
function ProjectsTab({
  projects: items,
}: {
  projects: typeof projects;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="rounded-lg border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-border-hover)] transition-colors"
        >
          <div
            className="h-32"
            style={{ background: project.thumbnail }}
          />
          <div className="p-4">
            <h3 className="font-semibold text-sm text-[var(--color-text)]">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)] line-clamp-2">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-bg-tertiary)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <Heart size={11} />
                {project.likes}
              </span>
              <span className="flex items-center gap-1">
                <Users size={11} />
                {project.views}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── 수료증 탭 ── */
function CertificatesTab({
  certificates,
}: {
  certificates: typeof mockCertificates;
}) {
  return (
    <div className="space-y-3">
      {certificates.map((cert, i) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "var(--color-bg-tertiary)",
              color: "var(--color-brand)",
            }}
          >
            <Award size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-[var(--color-text)] truncate">
              {cert.title}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-muted)]">
              <span>강사: {cert.instructor}</span>
              <span>발급일: {cert.issuedAt}</span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
              {cert.credentialId}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            보기
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
