"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Users,
  MessageSquare,
  MessagesSquare,
  Code2,
  Video,
  FileText,
  Calendar,
  ArrowRight,
  MessageCircle,
  Clock,
  ThumbsUp,
  Eye,
  Trophy,
  Star,
  Flame,
  BookOpen,
  Lightbulb,
  Tag,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";

/* ── 채널 데이터 ── */
const channels = [
  {
    icon: MessageSquare,
    titleKo: "포럼", titleEn: "Forum",
    descKo: "질문과 답변, 토론을 통해 함께 성장하세요.",
    descEn: "Grow together through Q&A and discussions.",
    href: "#forum",
    members: "12.4K",
  },
  {
    icon: MessagesSquare,
    titleKo: "디스코드", titleEn: "Discord",
    descKo: "실시간 채팅으로 즉각적인 도움을 받으세요.",
    descEn: "Get instant help through real-time chat.",
    href: "/discord",
    members: "8.2K",
  },
  {
    icon: Code2,
    titleKo: "깃허브", titleEn: "GitHub",
    descKo: "오픈소스 프로젝트에 기여하고 협업하세요.",
    descEn: "Contribute to open source projects.",
    href: "#",
    members: "3.1K",
  },
  {
    icon: Video,
    titleKo: "유튜브", titleEn: "YouTube",
    descKo: "튜토리얼과 데모 영상을 확인하세요.",
    descEn: "Watch tutorials and demo videos.",
    href: "#",
    members: "15K",
  },
  {
    icon: FileText,
    titleKo: "블로그", titleEn: "Blog",
    descKo: "최신 아티클과 활용 팁을 읽어보세요.",
    descEn: "Read articles and tips.",
    href: "/blog",
    members: "20K",
  },
  {
    icon: Calendar,
    titleKo: "이벤트", titleEn: "Events",
    descKo: "밋업과 웨비나에 참여하세요.",
    descEn: "Join meetups and webinars.",
    href: "#events",
    members: "5.6K",
  },
];

/* ── 토론 카테고리 ── */
const categories = [
  { id: "all", labelKo: "전체", labelEn: "All" },
  { id: "general", labelKo: "일반", labelEn: "General" },
  { id: "tutorial", labelKo: "튜토리얼", labelEn: "Tutorial" },
  { id: "showcase", labelKo: "쇼케이스", labelEn: "Showcase" },
  { id: "question", labelKo: "질문", labelEn: "Questions" },
  { id: "feature", labelKo: "기능 요청", labelEn: "Feature Request" },
];

/* ── 토론 목록 ── */
const discussions = [
  {
    id: 1,
    category: "showcase",
    titleKo: "Veo 3.1로 만든 제품 소개 영상 공유합니다",
    titleEn: "Sharing product intro video made with Veo 3.1",
    authorKo: "Rodem", authorEn: "Rodem",
    authorColor: "#7c3aed",
    replies: 42, views: 1280, likes: 89,
    date: "2026-04-09",
    tags: ["Veo", "Showcase"],
    pinned: true,
  },
  {
    id: 2,
    category: "tutorial",
    titleKo: "LearnForm으로 30분 만에 e러닝 콘텐츠 만들기",
    titleEn: "Create e-learning content in 30min with LearnForm",
    authorKo: "Elliot", authorEn: "Elliot",
    authorColor: "#2563eb",
    replies: 38, views: 2100, likes: 124,
    date: "2026-04-08",
    tags: ["LearnForm", "Tutorial"],
    pinned: true,
  },
  {
    id: 3,
    category: "general",
    titleKo: "GrowAI + LMS 통합 실전 가이드",
    titleEn: "GrowAI + LMS integration practical guide",
    authorKo: "박준혁", authorEn: "Junhyuk Park",
    authorColor: "#14a1c8",
    replies: 55, views: 3400, likes: 201,
    date: "2026-04-07",
    tags: ["LMS", "Integration"],
    pinned: false,
  },
  {
    id: 4,
    category: "question",
    titleKo: "Claude Opus로 코드 리뷰 자동화하는 방법?",
    titleEn: "How to automate code review with Claude Opus?",
    authorKo: "김지은", authorEn: "Jieun Kim",
    authorColor: "#ea580c",
    replies: 23, views: 890, likes: 34,
    date: "2026-04-06",
    tags: ["Claude", "CCS"],
    pinned: false,
  },
  {
    id: 5,
    category: "showcase",
    titleKo: "MAP으로 불량률 40% 감소시킨 사례",
    titleEn: "Reduced defect rate 40% with MAP",
    authorKo: "이승민", authorEn: "Seungmin Lee",
    authorColor: "#059669",
    replies: 67, views: 4200, likes: 312,
    date: "2026-04-05",
    tags: ["MAP", "Manufacturing"],
    pinned: false,
  },
  {
    id: 6,
    category: "feature",
    titleKo: "VLS 실시간 자막에 감정 분석 추가 요청",
    titleEn: "Request: sentiment analysis in VLS live captions",
    authorKo: "정하영", authorEn: "Hayoung Jung",
    authorColor: "#db2777",
    replies: 19, views: 560, likes: 45,
    date: "2026-04-04",
    tags: ["VLS", "Feature"],
    pinned: false,
  },
  {
    id: 7,
    category: "tutorial",
    titleKo: "CDN 글로벌 배포 최적화 A to Z",
    titleEn: "CDN Global Deployment Optimization A to Z",
    authorKo: "Ention", authorEn: "Ention",
    authorColor: "#1e3a5f",
    replies: 31, views: 1800, likes: 98,
    date: "2026-04-03",
    tags: ["CDN", "Performance"],
    pinned: false,
  },
];

