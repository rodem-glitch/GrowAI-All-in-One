# NEWKL GrowAI Platform 개발 표준 종합보고서

> **문서 분류**: MASTER Document — 전사 개발 표준 기준 문서
> **작성일**: 2026-04-10
> **대상**: 경영진, 기술 리더십, 전체 개발팀
> **버전**: v1.0

---

## CEO Executive Summary

### NEWKL의 비전

**"Global No.1 AI Video Generation Company"**

NEWKL 주식회사는 AI 영상 생성 기술을 핵심 역량으로, 교육 콘텐츠 자동화 시장의 글로벌 리더가 되고자 합니다. GrowAI Platform은 이 비전의 기술적 구현체이자, 시장에 보여주는 첫 번째 증거입니다.

### 핵심 성과 지표

| 지표 | 기존 | GrowAI 적용 후 | 개선율 |
|------|------|---------------|--------|
| **팀 생산성** | 20인 팀 | 1인 = 20인 팀 | **20배** |
| **개발 기간** | 6개월 | 2개월 | **67% 단축** |
| **인프라 비용** | $3,500/월 | $1,000/월 | **70% 절감** |
| **성능 점수** | Lighthouse 65점 | Lighthouse **100점** | 목표 달성 |

### 기술 혁신 포인트

- **Next.js 16+ Streaming UI**: 서버 컴포넌트 + 스트리밍 렌더링으로 초고속 사용자 경험
- **Agentic AI Architecture**: LangGraph 기반 자율 에이전트가 콘텐츠 생성 전 과정을 오케스트레이션
- **gstack CLI** (by Garry Tan, Y Combinator CEO): 10~15개 병렬 스프린트를 단일 개발자가 관리하는 혁신적 워크플로우 (Source: https://github.com/garrytan/gstack)

### 투자 효과

- MVP 단계: **월 $1,000** 으로 시작 가능
- 스케일업: 사용량 기반 자동 확장, 유휴 비용 $0
- ROI: 6개월 내 투자 대비 **5배 이상** 가치 창출 예상

> **"NEWKL의 웹사이트는 AI 영상 생성 기술력의 첫 번째 증거이다."**
>
> 우리가 만드는 플랫폼의 완성도가 곧 우리의 기술력을 증명합니다.
> 세계 최고 수준의 웹 성능, 최첨단 AI 아키텍처, 그리고 극한의 생산성 —
> 이 세 가지가 GrowAI Platform을 통해 시장에 전달되는 NEWKL의 메시지입니다.

---

## 1. 프로젝트 개요

### 1.1 회사 정보

| 항목 | 내용 |
|------|------|
| **회사명** | NEWKL 주식회사 (뉴클) |
| **설립 비전** | Global No.1 AI Video Generation Company |
| **핵심 역량** | AI 영상 생성, 교육 콘텐츠 자동화, Agentic AI 워크플로우 |

### 1.2 프로젝트 정보

| 항목 | 내용 |
|------|------|
| **프로젝트명** | GrowAI Platform |
| **서비스 도메인** | growai.co.kr |
| **주요 고객** | Korea Polytechnics (한국폴리텍대학) |
| **서비스 목표** | AI 기반 이러닝 콘텐츠 자동 생성 플랫폼 |
| **교육 모델** | CREATOR 7단계 + FKDS 순환 모델 |

### 1.3 9개 TLA 서비스 매트릭스

GrowAI Platform은 9개의 핵심 서비스(TLA: Three-Letter Acronym)로 구성됩니다.

| # | 서비스 코드 | 서비스명 | 설명 |
|---|-----------|---------|------|
| 1 | **CMS** | Content Management System | 교육 콘텐츠 통합 관리 |
| 2 | **LMS** | Learning Management System | 학습 과정 관리 및 추적 |
| 3 | **VGS** | Video Generation Service | AI 영상 자동 생성 |
| 4 | **AIS** | AI Service Layer | AI 모델 오케스트레이션 |
| 5 | **IDP** | Identity Provider | 인증/인가 통합 관리 |
| 6 | **ANL** | Analytics Service | 학습 분석 및 리포팅 |
| 7 | **NTF** | Notification Service | 알림 및 메시징 |
| 8 | **STR** | Storage Service | 미디어 자산 저장/관리 |
| 9 | **GWY** | API Gateway | 통합 API 게이트웨이 |

### 1.4 CREATOR 7단계 모델

```
C(Concept)     → 교육 콘셉트 수립
R(Route)       → 학습 경로 설계
E(Experience)  → 학습 경험 설계
A(Artifact)    → 산출물 생성 (AI 자동화)
T(Transform)   → 변화 적용
O(Operate)     → 최적 운영
R(Reflect)     → 성찰 및 개선
```

### 1.5 FKDS 순환 모델

```
F(Feeling)  → 감성적 동기 부여, 학습 몰입 유도
K(Knowing)  → 지식 전달, 개념 이해
D(Doing)    → 실습, 과제, 프로젝트 수행
S(Sharing)  → 학습 결과 공유, 피드백 순환

※ S → F로 다시 순환하여 지속적 성장 유도
```

---

## 2. 기술 스택 표준

### 2.1 프론트엔드 (UI Layer)

| 기술 | 버전 | 용도 | 선택 근거 |
|------|------|------|----------|
| **Next.js** | 16+ | 풀스택 프레임워크 | RSC + Streaming + Edge 지원 |
| **React** | 19+ | UI 라이브러리 | 서버 컴포넌트, use() 훅 |
| **Tailwind CSS** | 4.x | 유틸리티 CSS | Zero-runtime, JIT 컴파일 |
| **Shadcn UI** | latest | 컴포넌트 라이브러리 | 완전한 커스터마이징, 복사-붙여넣기 방식 |
| **TypeScript** | 5.x (strict) | 타입 시스템 | 컴파일 타임 안전성 보장 |
| **Zustand** | 5.x | 상태 관리 | 경량, 보일러플레이트 최소화 |

### 2.2 백엔드 (API / Logic Layer)

| 기술 | 버전 | 용도 | 선택 근거 |
|------|------|------|----------|
| **Go** | 1.23+ | SSE 스트리밍 서버 | 고성능 동시성, 낮은 메모리 사용 |
| **NestJS** | 11.x | REST/GraphQL API | 엔터프라이즈급 구조화, DI 지원 |
| **FastAPI** | 0.115+ | AI 파이프라인 API | Python AI 생태계 직접 연동 |
| **SQLAlchemy** | 2.0+ | Python ORM | 비동기 지원, 타입 안전성 |
| **Pydantic** | v2 | 데이터 검증 | 고성능 직렬화/역직렬화 |

### 2.3 AI / Agent Layer

| 기술 | 용도 | 비고 |
|------|------|------|
| **Gemini 2.5 Pro** | 주력 LLM (텍스트/멀티모달) | 100만 토큰 컨텍스트 |
| **Claude 3.5 Sonnet** | 코드 생성, 분석 | 코드 품질 최적화 |
| **Veo 3.1** | AI 영상 생성 | NEWKL 핵심 기술 |
| **LangGraph** | 에이전트 오케스트레이션 | 상태 머신 기반 워크플로우 |
| **MCP** | Model Context Protocol | 도구 호출 표준화 |
| **Vector DB** | 임베딩 검색 | AlloyDB pgvector 활용 |

### 2.4 인프라 (Infrastructure Layer)

| 기술 | 용도 | 비고 |
|------|------|------|
| **Cloud Run** | 컨테이너 서비스 | 서버리스, 자동 스케일링 |
| **L4 GPU** | AI 추론 가속 | Cloud Run GPU 지원 |
| **AlloyDB** | PostgreSQL 호환 DB | 고성능, pgvector 내장 |
| **Cloud CDN** | 콘텐츠 전송 | 글로벌 엣지 캐싱 |
| **Memorystore** | Redis 호환 캐시 | 세션, 큐, 캐시 통합 |
| **Cloud Storage** | 오브젝트 스토리지 | 미디어 파일 저장 |
| **Artifact Registry** | 컨테이너 이미지 | Docker 이미지 저장소 |

---

## 3. 아키텍처

### 3.1 4계층 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                   CLIENT LAYER                          │
│  Next.js 16+ App Router │ RSC │ Streaming │ Edge       │
│  Shadcn UI │ Tailwind 4 │ Zustand │ TypeScript         │
├─────────────────────────────────────────────────────────┤
│                   API LAYER                             │
│  API Gateway (GWY) │ NestJS REST │ Go SSE │ gRPC       │
│  JWT Auth │ Rate Limiting │ Request Validation          │
├─────────────────────────────────────────────────────────┤
│                   LOGIC LAYER                           │
│  CREATOR Engine │ FKDS Designer │ Generator Engine      │
│  LangGraph Agents │ MCP Tools │ Celery Workers          │
├─────────────────────────────────────────────────────────┤
│                   DATA LAYER                            │
│  AlloyDB (pgvector) │ Memorystore │ Cloud Storage       │
│  Cloud CDN │ Vector Embeddings │ Media Assets           │
└─────────────────────────────────────────────────────────┘
```

### 3.2 핵심 엔진 구성

#### CREATOR Engine

CREATOR 7단계를 자동화하는 AI 오케스트레이션 엔진입니다.

```
[사용자 입력] → C(콘셉트 분석) → R(경로 생성) → E(경험 설계)
                                                      ↓
[완성 콘텐츠] ← R(성찰/개선) ← O(배포/운영) ← T(변환) ← A(산출물 생성)
```

- 각 단계는 LangGraph 노드로 구현
- Human-in-the-Loop: A(산출물 생성) 전후에 사람 검토 필수
- 상태 저장: AlloyDB에 워크플로우 상태 영속화

#### FKDS Designer

학습 경험 설계를 FKDS 모델에 따라 자동 구성합니다.

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Feeling  │───→│ Knowing  │───→│  Doing   │───→│ Sharing  │
│ 감성 설계 │    │ 지식 설계 │    │ 실습 설계 │    │ 공유 설계 │
└──────────┘    └──────────┘    └──────────┘    └─────┬────┘
      ↑                                              │
      └──────────────── 순환 피드백 ──────────────────┘
```

#### Generator Engine

AI 영상 및 콘텐츠를 실제로 생성하는 엔진입니다.

```
[스크립트] → [장면 분할] → [Veo 3.1 영상 생성] → [편집/합성] → [최종 출력]
                  ↓                                    ↑
            [에셋 생성]      →     [음성 합성]     ───→┘
```

### 3.3 데이터 흐름 다이어그램

```
사용자 브라우저
    │
    ▼
Cloud CDN (정적 자산 캐싱)
    │
    ▼
Cloud Run: Next.js (RSC + Streaming)
    │
    ├──→ Cloud Run: NestJS API ──→ AlloyDB (CRUD)
    │         │
    │         └──→ Cloud Run: Go SSE (실시간 스트리밍)
    │
    └──→ Cloud Run: FastAPI ──→ LangGraph Agent
              │                       │
              ├──→ Gemini 2.5 Pro     ├──→ Vector DB (검색)
              ├──→ Claude 3.5         ├──→ MCP Tools
              └──→ Veo 3.1           └──→ Celery + Redis (비동기 작업)
                      │
                      ▼
                Cloud Storage (미디어 저장)
```

---

## 4. 개발 방법론

### 4.1 gstack 기반 애자일 스프린트

gstack은 Garry Tan(Y Combinator CEO)이 만든 AI 시대의 개발 방법론 CLI 도구로, NEWKL이 표준으로 채택하였습니다.
1인 개발자가 10~15개의 병렬 스프린트를 효율적으로 관리할 수 있게 설계되었습니다.

> **Source**: https://github.com/garrytan/gstack
>
> **설치**: `npm install -g gstack` (https://github.com/garrytan/gstack 참조)

### 4.2 스프린트 사이클: 7단계

```
Think → Plan → Build → Review → Test → Ship → Reflect
  ↑                                                 │
  └────────────────── 다음 사이클 ──────────────────┘
```

| 단계 | 활동 | 산출물 | 소요 시간 |
|------|------|--------|----------|
| **Think** | 문제 정의, 요구사항 분석 | 이슈 카드 | 0.5일 |
| **Plan** | 기술 설계, 태스크 분해 | 설계 문서 | 0.5일 |
| **Build** | 코드 구현, AI 에이전트 활용 | 구현 코드 | 1~3일 |
| **Review** | 코드 리뷰, AI 코드 검증 | 리뷰 피드백 | 0.5일 |
| **Test** | 자동 테스트, 수동 QA | 테스트 리포트 | 0.5일 |
| **Ship** | CI/CD 배포, 모니터링 확인 | 배포 완료 | 0.5일 |
| **Reflect** | 회고, 개선점 도출 | 회고 노트 | 0.5일 |

### 4.3 병렬 스프린트 운영

```
Week 1       Week 2       Week 3       Week 4
┌─Sprint A──────────────┐
├─Sprint B──────────┐   │
├─Sprint C──────┐   │   │
│               │   │   │
├─Sprint D──────────────────────────┐
├─Sprint E──────────────┐          │
│  ...                  │          │
├─Sprint N──────────────────────────────────┐
└───────────────────────────────────────────┘

※ 최대 10~15개 스프린트가 동시 진행
※ gstack CLI로 상태 추적 및 컨텍스트 전환 관리
```

### 4.4 AI 페어 프로그래밍

| 역할 | 담당 | 설명 |
|------|------|------|
| **설계자** | 인간 개발자 | 아키텍처 결정, 비즈니스 로직 판단 |
| **구현자** | AI 에이전트 (Claude, Gemini) | 코드 생성, 테스트 작성, 문서화 |
| **검증자** | 인간 + AI | Human-in-the-Loop 검증 |

---

## 5. 개발 표준

### 5.1 코드 컨벤션

#### TypeScript / JavaScript

```typescript
// 파일명: kebab-case (예: user-profile.tsx)
// 컴포넌트: PascalCase (예: UserProfile)
// 함수/변수: camelCase (예: getUserProfile)
// 상수: UPPER_SNAKE_CASE (예: MAX_RETRY_COUNT)
// 타입/인터페이스: PascalCase + 접두사 없음 (예: UserProfile, not IUserProfile)

// strict 모드 필수
// any 사용 금지 — unknown + 타입 가드 사용
// 모든 함수에 반환 타입 명시
```

#### Python

```python
# ruff + mypy 필수 적용
# 라인 길이: 100자 제한
# 파일명: snake_case (예: user_profile.py)
# 클래스: PascalCase (예: UserProfile)
# 함수/변수: snake_case (예: get_user_profile)
# 상수: UPPER_SNAKE_CASE (예: MAX_RETRY_COUNT)
# 타입 힌트 100% 적용
# docstring: Google 스타일
```

#### Go

```go
// gofmt + golangci-lint 필수
// 패키지명: lowercase (예: userprofile)
// 내보내기: PascalCase (예: GetUserProfile)
// 비공개: camelCase (예: getUserProfile)
// 에러 처리: 반드시 명시적 처리 (if err != nil)
// 고루틴: context 전파 필수
```

### 5.2 API 설계 표준

#### RESTful API 규칙

```
# 리소스 명명: 복수형 명사
GET    /api/v1/courses          # 목록 조회
GET    /api/v1/courses/:id      # 단건 조회
POST   /api/v1/courses          # 생성
PATCH  /api/v1/courses/:id      # 부분 수정
DELETE /api/v1/courses/:id      # 삭제

# 페이지네이션
GET /api/v1/courses?page=1&limit=20&sort=-created_at

# 필터링
GET /api/v1/courses?status=active&category=ai

# 응답 형식 (표준 Envelope)
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 100 },
  "error": null
}
```

#### 에러 응답 표준

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "COURSE_NOT_FOUND",
    "message": "요청한 과정을 찾을 수 없습니다.",
    "details": { "courseId": "abc-123" }
  }
}
```

#### SSE 스트리밍 표준

```
# Go SSE 서버 엔드포인트
GET /api/v1/stream/generation/:taskId

