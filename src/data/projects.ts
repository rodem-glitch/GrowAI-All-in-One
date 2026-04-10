export interface Project {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  description: string;
  thumbnail: string;
  likes: number;
  views: number;
  tags: string[];
  createdAt: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI 기반 실시간 번역 채팅 앱",
    author: "김하린",
    authorAvatar: "김하",
    description: "GPT API와 WebSocket을 활용하여 실시간 다국어 번역 채팅 애플리케이션을 구현했습니다. 10개 언어를 지원합니다.",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    likes: 234,
    views: 1890,
    tags: ["AI", "NLP", "WebSocket", "React"],
    createdAt: "2026-04-05",
  },
  {
    id: 2,
    title: "마이크로서비스 주문 관리 시스템",
    author: "박성호",
    authorAvatar: "박성",
    description: "Spring Boot 기반 마이크로서비스 아키텍처로 구현한 주문 관리 시스템입니다. Kafka를 활용한 이벤트 기반 통신을 적용했습니다.",
    thumbnail: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    likes: 187,
    views: 1420,
    tags: ["Spring Boot", "Kafka", "마이크로서비스", "Docker"],
    createdAt: "2026-04-03",
  },
  {
    id: 3,
    title: "반응형 디자인 시스템 컴포넌트 라이브러리",
    author: "한서영",
    authorAvatar: "한서",
    description: "Figma에서 설계하고 React로 구현한 디자인 시스템입니다. 접근성 기준을 준수하며 다크 모드를 지원합니다.",
    thumbnail: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
    likes: 156,
    views: 2340,
    tags: ["디자인 시스템", "React", "접근성", "Storybook"],
    createdAt: "2026-03-28",
  },
  {
    id: 4,
    title: "서버리스 이미지 처리 파이프라인",
    author: "신예지",
    authorAvatar: "신예",
    description: "GCP Cloud Functions와 Cloud Storage를 활용한 자동 이미지 리사이징 및 최적화 파이프라인입니다.",
    thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    likes: 98,
    views: 876,
    tags: ["GCP", "서버리스", "Cloud Functions", "이미지 처리"],
    createdAt: "2026-03-25",
  },
  {
    id: 5,
    title: "Flutter 가계부 앱",
    author: "오태민",
    authorAvatar: "오태",
    description: "Flutter로 개발한 크로스플랫폼 가계부 앱입니다. 차트 시각화와 카테고리별 분석 기능을 제공합니다.",
    thumbnail: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    likes: 145,
    views: 1230,
    tags: ["Flutter", "Dart", "모바일", "차트"],
    createdAt: "2026-03-20",
  },
  {
    id: 6,
    title: "네트워크 침투 테스트 자동화 도구",
    author: "양준서",
    authorAvatar: "양준",
    description: "Python 기반 네트워크 취약점 스캔 및 침투 테스트 자동화 도구입니다. 보고서 자동 생성 기능을 포함합니다.",
    thumbnail: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    likes: 203,
    views: 1650,
    tags: ["보안", "Python", "자동화", "네트워크"],
    createdAt: "2026-03-18",
  },
  {
    id: 7,
    title: "데이터 기반 영화 추천 시스템",
    author: "최유나",
    authorAvatar: "최유",
    description: "협업 필터링과 콘텐츠 기반 필터링을 결합한 하이브리드 추천 시스템입니다. MovieLens 데이터셋을 활용했습니다.",
    thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    likes: 178,
    views: 1980,
    tags: ["추천 시스템", "Python", "머신러닝", "데이터 분석"],
    createdAt: "2026-03-15",
  },
  {
    id: 8,
    title: "E2E 테스트 프레임워크 커스텀 플러그인",
    author: "류동혁",
    authorAvatar: "류동",
    description: "Playwright 기반 커스텀 테스트 프레임워크입니다. 시각적 회귀 테스트와 성능 측정 플러그인을 포함합니다.",
    thumbnail: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    likes: 112,
    views: 945,
    tags: ["테스트", "Playwright", "자동화", "QA"],
    createdAt: "2026-03-10",
  },
];