/* ── 리더보드 ── */
const leaders = [
  { name: "Ention", points: 4280, badge: "Gold", color: "#f59e0b" },
  { name: "Elliot", points: 3920, badge: "Gold", color: "#f59e0b" },
  { name: "Rodem", points: 3150, badge: "Silver", color: "#9ca3af" },
  { name: "Scarlet", points: 2890, badge: "Silver", color: "#9ca3af" },
  { name: "박준혁", points: 2450, badge: "Bronze", color: "#b45309" },
];

/* ── 예정 이벤트 ── */
const events = [
  {
    titleKo: "GrowAI 월간 밋업",
    titleEn: "GrowAI Monthly Meetup",
    dateKo: "4월 18일 (금) 19:00",
    dateEn: "Apr 18 (Fri) 7:00 PM",
    typeKo: "온라인", typeEn: "Online",
    attendees: 234,
  },
  {
    titleKo: "AI 영상 제작 워크숍",
    titleEn: "AI Video Production Workshop",
    dateKo: "4월 25일 (금) 14:00",
    dateEn: "Apr 25 (Fri) 2:00 PM",
    typeKo: "오프라인 (서울)", typeEn: "Offline (Seoul)",
    attendees: 86,
  },
  {
    titleKo: "Veo 3.1 딥다이브 웨비나",
    titleEn: "Veo 3.1 Deep Dive Webinar",
    dateKo: "5월 2일 (금) 11:00",
    dateEn: "May 2 (Fri) 11:00 AM",
    typeKo: "온라인", typeEn: "Online",
    attendees: 512,
  },
];