# 이벤트 형식
event: progress
data: {"step": "script_generation", "percent": 35, "message": "스크립트 생성 중..."}

event: complete
data: {"taskId": "abc-123", "resultUrl": "https://..."}

event: error
data: {"code": "GENERATION_FAILED", "message": "영상 생성 실패"}
```

### 5.3 Git 전략

#### 브랜치 구조

```
main              ← 프로덕션 배포 브랜치
  └── develop     ← 개발 통합 브랜치
       ├── feat/CMS-001-user-auth      ← 기능 개발
       ├── feat/VGS-042-video-export   ← 기능 개발
       ├── fix/LMS-013-score-calc      ← 버그 수정
       ├── refactor/AIS-007-prompt     ← 리팩토링
       └── docs/update-api-spec        ← 문서 업데이트
```

#### 커밋 메시지 규칙

```
<type>(<scope>): <subject>

feat(VGS): 영상 내보내기 해상도 선택 기능 추가
fix(LMS): 점수 계산 시 소수점 반올림 오류 수정
refactor(AIS): 프롬프트 체인 구조 개선
docs(API): 영상 생성 API 명세 업데이트
test(CMS): 콘텐츠 CRUD 단위 테스트 추가
perf(GWY): API 응답 캐싱 레이어 적용
chore(infra): Cloud Run 메모리 설정 조정
```

#### PR 규칙

- PR 제목: 커밋 메시지 규칙과 동일
- 본문: 변경 사유, 테스트 계획, 스크린샷 포함
- 리뷰어: 최소 1인 (AI 리뷰 + 인간 리뷰 병행)
- CI 통과 필수: lint + type-check + test + build

### 5.4 디렉토리 구조 표준

#### Next.js 프론트엔드

```
apps/web/
├── src/
│   ├── app/                    # App Router 페이지
│   │   ├── (auth)/             # 인증 그룹 라우트
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/        # 대시보드 그룹 라우트
│   │   │   ├── courses/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/             # 공유 컴포넌트
│   │   ├── ui/                 # Shadcn UI 기본 컴포넌트
│   │   ├── forms/              # 폼 컴포넌트
│   │   ├── layouts/            # 레이아웃 컴포넌트
│   │   └── features/           # 도메인별 컴포넌트
│   ├── hooks/                  # 커스텀 훅
│   ├── lib/                    # 유틸리티, API 클라이언트
│   ├── stores/                 # Zustand 스토어
│   ├── i18n/                   # 다국어 리소스
│   └── mocks/                  # 테스트 목 데이터
├── e2e/                        # Playwright E2E 테스트
├── public/                     # 정적 자산
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

