export interface Discussion {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  content: string;
  replies: number;
  views: number;
  likes: number;
  createdAt: string;
  tags: string[];
}

export const discussions: Discussion[] = [
  {
    id: 1,
    title: "React Server Components 실무 적용 경험 공유",
    author: "이수민",
    authorAvatar: "이수",
    category: "프론트엔드",
    content: "최근 프로젝트에서 React Server Components를 도입했습니다. 초기 로딩 속도가 크게 개선되었지만, 클라이언트 상태 관리와의 경계 설정에서 고민이 있었습니다. 여러분의 경험은 어떠셨나요?",
    replies: 23,
    views: 1245,
    likes: 67,
    createdAt: "2026-04-08",
    tags: ["React", "Server Components", "성능 최적화"],
  },
  {
    id: 2,
    title: "Transformer 아키텍처 Attention 메커니즘 최적화 방법",
    author: "김하린",
    authorAvatar: "김하",
    category: "인공지능",
    content: "대규모 언어 모델에서 Attention 연산의 메모리 효율성을 개선하는 방법에 대해 논의하고 싶습니다. Flash Attention, Multi-Query Attention 등 다양한 접근법의 장단점을 비교해봅시다.",
    replies: 34,
    views: 2130,
    likes: 89,
    createdAt: "2026-04-08",
    tags: ["Transformer", "NLP", "최적화", "딥러닝"],
  },
  {
    id: 3,
    title: "Kubernetes 클러스터 모니터링 구축 사례",
    author: "정우진",
    authorAvatar: "정우",
    category: "DevOps",
    content: "Prometheus와 Grafana를 활용한 Kubernetes 클러스터 모니터링 시스템 구축 사례를 공유합니다. 알림 설정부터 대시보드 구성까지의 과정을 정리했습니다.",
    replies: 18,
    views: 987,
    likes: 45,
    createdAt: "2026-04-07",
    tags: ["Kubernetes", "모니터링", "Prometheus", "Grafana"],
  },
  {
    id: 4,
    title: "E2E 테스트 자동화 전략: Cypress vs Playwright",
    author: "류동혁",
    authorAvatar: "류동",
    category: "테스트",
    content: "프론트엔드 E2E 테스트 도구로 Cypress와 Playwright를 모두 사용해본 경험을 바탕으로 비교 분석을 공유합니다. 프로젝트 규모와 요구사항에 따른 선택 기준을 논의해봅시다.",
    replies: 19,
    views: 1456,
    likes: 41,
    createdAt: "2026-04-08",
    tags: ["테스트", "Cypress", "Playwright", "자동화"],
  },
  {
    id: 5,
    title: "디자인 시스템 구축 시 개발자와의 협업 방법",
    author: "한서영",
    authorAvatar: "한서",
    category: "디자인",
    content: "디자인 시스템을 구축하면서 개발팀과 효과적으로 협업하는 방법에 대해 이야기하고 싶습니다. Figma 토큰 관리, 컴포넌트 네이밍 규칙, 문서화 전략 등을 함께 논의해봅시다.",
    replies: 15,
    views: 876,
    likes: 52,
    createdAt: "2026-04-06",
    tags: ["디자인 시스템", "협업", "Figma", "컴포넌트"],
  },
  {
    id: 6,
    title: "제로 트러스트 보안 모델 도입 가이드",
    author: "양준서",
    authorAvatar: "양준",
    category: "보안",
    content: "기존 경계 기반 보안에서 제로 트러스트 모델로 전환하는 과정에서의 핵심 고려사항을 정리했습니다. 인증, 네트워크 세분화, 지속적 검증의 구체적인 구현 방법을 논의합니다.",
    replies: 21,
    views: 1102,
    likes: 58,
    createdAt: "2026-04-05",
    tags: ["보안", "제로 트러스트", "네트워크", "인증"],
  },
];
