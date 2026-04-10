# GrowAI All-in-One Platform

> **growai.co.kr** - 단일 도메인에서 9개 AI 서비스를 통합 운영하는 올인원 플랫폼

## 아키텍처

```
growai.co.kr
├── /              → Portal (서비스 허브)
├── /learnform     → LearnForm AI E-Learning
├── /lms/*         → Learning Management System (11개 페이지)
├── /map           → Manufacturing AI Platform
├── /vls           → Video Lecture System
├── /vas           → Video Auto Summary
├── /ccb           → Customer Care Bot
├── /ccs           → Claude Code Skill
├── /cdn           → Content Delivery Network
└── /cms           → Construction Management System
```

## TLA 서비스 매트릭스

| 분류 | TLA | 서비스 풀네임 | 핵심 가치 |
|------|-----|--------------|----------|
| 제조 | **MAP** | Manufacturing AI Platform | 생산 공정의 지능화 |
| 교육 | **LMS** | Learning Management System | 교육 운영의 디지털화 |
| 영상 | **VLS** | Video Lecture System | 시공간 제약 없는 교육 |
| 요약 | **VAS** | Video Auto Summary | 학습 효율의 극대화 |
| 상담 | **CCB** | Customer Care Bot | 글로벌 고객 소통 혁신 |
| 개발 | **CCS** | Claude Code Skill | 개발 생산성의 도약 |
| 전송 | **CDN** | Content Delivery Network | 끊김 없는 미디어 경험 |
| 건설 | **CMS** | Construction Management System | 현장 관리의 스마트화 |

## 기술 스택

### Frontend
| 기술 | 버전 | 역할 |
|------|------|------|
| React | 19.0.0 | UI 라이브러리 |
| Vite | 6.2.0 | 빌드 도구 + HMR 개발 서버 |
| TypeScript | 5.8.2 | 타입 안전성 (strict) |
| React Router | 7.14.0 | SPA 클라이언트 라우팅 |
| Tailwind CSS | 4.1.14 | 유틸리티 기반 스타일링 |
| TanStack Query | 5.97.0 | 비동기 상태 관리 |
| Motion | 12.23.24 | 애니메이션 |
| Lucide React | 0.546.0 | 아이콘 시스템 |
| i18next | 26.0.4 | 다국어 (한/영) |
| Google GenAI | 1.29.0 | Gemini AI 통합 |

### 인프라
| 기술 | 역할 |
|------|------|
| Docker | 3-stage 멀티스테이지 빌드 |
| Nginx | 정적 파일 서빙 + SPA fallback |
| GCP Cloud Run | 컨테이너 호스팅 |
| PostgreSQL | 데이터베이스 |
| Redis | 캐시 |

### 테스트 / 코드 품질
| 기술 | 역할 |
|------|------|
| Vitest | 단위 테스트 |
| Playwright | E2E 테스트 |
| ESLint + Prettier | 린팅 + 포맷팅 |

## 공통 UI 프레임워크

### ThemeContext
- 다크모드 토글 (html.dark 클래스)
- 5가지 액센트 컬러: Teal / Blue / Purple / Orange / Green
- CSS 변수 기반 동적 테마 (`--primary`, `--primary-dark`)

### LanguageContext
- 한국어/영어 실시간 전환
- Translations 타입 시스템으로 타입 안전한 번역

### 공통 컴포넌트
- **Button** - 4 variants (primary/secondary/outline/ghost), 3 sizes
- **Badge** - 4 variants (primary/success/warning/info)
- **Avatar** - 해시 기반 컬러 이니셜
- **Tabs** - 애니메이션 슬라이딩 인디케이터
- **SearchBar** - 반응형 검색
- **ScrollToTop** - 플로팅 스크롤 버튼

### 섹션 컴포넌트 (LearnForm 재사용)
Hero, Features, Showcase, Workflow, Solutions, Testimonials, Privacy, Pricing, FAQ, Download, CTA, Integrations

### 도메인 컴포넌트 (LMS 전용)
CourseCard, CourseGrid, LearningPathCard, RatingStars, ActivityFeed, DiscussionCard, LeaderboardRow, ProjectCard, UserProfileCard

## CI / 브랜드 아이덴티티

- **로고**: 월계수 잎 SVG (34x34, 코발트 블루 그라디언트)
- **의미**: "하나의 잎, 하나의 길. 배움은 단순함에서 시작된다."
- **Primary Color**: `#14a1c8` (Teal)
- **Font**: Pretendard + Inter

## 프로젝트 구조

```
GrowAI-ALL-ONE/
├── docs/                     # 프로젝트 문서 7개
├── src/
│   ├── App.tsx               # 통합 라우터 (9개 서비스)
│   ├── contexts/             # Theme + Language Context
│   ├── i18n/                 # 한/영 번역
│   ├── components/
│   │   ├── layout/           # Header, Footer, TopNav, Layout, Logo, Mobile, Profile
│   │   ├── sections/         # 랜딩 섹션 12개
│   │   ├── ui/               # Button, Badge, ScrollToTop
│   │   ├── common/           # Avatar, SearchBar, Tabs, SectionHeading
│   │   ├── course/           # CourseCard, CourseGrid, RatingStars
│   │   └── social/           # ActivityFeed, Discussion, Leaderboard, Project
│   ├── pages/
│   │   ├── PortalPage.tsx    # 포털 허브 (/)
│   │   ├── ServicePlaceholder.tsx
│   │   ├── learnform/        # /learnform
│   │   └── lms/              # /lms/* (11개 페이지)
│   ├── data/                 # 목업 데이터
│   └── hooks/                # 커스텀 훅
├── package.json
├── vite.config.ts
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── Makefile
```

## 문서

| 문서 | 내용 |
|------|------|
| [01_통합전략_머지마이그레이션.md](docs/01_통합전략_머지마이그레이션.md) | 아키텍처, 소스 통합, 마이그레이션 4단계 |
| [02_라우팅정책_URL구조.md](docs/02_라우팅정책_URL구조.md) | growai.co.kr 라우트 테이블 |
| [03_공통UI프레임워크.md](docs/03_공통UI프레임워크.md) | Theme/Language Context, 컴포넌트 |
| [04_TLA서비스_정의서.md](docs/04_TLA서비스_정의서.md) | 8개 TLA 서비스 상세 + KPI |
| [05_CI_브랜드아이덴티티.md](docs/05_CI_브랜드아이덴티티.md) | 월계수 잎 로고, 컬러, 타이포 |
| [06_배포전략_인프라.md](docs/06_배포전략_인프라.md) | Docker, Nginx, GCP, CI/CD |
| [07_프로젝트구조_디렉토리맵.md](docs/07_프로젝트구조_디렉토리맵.md) | 전체 디렉토리 트리 |

## 빠른 시작

```bash
# 의존성 설치
npm install --legacy-peer-deps

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# Docker 실행
docker build -t growai-all-one .
docker run -p 3000:8080 growai-all-one
```

## 소스 통합 출처

| 원본 프로젝트 | 경로 | 통합 대상 |
|--------------|------|----------|
| LearnForm V2 | `/home/desktop/learnform/V2/` | 랜딩 페이지, 섹션 컴포넌트, 테마, i18n |
| GrowAI-LMS V4 | `/home/desktop/project/GrowAI-LMS/V4/growai-lms/` | LMS 페이지, 도메인 컴포넌트, 데이터, 라우팅 |

---

**NEWKL Inc.** | help@newkl.net | Korea Polytechnics