#### FastAPI 백엔드

```
apps/api/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/      # 라우트 핸들러
│   │       └── deps.py         # 의존성 주입
│   ├── chains/                 # LangChain LCEL 체인
│   ├── core/
│   │   ├── config.py           # 환경 설정
│   │   └── database.py         # DB 연결
│   ├── models/                 # SQLAlchemy 모델
│   ├── worker/                 # Celery 비동기 워커
│   └── main.py                 # 앱 엔트리포인트
├── alembic/                    # DB 마이그레이션
├── tests/                      # 테스트
└── pyproject.toml
```

### 5.5 테스트 전략

| 테스트 유형 | 도구 | 커버리지 목표 | 실행 시점 |
|------------|------|-------------|----------|
| **단위 테스트** | Vitest (TS), pytest (Py) | 80% 이상 | 커밋 시 |
| **통합 테스트** | Vitest + MSW, pytest | 70% 이상 | PR 시 |
| **E2E 테스트** | Playwright | 핵심 플로우 100% | 배포 전 |
| **성능 테스트** | Lighthouse CI | 100점 유지 | 배포 전 |
| **AI 출력 검증** | 커스텀 평가 프레임워크 | 품질 기준 통과 | 모델 업데이트 시 |

#### 테스트 파일 명명 규칙

