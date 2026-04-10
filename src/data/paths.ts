export interface LearningPath {
  id: number;
  title: string;
  description: string;
  coursesCount: number;
  duration: string;
  level: string;
  progress?: number;
  courses: number[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "프론트엔드 개발자 로드맵",
    description: "React와 TypeScript를 기반으로 현대적인 웹 프론트엔드 개발 역량을 체계적으로 쌓아갑니다. 기초 문법부터 성능 최적화, 풀스택 개발까지 다룹니다.",
    coursesCount: 3,
    duration: "106시간",
    level: "초급 ~ 중급",
    progress: 65,
    courses: [1, 3, 7],
  },
  {
    id: 2,
    title: "AI/ML 엔지니어 로드맵",
    description: "데이터 분석부터 딥러닝, 자연어 처리까지 AI 엔지니어에게 필요한 핵심 역량을 단계별로 학습합니다.",
    coursesCount: 3,
    duration: "133시간",
    level: "초급 ~ 고급",
    progress: 30,
    courses: [2, 5, 12],
  },
  {
    id: 3,
    title: "DevOps 엔지니어 로드맵",
    description: "컨테이너 기술, 클라우드 아키텍처, 보안까지 DevOps 엔지니어에게 필요한 인프라 전반의 지식을 학습합니다.",
    coursesCount: 3,
    duration: "136시간",
    level: "중급 ~ 고급",
    courses: [6, 8, 10],
  },
  {
    id: 4,
    title: "풀스택 개발자 로드맵",
    description: "프론트엔드와 백엔드 모두를 아우르는 풀스택 개발 역량을 키웁니다. Next.js 풀스택 개발과 Spring Boot 백엔드를 함께 학습합니다.",
    coursesCount: 3,
    duration: "124시간",
    level: "중급",
    progress: 10,
    courses: [1, 4, 7],
  },
];