/* ── 컴포넌트 ── */
export default function CommunityContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDiscussions = discussions.filter((d) => {
    const matchCategory = activeCategory === "all"
      || d.category === activeCategory;
    const matchSearch = searchQuery.length < 2
      || (isKo ? d.titleKo : d.titleEn)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const pinnedItems = filteredDiscussions.filter((d) => d.pinned);
  const regularItems = filteredDiscussions.filter((d) => !d.pinned);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${colors.primary}15` }}
          >
            <Users className="w-8 h-8" style={{ color: colors.primary }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {isKo ? "GrowAI 커뮤니티" : "GrowAI Community"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {isKo
              ? "전 세계 사용자와 연결하고, 지식을 공유하며, 함께 성장하세요."
              : "Connect with users worldwide, share knowledge, and grow together."}
          </p>
        </div>
      </section>

      {/* ── 통계 ── */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50K+", labelKo: "멤버", labelEn: "Members", icon: Users },
              { value: "10K+", labelKo: "토론", labelEn: "Discussions", icon: MessageCircle },
              { value: "200+", labelKo: "국가", labelEn: "Countries", icon: Star },
              { value: "98%", labelKo: "응답률", labelEn: "Response Rate", icon: ThumbsUp },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.value}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 text-center"
                >
                  <Icon className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                  <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {isKo ? stat.labelKo : stat.labelEn}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 채널 ── */}
      <section className="pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
            {isKo ? "채널" : "Channels"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.titleEn}
                  href={ch.href}
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg hover:border-transparent transition-all"
                  style={{ ["--hover-border" as string]: colors.primary }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primary}10` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      {ch.members} {isKo ? "멤버" : "members"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isKo ? ch.titleKo : ch.titleEn}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {isKo ? ch.descKo : ch.descEn}
                  </p>
                  <span
                    className="text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: colors.primary }}
                  >
                    {isKo ? "참여하기" : "Join"} <ChevronRight className="w-4 h-4" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 포럼: 검색 + 필터 + 토론 목록 ── */}
      <section id="forum" className="pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isKo ? "포럼" : "Forum"}
            </h2>
            {/* 검색 */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={isKo ? "토론 검색..." : "Search discussions..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2"
                style={{ ["--tw-ring-color" as string]: colors.primary }}
              />
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: activeCategory === cat.id ? colors.primary : "transparent",
                  color: activeCategory === cat.id ? "white" : "#6b7280",
                  border: activeCategory === cat.id ? "none" : "1px solid #e5e7eb",
                }}
              >
                {isKo ? cat.labelKo : cat.labelEn}
              </button>
            ))}
          </div>

          {/* 고정 토론 */}
          {pinnedItems.length > 0 && (
            <div className="mb-4">
              {pinnedItems.map((d) => (
                <div
                  key={d.id}
                  className="bg-white dark:bg-gray-900 border-l-4 border border-gray-200 dark:border-gray-800 rounded-xl p-5 mb-3 hover:shadow-md transition"
                  style={{ borderLeftColor: colors.primary }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Flame className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                        <span className="text-xs font-medium" style={{ color: colors.primary }}>
                          {isKo ? "고정됨" : "Pinned"}
                        </span>
                        {d.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        {isKo ? d.titleKo : d.titleEn}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-4 h-4 rounded-full inline-flex items-center justify-center text-white text-[8px] font-bold"
                            style={{ backgroundColor: d.authorColor }}
                          >
                            {(isKo ? d.authorKo : d.authorEn)[0]}
                          </span>
                          {isKo ? d.authorKo : d.authorEn}
                        </span>
                        <span>{d.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 shrink-0">
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{d.views.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{d.replies}</span>
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{d.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 일반 토론 */}
          <div className="space-y-3">
            {regularItems.map((d) => (
              <div
                key={d.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      {d.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {isKo ? d.titleKo : d.titleEn}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-4 h-4 rounded-full inline-flex items-center justify-center text-white text-[8px] font-bold"
                          style={{ backgroundColor: d.authorColor }}
                        >
                          {(isKo ? d.authorKo : d.authorEn)[0]}
                        </span>
                        {isKo ? d.authorKo : d.authorEn}
                      </span>
                      <span>{d.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 shrink-0">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{d.views.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{d.replies}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{d.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDiscussions.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              {isKo ? "검색 결과가 없습니다." : "No results found."}
            </div>
          )}
        </div>
      </section>

      {/* ── 사이드 패널: 리더보드 + 이벤트 ── */}
      <section className="pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* 리더보드 */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5" style={{ color: colors.primary }} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {isKo ? "이달의 기여자" : "Top Contributors"}
                </h3>
              </div>
              <div className="space-y-4">
                {leaders.map((leader, i) => (
                  <div key={leader.name} className="flex items-center gap-3">
                    <span className="w-6 text-center text-sm font-bold text-gray-400">
                      {i + 1}
                    </span>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: leader.color }}
                    >
                      {leader.name[0]}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {leader.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {leader.points.toLocaleString()} pts
                      </div>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${leader.color}20`,
                        color: leader.color,
                      }}
                    >
                      {leader.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 이벤트 */}
            <div
              id="events"
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {isKo ? "예정된 이벤트" : "Upcoming Events"}
                </h3>
              </div>
              <div className="space-y-4">
                {events.map((ev) => (
                  <div
                    key={ev.titleEn}
                    className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {isKo ? ev.titleKo : ev.titleEn}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {isKo ? ev.dateKo : ev.dateEn}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                        {isKo ? ev.typeKo : ev.typeEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <Users className="w-3.5 h-3.5" />
                      {ev.attendees} {isKo ? "명 참여" : "attending"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 빠른 링크 ── */}
      <section className="pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                titleKo: "시작 가이드", titleEn: "Getting Started",
                descKo: "GrowAI를 처음 사용하시나요? 5분 만에 시작하세요.",
                descEn: "New to GrowAI? Get started in 5 minutes.",
                href: "/help-center",
              },
              {
                icon: Lightbulb,
                titleKo: "활용 사례", titleEn: "Use Cases",
                descKo: "다른 팀은 GrowAI를 어떻게 활용하는지 확인하세요.",
                descEn: "See how other teams use GrowAI.",
                href: "/blog",
              },
              {
                icon: Tag,
                titleKo: "기능 요청", titleEn: "Feature Requests",
                descKo: "원하는 기능을 제안하고 투표하세요.",
                descEn: "Suggest and vote on new features.",
                href: "#forum",
              },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.titleEn}
                  href={link.href}
                  className="group flex items-start gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg transition"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:underline">
                      {isKo ? link.titleKo : link.titleEn}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isKo ? link.descKo : link.descEn}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-32">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {isKo ? "커뮤니티에 참여하세요" : "Join the Community"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            {isKo
              ? "GrowAI와 함께 AI 영상 생성의 미래를 만들어가세요."
              : "Shape the future of AI video generation with GrowAI."}
          </p>
          <a
            href="/discord"
            className="px-8 py-3 text-base font-semibold text-white rounded-xl hover:opacity-90 transition inline-flex items-center gap-2"
            style={{ backgroundColor: colors.primary }}
          >
            {isKo ? "디스코드 참여하기" : "Join Discord"}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