```
# TypeScript
user-profile.test.ts          # 단위 테스트
user-profile.integration.test.ts  # 통합 테스트
login-flow.e2e.ts             # E2E 테스트

# Python
test_user_profile.py          # 단위 테스트
test_user_profile_integration.py  # 통합 테스트
```

---

## 6. 성능 목표

### 6.1 Lighthouse 100점 전략

| 카테고리 | 목표 | 달성 방법 |
|---------|------|----------|
| **Performance** | 100 | RSC 스트리밍, 이미지 최적화, 코드 스플리팅 |
| **Accessibility** | 100 | ARIA 레이블, 키보드 내비게이션, 색상 대비 |
| **Best Practices** | 100 | HTTPS, CSP 헤더, 최신 API 사용 |
| **SEO** | 100 | 메타태그, 구조화 데이터, 사이트맵 |

### 6.2 Core Web Vitals 목표

| 메트릭 | 설명 | 목표 | 업계 평균 |
|--------|------|------|----------|
| **LCP** | Largest Contentful Paint | **< 0.5s** | 2.5s |
| **INP** | Interaction to Next Paint | **< 50ms** | 200ms |
| **CLS** | Cumulative Layout Shift | **< 0.01** | 0.1 |
| **TTFB** | Time to First Byte | **< 50ms** | 800ms |
| **FCP** | First Contentful Paint | **< 0.3s** | 1.8s |

### 6.3 성능 최적화 기법

