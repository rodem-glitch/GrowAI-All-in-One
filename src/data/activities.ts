export type ActivityType =
  | "completed_course"
  | "earned_badge"
  | "shared_project"
  | "joined_group"
  | "posted_discussion"
  | "started_course";

export interface Activity {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  type: ActivityType;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  courseTitle?: string;
}

export const activities: Activity[] = [
  {
    id: 1,
    userId: 2,
    userName: "이수민",
    userAvatar: "이수",
    type: "completed_course",
    content: "React 완전 정복 과정을 수료했습니다. 실무에서 바로 활용할 수 있는 내용이 많았습니다.",
    timestamp: "2026-04-09T09:30:00",
    likes: 24,
    comments: 8,
    courseTitle: "React 완전 정복: 기초부터 실전까지",
  },
  {
    id: 2,
    userId: 4,
    userName: "최유나",
    userAvatar: "최유",
    type: "earned_badge",
    content: "'AI 탐험가' 배지를 획득했습니다. AI 관련 과정 5개를 모두 수료했습니다.",
    timestamp: "2026-04-09T08:15:00",
    likes: 45,
    comments: 12,
  },
  {
    id: 3,
    userId: 3,
    userName: "박성호",
    userAvatar: "박성",
    type: "shared_project",
    content: "Spring Boot 기반 마이크로서비스 아키텍처 프로젝트를 공유합니다. 피드백 부탁드립니다.",
    timestamp: "2026-04-09T07:45:00",
    likes: 67,
    comments: 23,
  },
  {
    id: 4,
    userId: 6,
    userName: "한서영",
    userAvatar: "한서",
    type: "joined_group",
    content: "'UX 디자인 스터디' 그룹에 참여했습니다.",
    timestamp: "2026-04-08T22:10:00",
    likes: 15,
    comments: 3,
  },
  {
    id: 5,
    userId: 8,
    userName: "김하린",
    userAvatar: "김하",
    type: "posted_discussion",
    content: "Transformer 아키텍처에서 Attention 메커니즘 최적화에 대한 토론을 시작했습니다.",
    timestamp: "2026-04-08T20:30:00",
    likes: 89,
    comments: 34,
  },
  {
    id: 6,
    userId: 7,
    userName: "오태민",
    userAvatar: "오태",
    type: "started_course",
    content: "Flutter 앱 개발 과정을 시작했습니다. 크로스플랫폼 개발 역량을 키워보겠습니다.",
    timestamp: "2026-04-08T18:00:00",
    likes: 12,
    comments: 5,
    courseTitle: "Flutter 앱 개발 완성",
  },
  {
    id: 7,
    userId: 5,
    userName: "정우진",
    userAvatar: "정우",
    type: "completed_course",
    content: "Docker와 Kubernetes 실전 가이드를 완료했습니다. 컨테이너 오케스트레이션의 핵심을 배웠습니다.",
    timestamp: "2026-04-08T16:45:00",
    likes: 33,
    comments: 9,
    courseTitle: "Docker와 Kubernetes 실전 가이드",
  },
  {
    id: 8,
    userId: 9,
    userName: "양준서",
    userAvatar: "양준",
    type: "earned_badge",
    content: "'보안 전문가' 배지를 획득했습니다. 보안 관련 심화 과정을 모두 이수했습니다.",
    timestamp: "2026-04-08T14:20:00",
    likes: 56,
    comments: 15,
  },
  {
    id: 9,
    userId: 10,
    userName: "신예지",
    userAvatar: "신예",
    type: "shared_project",
    content: "GCP 기반 서버리스 아키텍처 구축 사례를 공유합니다. Cloud Run과 Cloud Functions를 활용했습니다.",
    timestamp: "2026-04-08T12:00:00",
    likes: 78,
    comments: 27,
  },
  {
    id: 10,
    userId: 11,
    userName: "류동혁",
    userAvatar: "류동",
    type: "posted_discussion",
    content: "E2E 테스트 자동화 전략에 대한 의견을 나누고 싶습니다. Cypress vs Playwright 비교 분석입니다.",
    timestamp: "2026-04-08T10:30:00",
    likes: 41,
    comments: 19,
  },
  {
    id: 11,
    userId: 2,
    userName: "이수민",
    userAvatar: "이수",
    type: "started_course",
    content: "TypeScript 심화 과정을 시작했습니다. 타입 시스템을 깊이 이해하고 싶습니다.",
    timestamp: "2026-04-07T21:15:00",
    likes: 18,
    comments: 4,
    courseTitle: "TypeScript 심화: 타입 시스템 완벽 이해",
  },
  {
    id: 12,
    userId: 4,
    userName: "최유나",
    userAvatar: "최유",
    type: "shared_project",
    content: "Python으로 구현한 추천 시스템 프로젝트를 공유합니다. 협업 필터링과 콘텐츠 기반 필터링을 결합했습니다.",
    timestamp: "2026-04-07T19:00:00",
    likes: 92,
    comments: 31,
  },
  {
    id: 13,
    userId: 8,
    userName: "김하린",
    userAvatar: "김하",
    type: "completed_course",
    content: "딥러닝 자연어 처리 과정을 수료했습니다. Transformer 구현부터 파인튜닝까지 정말 알찼습니다.",
    timestamp: "2026-04-07T15:40:00",
    likes: 104,
    comments: 28,
    courseTitle: "딥러닝 자연어 처리(NLP)",
  },
  {
    id: 14,
    userId: 6,
    userName: "한서영",
    userAvatar: "한서",
    type: "earned_badge",
    content: "'디자인 마스터' 배지를 획득했습니다. 디자인 관련 과정 3개를 우수한 성적으로 수료했습니다.",
    timestamp: "2026-04-07T13:20:00",
    likes: 37,
    comments: 11,
  },
  {
    id: 15,
    userId: 3,
    userName: "박성호",
    userAvatar: "박성",
    type: "joined_group",
    content: "'백엔드 아키텍처 연구회' 그룹에 참여했습니다.",
    timestamp: "2026-04-07T11:00:00",
    likes: 21,
    comments: 6,
  },
];