```
1. 서버 컴포넌트 기본 사용 → 클라이언트 JS 번들 최소화
2. Streaming SSR → 점진적 페이지 로딩
3. Edge Runtime → 사용자 근처 서버에서 렌더링
4. Cloud CDN → 정적 자산 글로벌 캐싱
5. 이미지 최적화 → WebP/AVIF 자동 변환, lazy loading
6. 폰트 최적화 → next/font, font-display: swap
7. Route Prefetching → 다음 페이지 미리 로드
8. 코드 스플리팅 → 동적 import()로 필요한 코드만 로드
```

### 6.4 성능 모니터링

- **실시간**: Cloud Monitoring 대시보드
- **CI/CD**: Lighthouse CI 자동 측정 (배포 차단 기준 설정)
- **사용자**: Web Vitals 실측 데이터 수집 (Analytics 연동)
- **알림**: 성능 저하 시 Slack/이메일 알림

---

## 7. 보안 표준

### 7.1 인증/인가

| 항목 | 구현 | 설명 |
|------|------|------|
| **SSO** | OAuth 2.0 + OIDC | Google, Microsoft 계정 통합 로그인 |
| **JWT** | Access + Refresh 토큰 | Access: 15분, Refresh: 7일 |
| **RBAC** | 역할 기반 접근 제어 | Admin, Instructor, Student, Viewer |
| **MFA** | TOTP 기반 2단계 인증 | 관리자 계정 필수 적용 |

### 7.2 데이터 보안

| 영역 | 조치 | 상세 |
|------|------|------|
| **전송 암호화** | TLS 1.3 | 모든 통신 HTTPS 필수 |
| **저장 암호화** | AES-256 | AlloyDB, Cloud Storage 기본 암호화 |
| **PII 보호** | 필드 레벨 암호화 | 이메일, 전화번호 등 개인정보 |
| **키 관리** | Secret Manager | API 키, DB 비밀번호 중앙 관리 |

### 7.3 웹 보안

```
# Content Security Policy (CSP) 설정
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://storage.googleapis.com;
  connect-src 'self' https://api.growai.co.kr;
  frame-ancestors 'none';

# 추가 보안 헤더
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 7.4 규정 준수

| 규정 | 적용 범위 | 주요 조치 |
|------|----------|----------|
| **PIPA** (개인정보보호법) | 한국 사용자 전체 | 개인정보 수집 동의, 파기 절차, 접근 기록 |
| **GDPR** | EU 사용자 (향후) | 데이터 이동권, 삭제권, DPO 지정 |
| **교육부 지침** | Korea Polytechnics | 학습 데이터 보관 기간, 접근 권한 관리 |

### 7.5 보안 감사

- 분기별 취약점 스캔 (OWASP ZAP)
- 연 1회 모의 침투 테스트
- 의존성 취약점 자동 감시 (Dependabot / Snyk)
- 코드 레벨 보안 분석 (CodeQL)

---

## 8. 배포 전략

### 8.1 Docker 3-Stage 빌드

```dockerfile
# Stage 1: Dependencies (캐싱 최적화)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Stage 2: Build (프로덕션 빌드)
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Stage 3: Runtime (최소 이미지)
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]

# 최종 이미지 크기: ~150MB (vs 기본 ~1.2GB)
```

### 8.2 Cloud Run 배포 구성

```yaml
# cloud-run-service.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: growai-web
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "1"
        autoscaling.knative.dev/maxScale: "20"
        run.googleapis.com/cpu-throttling: "false"
    spec:
      containerConcurrency: 100
      timeoutSeconds: 300
      containers:
        - image: REGION-docker.pkg.dev/PROJECT/growai/web:latest
          ports:
            - containerPort: 3000
          resources:
            limits:
              memory: "1Gi"
              cpu: "2"
          env:
            - name: NODE_ENV
              value: "production"
```

### 8.3 CI/CD 파이프라인

```
[Git Push] → [Cloud Build Trigger]
                    │
                    ▼
            ┌── Lint & Type Check ──┐
            │                       │
            ▼                       ▼
      Unit Tests              Security Scan
            │                       │
            └───────┬───────────────┘
                    ▼
              Build Docker Image
                    │
                    ▼
            Push to Artifact Registry
                    │
                    ▼
         ┌── Deploy to Staging ──┐
         │                       │
         ▼                       ▼
   E2E Tests              Lighthouse CI
         │                       │
         └───────┬───────────────┘
                 ▼
          Manual Approval (Production)
                 │
                 ▼
         Deploy to Production
                 │
                 ▼
         Health Check & Monitoring
```

### 8.4 배포 환경

| 환경 | 용도 | 배포 조건 | URL |
|------|------|----------|-----|
| **dev** | 개발 테스트 | 자동 (push to develop) | dev.growai.co.kr |
| **staging** | QA 검증 | 자동 (PR merge to main) | staging.growai.co.kr |
| **production** | 실 서비스 | 수동 승인 | growai.co.kr |

---

## 9. 마이그레이션 로드맵

### 9.1 5 Phase / 16주 계획

```
Phase 1 (1~3주)     Phase 2 (4~6주)     Phase 3 (7~10주)    Phase 4 (11~13주)   Phase 5 (14~16주)
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  Foundation  │──→│   Core UI    │──→│  AI Engine   │──→│ Integration  │──→│  Production  │
│  기반 구축    │   │  핵심 UI 개발 │   │  AI 엔진 구축 │   │  통합 및 QA   │   │  출시 및 안정화│
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

### Phase 1: Foundation (1~3주)

| 주차 | 작업 | 산출물 |
|------|------|--------|
| 1주 | 프로젝트 초기 설정, 개발 환경 구축 | 모노레포 구조, CI/CD 기본 파이프라인 |
| 2주 | 인프라 프로비저닝 (GCP) | AlloyDB, Cloud Run, CDN 설정 완료 |
| 3주 | 인증 시스템 구축 (IDP) | SSO, JWT, RBAC 구현 완료 |

### Phase 2: Core UI (4~6주)

| 주차 | 작업 | 산출물 |
|------|------|--------|
| 4주 | 디자인 시스템 구축 | Shadcn UI 커스텀 컴포넌트 라이브러리 |
| 5주 | 대시보드 UI 개발 | 메인 대시보드, 과정 관리 화면 |
| 6주 | 학습 플레이어 UI | 영상 플레이어, 인터랙션 컴포넌트 |

### Phase 3: AI Engine (7~10주)

| 주차 | 작업 | 산출물 |
|------|------|--------|
| 7주 | CREATOR Engine 설계 및 C/R 단계 | 콘셉트 분석, 경로 설계 에이전트 |
| 8주 | E/A 단계 구현 | 경험 설계, 산출물 생성 에이전트 |
| 9주 | Generator Engine (Veo 3.1 연동) | AI 영상 생성 파이프라인 |
| 10주 | FKDS Designer 구현 | 학습 경험 자동 구성 시스템 |

### Phase 4: Integration (11~13주)

| 주차 | 작업 | 산출물 |
|------|------|--------|
| 11주 | 프론트-백엔드 통합 | 전체 API 연동, SSE 스트리밍 |
| 12주 | 9개 TLA 서비스 통합 테스트 | 통합 테스트 리포트 |
| 13주 | 성능 최적화 및 보안 감사 | Lighthouse 100점 달성, 보안 리포트 |

### Phase 5: Production (14~16주)

| 주차 | 작업 | 산출물 |
|------|------|--------|
| 14주 | 스테이징 배포 및 UAT | 사용자 수용 테스트 완료 |
| 15주 | 프로덕션 배포 | growai.co.kr 정식 오픈 |
| 16주 | 안정화 및 모니터링 | 운영 안정화, 피드백 수렴 |

---

## 10. 비용 분석

### 10.1 단계별 월간 비용 추정

| 항목 | MVP ($1,000/월) | Growth ($5,000/월) | Scale ($15,000/월) | Enterprise ($50,000/월) |
|------|----------------|-------------------|-------------------|------------------------|
| **Cloud Run** | $200 | $1,000 | $3,000 | $10,000 |
| **AlloyDB** | $300 | $1,200 | $3,500 | $12,000 |
| **Cloud Storage** | $50 | $300 | $1,500 | $5,000 |
| **Cloud CDN** | $30 | $200 | $1,000 | $3,000 |
| **Memorystore** | $100 | $400 | $1,200 | $4,000 |
| **AI API 비용** | $200 | $1,500 | $4,000 | $12,000 |
| **GPU (L4)** | $100 | $300 | $600 | $3,000 |
| **기타 (로깅, 모니터링)** | $20 | $100 | $200 | $1,000 |
| **합계** | **$1,000** | **$5,000** | **$15,000** | **$50,000** |

### 10.2 비용 최적화 전략

| 전략 | 절감 효과 | 적용 방법 |
|------|----------|----------|
| **서버리스 아키텍처** | 유휴 비용 $0 | Cloud Run 최소 인스턴스 1개, 나머지 자동 스케일링 |
| **CDN 캐싱** | 오리진 트래픽 80% 감소 | 정적 자산 + ISR 페이지 엣지 캐싱 |
| **AI 응답 캐싱** | API 비용 40% 절감 | 동일 요청 결과 Memorystore 캐싱 |
| **이미지 최적화** | 스토리지 60% 절감 | WebP/AVIF 자동 변환, 해상도 적응 |
| **Spot/선점형 VM** | GPU 비용 70% 절감 | 배치 작업에 선점형 인스턴스 활용 |
| **약정 할인** | 전체 20~30% 절감 | 1년/3년 사용 약정 |

### 10.3 ROI 분석

```
투자 (16주 개발 기간):
  - 인프라 비용: $4,000 (4개월 × $1,000)
  - 개발 인건비: AI 활용으로 1인 개발 → 기존 대비 90% 절감

기대 수익:
  - Korea Polytechnics 계약: 연간 $120,000+
  - 추가 고객 확장: 연간 $200,000+ (2년차)
  - 기술 라이선싱: 연간 $50,000+ (3년차)

ROI: 1년차 기준 투자 대비 5배 이상 회수 예상
```

---

## Appendix A: 용어 사전

| 용어 | 설명 |
|------|------|
| **CREATOR** | NEWKL 교육 설계 7단계 모델 (Concept → Route → Experience → Artifact → Transform → Operate → Reflect) |
| **FKDS** | 학습 경험 순환 모델 (Feeling → Knowing → Doing → Sharing) |
| **gstack** | AI 시대 개발 워크플로우 CLI 도구 by Garry Tan, Y Combinator CEO (https://github.com/garrytan/gstack) |
| **GrowAI** | NEWKL의 AI 기반 교육 콘텐츠 자동 생성 플랫폼 |
| **Human-in-the-Loop** | AI 생성 결과를 사람이 검토/승인하는 프로세스 |
| **LangGraph** | LangChain 기반 에이전트 오케스트레이션 프레임워크 |
| **LCEL** | LangChain Expression Language — 체인 구성 선언적 문법 |
| **MCP** | Model Context Protocol — AI 모델의 도구 호출 표준 프로토콜 |
| **RSC** | React Server Components — 서버에서 렌더링되는 React 컴포넌트 |
| **SSE** | Server-Sent Events — 서버 → 클라이언트 단방향 실시간 스트리밍 |
| **TLA** | Three-Letter Acronym — 3글자 서비스 코드 (CMS, LMS, VGS 등) |
| **Veo** | Google의 AI 영상 생성 모델 |

---

## Appendix B: 학습 자료 URL

### 프론트엔드

| 자료 | URL |
|------|-----|
| Next.js 공식 문서 | https://nextjs.org/docs |
| React 19 문서 | https://react.dev |
| Tailwind CSS 4 | https://tailwindcss.com/docs |
| Shadcn UI | https://ui.shadcn.com |
| TypeScript Handbook | https://www.typescriptlang.org/docs/handbook |
| Zustand | https://zustand.docs.pmnd.rs |

### 백엔드

| 자료 | URL |
|------|-----|
| Go 공식 문서 | https://go.dev/doc |
| NestJS 문서 | https://docs.nestjs.com |
| FastAPI 문서 | https://fastapi.tiangolo.com |
| SQLAlchemy 2.0 | https://docs.sqlalchemy.org |
| Pydantic v2 | https://docs.pydantic.dev |

### AI / Agent

| 자료 | URL |
|------|-----|
| LangChain 문서 | https://python.langchain.com/docs |
| LangGraph 문서 | https://langchain-ai.github.io/langgraph |
| Google AI (Gemini) | https://ai.google.dev |
| Anthropic (Claude) | https://docs.anthropic.com |
| MCP 명세 | https://modelcontextprotocol.io |

### 인프라

| 자료 | URL |
|------|-----|
| Cloud Run 문서 | https://cloud.google.com/run/docs |
| AlloyDB 문서 | https://cloud.google.com/alloydb/docs |
| Docker 문서 | https://docs.docker.com |
| Terraform GCP | https://registry.terraform.io/providers/hashicorp/google |

### 개발 도구

| 자료 | URL |
|------|-----|
| gstack (by Garry Tan, Y Combinator CEO) | https://github.com/garrytan/gstack |

---

## Appendix C: gstack 명령어 전체 목록

> **gstack** by Garry Tan, Y Combinator CEO
> Source: https://github.com/garrytan/gstack

### 프로젝트 관리

| 명령어 | 설명 |
|--------|------|
| `gstack init` | 프로젝트 초기화 |
| `gstack status` | 전체 스프린트 현황 조회 |
| `gstack dashboard` | 대시보드 열기 |

### 스프린트 관리

| 명령어 | 설명 |
|--------|------|
| `gstack sprint create <name>` | 새 스프린트 생성 |
| `gstack sprint list` | 활성 스프린트 목록 |
| `gstack sprint switch <name>` | 스프린트 컨텍스트 전환 |
| `gstack sprint close <name>` | 스프린트 종료 |
| `gstack sprint status <name>` | 특정 스프린트 상태 확인 |

### 태스크 관리

| 명령어 | 설명 |
|--------|------|
| `gstack task add <title>` | 태스크 추가 |
| `gstack task list` | 현재 스프린트 태스크 목록 |
| `gstack task move <id> <status>` | 태스크 상태 변경 (todo/doing/done) |
| `gstack task assign <id> <agent>` | AI 에이전트에 태스크 배정 |

### 빌드 / 배포

| 명령어 | 설명 |
|--------|------|
| `gstack build` | 프로젝트 빌드 |
| `gstack test` | 테스트 실행 |
| `gstack lint` | 린트 검사 |
| `gstack deploy <env>` | 지정 환경에 배포 (dev/staging/prod) |
| `gstack rollback <env>` | 이전 버전으로 롤백 |

### AI 에이전트

| 명령어 | 설명 |
|--------|------|
| `gstack agent run <prompt>` | AI 에이전트 실행 |
| `gstack agent review` | AI 코드 리뷰 실행 |
| `gstack agent test-gen` | AI 테스트 자동 생성 |
| `gstack agent doc-gen` | AI 문서 자동 생성 |

### 모니터링

| 명령어 | 설명 |
|--------|------|
| `gstack monitor health` | 서비스 헬스체크 |
| `gstack monitor metrics` | 성능 메트릭 조회 |
| `gstack monitor logs <service>` | 서비스 로그 조회 |
| `gstack monitor alerts` | 활성 알림 조회 |

### 설정

| 명령어 | 설명 |
|--------|------|
| `gstack config set <key> <value>` | 설정 변경 |
| `gstack config get <key>` | 설정 조회 |
| `gstack config list` | 전체 설정 목록 |

---

## Appendix D: FAQ

### Q1. gstack을 꼭 사용해야 하나요?

**A.** gstack(by Garry Tan, Y Combinator CEO — https://github.com/garrytan/gstack)은 NEWKL의 표준 개발 워크플로우 도구입니다. 10~15개의 병렬 스프린트를 효율적으로 관리하기 위해 설계되었으며, 모든 팀원이 통일된 워크플로우를 따르기 위해 사용을 권장합니다. 기존 Git 워크플로우와 완전히 호환됩니다.

### Q2. AI 에이전트가 생성한 코드를 그대로 사용해도 안전한가요?

**A.** 절대 그대로 사용하지 마세요. Human-in-the-Loop 원칙에 따라, AI가 생성한 모든 코드는 반드시 인간 개발자가 검토해야 합니다. 특히 보안 관련 코드, 데이터베이스 쿼리, 인증/인가 로직은 꼼꼼한 리뷰가 필수입니다.

### Q3. Lighthouse 100점이 정말 가능한가요?

**A.** 가능합니다. Next.js의 서버 컴포넌트 + 스트리밍 렌더링 + Edge Runtime 조합으로 이미 다수의 프로젝트에서 달성된 사례가 있습니다. 핵심은 클라이언트 JavaScript 번들을 최소화하고, 이미지/폰트 최적화를 철저히 하는 것입니다. CI/CD에 Lighthouse CI를 포함하여 점수가 떨어지면 배포를 차단합니다.

### Q4. MVP 단계에서 월 $1,000로 충분한가요?

**A.** 충분합니다. Cloud Run의 서버리스 모델은 트래픽이 없을 때 비용이 거의 발생하지 않습니다. MVP 단계의 예상 동시 사용자 수(50~100명)에서는 $1,000 이내로 안정적 운영이 가능합니다. 사용량 증가에 따라 자동으로 확장되므로 미리 과도한 인프라를 준비할 필요가 없습니다.

### Q5. 왜 Go와 NestJS를 동시에 사용하나요?

**A.** 각 기술의 강점을 최대한 활용하기 위해서입니다. Go는 SSE 스트리밍과 같은 고성능 동시성 작업에 최적이고, NestJS는 복잡한 비즈니스 로직과 CRUD API에 구조화된 개발 경험을 제공합니다. 마이크로서비스 아키텍처에서 각 서비스가 가장 적합한 기술을 선택하는 것이 원칙입니다.

### Q6. 1인 개발자가 정말 20인 팀의 생산성을 낼 수 있나요?

**A.** AI 에이전트와의 페어 프로그래밍, gstack 기반 병렬 스프린트 관리, 서버리스 인프라 자동화를 결합하면 가능합니다. 핵심은 개발자가 "의사결정"에 집중하고, "구현"은 AI가 담당하는 역할 분담입니다. 물론 복잡한 아키텍처 설계나 비즈니스 로직 판단은 여전히 인간 개발자의 역할입니다.

### Q7. 보안 인증/감사를 별도로 받아야 하나요?

**A.** Korea Polytechnics(공공기관) 대상 서비스이므로, 정보보호 관리체계(ISMS) 인증을 고려해야 합니다. 본 보고서의 보안 표준을 준수하면 인증 준비에 필요한 기술적 조치의 대부분을 충족할 수 있습니다. 법적/행정적 절차는 별도로 진행해야 합니다.

### Q8. LangChain LCEL과 LangGraph의 차이점은 무엇인가요?

**A.** LCEL(LangChain Expression Language)은 프롬프트 → 모델 → 파서를 파이프라인으로 연결하는 선언적 체인 문법입니다. LangGraph는 이를 확장하여 조건 분기, 반복, 상태 저장이 가능한 에이전트 오케스트레이션 프레임워크입니다. 단순 체인은 LCEL로, 복잡한 멀티스텝 워크플로우는 LangGraph로 구현합니다.

---

## 맺음말: AI 시대의 개발, 그리고 NEWKL의 미래

이 문서는 단순한 기술 표준 보고서가 아닙니다.

이것은 NEWKL이 어떻게 일하고, 어떤 기준으로 기술을 선택하며, 어디를 향해 나아가는지를 담은 **우리의 약속**입니다.

AI가 코드를 작성하는 시대가 왔습니다. 하지만 **무엇을 만들 것인가**, **왜 만드는가**, **어떤 수준으로 만들 것인가**를 결정하는 것은 여전히 사람의 몫입니다. NEWKL은 이 결정의 기준을 세계 최고 수준에 맞추겠다는 의지로 이 문서를 작성했습니다.

1인이 20인의 생산성을 내는 것은 더 적은 사람이 일한다는 뜻이 아닙니다. **한 사람이 더 큰 꿈을 현실로 만들 수 있다는 뜻입니다.**

Lighthouse 100점을 목표로 하는 것은 숫자에 집착하는 것이 아닙니다. **우리가 만드는 모든 것에서 타협하지 않겠다는 선언입니다.**

MVP를 $1,000/월로 시작하는 것은 비용을 아끼는 것이 아닙니다. **기술로 효율을 만들어내는 NEWKL의 역량을 증명하는 것입니다.**

GrowAI Platform은 NEWKL의 첫 번째 작품입니다. 이 작품의 완성도가 곧 우리 회사의 기술력이고, 우리 팀의 자부심이며, 고객에게 전하는 신뢰의 증거입니다.

지금 이 순간에도 AI 기술은 빠르게 진화하고 있습니다. 하지만 변하지 않는 것이 있습니다 — **좋은 제품은 좋은 기준에서 나온다는 사실입니다.**

이 문서가 그 기준이 되기를 바랍니다.

함께 만들어갑시다. 세계가 주목하는 그날까지.

---

> **NEWKL 주식회사**
> *Global No.1 AI Video Generation Company*
>
> "기술로 교육을 혁신하고, AI로 성장을 설계합니다."

---

*본 문서는 NEWKL GrowAI Platform의 공식 개발 표준 기준 문서이며, 모든 개발 활동은 이 문서의 기준을 따릅니다.*
*문서 버전 관리: Git 기반, 변경 시 PR 리뷰 필수*
