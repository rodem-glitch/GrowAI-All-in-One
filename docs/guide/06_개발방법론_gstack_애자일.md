# 06. 개발 방법론: gstack + NEWKL 애자일 프로세스

> **gstack과 Agentic AI를 결합한 초고속 소프트웨어 개발 방법론**
> NEWKL GrowAI 팀의 실전 워크플로우 가이드
>
> Source: https://github.com/garrytan/gstack

---

## CEO Executive Summary (경영진 요약)

### NEWKL이 gstack + Agentic AI로 달성하는 것

NEWKL은 Y Combinator CEO Garry Tan이 만든 **gstack**(오픈소스 소프트웨어 팩토리)과 Agentic AI를 결합하여, 소규모 팀이 대규모 엔지니어링 조직의 성과를 내는 **초고속 개발 체계**를 구축합니다.

### 핵심 수치

| 지표 | 기존 방식 | gstack + AI 방식 |
|------|----------|-----------------|
| 개발 인력 | 20인 팀 필요 | **1인 개발자**로 동일 성과 |
| 일일 코드 생산량 | 200~500줄 | **10,000~20,000줄** |
| 스프린트 병렬 수 | 1~2개 | **10~15개 동시** |
| 코드 리뷰 대기 | 1~3일 | **즉시 (AI Staff Engineer)** |
| 보안 감사 | 외부 의뢰 2~4주 | **실시간 OWASP/STRIDE 감사** |

### Garry Tan (Y Combinator CEO) 실증 사례

Garry Tan은 gstack을 활용하여 **60일 만에 600,000줄의 프로덕션 코드**를 작성했습니다. 이는 기존 방식으로 5~10명의 시니어 엔지니어가 6개월 이상 걸릴 분량입니다. gstack은 단순한 코드 생성 도구가 아니라, **완전한 소프트웨어 팩토리**입니다.

### NEWKL 적용 효과

- **개발 기간 67% 단축**: 12개월 프로젝트를 4개월에 완료
- **비용 70% 절감**: 20인 팀 인건비 대비 1~3인 + AI 구독료
- **품질 향상**: 자동화된 보안 감사, 성능 벤치마크, QA 테스트
- **24시간 개발**: AI 에이전트는 쉬지 않음

> "gstack은 개발 방법론의 패러다임 전환입니다. 1인 창업자도 Fortune 500 수준의 소프트웨어를 만들 수 있습니다." — Garry Tan

---

## 1. gstack이란?

### 개요

**gstack**은 Y Combinator CEO **Garry Tan**이 만든 **오픈소스 소프트웨어 팩토리**입니다. Claude Code를 기반으로, 단일 AI를 **가상 엔지니어링 팀 전체**로 변환합니다.

- GitHub: [https://github.com/garrytan/gstack](https://github.com/garrytan/gstack)
- 라이선스: **MIT** (완전 무료, 상업적 사용 가능)
- 기반 기술: Claude Code (Anthropic)

### 핵심 구성

```
gstack
├── 23개 전문가 역할 (Agents)
│   ├── CEO, CTO, Staff Engineer
│   ├── Product Manager, Designer
│   ├── QA Engineer, Security Officer
│   └── ... 그 외 16개 역할
│
├── 8개 파워 도구 (Power Tools)
│   ├── /office-hours (기획)
│   ├── /plan-ceo-review (전략 검토)
│   ├── /plan-eng-review (아키텍처 검토)
│   ├── /plan-design-review (디자인 검토)
│   ├── /review (코드 리뷰)
│   ├── /qa (QA 테스트)
│   ├── /ship (배포)
│   └── /retro (회고)
│
└── 안전장치 (Safety)
    ├── /careful (주의 모드)
    ├── /freeze (변경 금지)
    └── /guard (가드레일)
```

### 왜 gstack인가?

| 기존 AI 코딩 | gstack |
|-------------|--------|
| 단순 코드 생성 | **전체 소프트웨어 개발 프로세스** |
| 맥락 없는 자동완성 | **23개 전문가 역할이 협업** |
| 품질 보장 없음 | **다중 리뷰 + QA + 보안 감사** |
| 개인 도구 | **팀 워크플로우 자동화** |

gstack을 사용하면 Claude Code가 단순한 코드 생성기에서 **PM, 디자이너, 엔지니어, QA, 보안 담당자가 모두 포함된 가상 팀**으로 변환됩니다.

---

## 2. gstack 스프린트 프로세스

gstack은 7단계 스프린트 사이클을 따릅니다.

```
Think → Plan → Build → Review → Test → Ship → Reflect
 생각    계획    구현    검토    테스트   배포    회고
```

### 2.1 Think: /office-hours (제품 기획)

**역할**: Product Manager + CEO
**목적**: 만들기 전에 "무엇을 왜 만드는가"를 명확히 정의

```bash
/office-hours
```

6가지 핵심 질문을 통해 제품을 정의합니다:

| # | 질문 | 목적 |
|---|------|------|
| 1 | 어떤 문제를 해결하는가? | 문제 정의 |
| 2 | 타겟 사용자는 누구인가? | 페르소나 정의 |
| 3 | 핵심 기능은 무엇인가? | 스코프 결정 |
| 4 | 성공 지표는 무엇인가? | KPI 설정 |
| 5 | 기술적 제약은 무엇인가? | 현실성 검토 |
| 6 | MVP 범위는 어디까지인가? | 우선순위 결정 |

**출력물**: 구조화된 제품 기획서 (PRD)

### 2.2 Plan: /plan-ceo-review (CEO 관점 검토)

**역할**: CEO Advisor
**목적**: 전략적 관점에서 계획을 검증

```bash
/plan-ceo-review
```

4가지 스코프 모드:

| 모드 | 설명 | 사용 시점 |
|------|------|----------|
| **Micro** | 단일 기능 | 버그 수정, 작은 기능 |
| **Sprint** | 1~2주 단위 | 일반 스프린트 |
| **Epic** | 1~3개월 단위 | 대형 기능 개발 |
| **Vision** | 6개월~1년 | 제품 로드맵 |

### 2.3 Plan: /plan-eng-review (엔지니어링 아키텍처 검토)

**역할**: Staff Engineer + Architect
**목적**: 기술적 타당성과 아키텍처 설계 검토

```bash
/plan-eng-review
```

검토 항목:
- 시스템 아키텍처 적합성
- 데이터 모델 설계
- API 설계 및 계약
- 확장성 및 성능 고려사항
- 기술 부채 위험도

### 2.4 Plan: /plan-design-review (디자인 검토)

**역할**: Senior Designer
**목적**: UI/UX 품질 보장 및 **AI Slop 감지**

```bash
/plan-design-review
```

**AI Slop이란?**
AI가 생성한 코드에서 흔히 발생하는 디자인 문제입니다:
- 과도한 그라데이션, 그림자
- 불필요한 애니메이션
- 일관성 없는 간격과 정렬
- 접근성(a11y) 미준수

디자인 리뷰는 이런 문제를 자동으로 감지하고 수정합니다.

### 2.5 Build: 구현

계획이 승인되면 실제 코드를 작성합니다. gstack의 가상 팀이 코드를 생성하고, 각 전문가 역할이 자신의 영역을 담당합니다.

### 2.6 Review: /review (코드 리뷰)

**역할**: Staff Engineer
**목적**: 프로덕션 수준의 코드 리뷰

```bash
/review
```

리뷰 기준:
- 코드 정확성 및 로직 검증
- 에러 처리 및 엣지 케이스
- 성능 최적화 기회
- 보안 취약점
- 테스트 커버리지
- 코드 스타일 및 일관성

### 2.7 Test: /qa (QA 테스트)

**역할**: QA Engineer
**목적**: 실제 브라우저에서 자동화 테스트 실행

```bash
/qa
```

테스트 범위:
- 기능 테스트 (Happy path + Edge cases)
- 크로스 브라우저 테스트
- 반응형 디자인 테스트
- 접근성 테스트
- 성능 테스트

### 2.8 Ship: /ship (PR 생성 + 배포)

**역할**: Release Manager
**목적**: PR 생성, 최종 테스트, 배포

```bash
/ship
```

자동 수행 작업:
1. Git 브랜치 정리
2. PR 생성 (상세 설명 포함)
3. CI/CD 파이프라인 실행
4. 자동 테스트 실행
5. 배포 준비 완료 알림

### 2.9 Reflect: /retro (회고)

**역할**: Agile Coach
**목적**: 스프린트 회고 및 개선점 도출

```bash
/retro
```

회고 항목:
- 잘된 점 (Keep)
- 개선할 점 (Problem)
- 시도할 것 (Try)
- 학습한 교훈 (Lesson Learned)
- 다음 스프린트 적용 사항

---

## 3. NEWKL 적용 워크플로우

NEWKL GrowAI 프로젝트에 gstack을 적용하는 **구체적인 8단계 워크플로우**입니다.

### Step 1: /office-hours로 CREATOR 7단계 기획

NEWKL의 **CREATOR 프레임워크**와 gstack의 기획 도구를 결합합니다.

```
CREATOR 7단계:
C (Concept)    — 컨셉 정의
R (Route)      — 경로 설계
E (Experience) — 경험 설계
A (Artifact)   — 산출물 생성
T (Transform)  — 변화 적용
O (Operate)    — 최적 운영
R (Reflect)    — 성찰
```

```bash
# /office-hours 실행 시 CREATOR 프레임워크 맥락을 제공
/office-hours

# 예시 프롬프트:
# "LearnForm의 CREATOR C단계(컨셉)를 기획합니다.
#  FKDS 모델의 F(Feeling) 단계를 지원하는
#  감정 기반 학습 온보딩 화면을 설계해주세요."
```

### Step 2: /plan-ceo-review로 전략 검토

```bash
/plan-ceo-review

# CEO 관점에서 검토:
# - 이 기능이 NEWKL의 비전과 일치하는가?
# - ROI가 충분한가?
# - 경쟁사 대비 차별점은?
# - 출시 일정이 현실적인가?
```

### Step 3: /autoplan으로 자동 리뷰 파이프라인

```bash
/autoplan

# 자동으로 순차 실행:
# 1. /plan-eng-review (아키텍처 검토)
# 2. /plan-design-review (디자인 검토)
# 3. 최종 계획 문서 생성
```

### Step 4: 구현

NEWKL의 기술 스택에 맞춰 구현합니다.

```bash
# 프론트엔드 (Next.js + TypeScript)
# 백엔드 (FastAPI + Python 3.12)
# AI 체인 (LangChain LCEL + LangGraph)

# gstack이 각 영역의 전문가 역할로 코드를 생성
# Human-in-the-Loop: 핵심 의사결정은 개발자가 확인
```

### Step 5: /review로 코드 리뷰

```bash
/review

# Staff Engineer 수준의 리뷰:
# - Python: ruff + mypy 규칙 준수 확인
# - TypeScript: strict 모드 준수 확인
# - AI 체인: LCEL 패턴 준수 확인
# - 100자 라인 제한 확인
```

### Step 6: /qa로 브라우저 테스트

```bash
/qa

# 실제 브라우저에서 테스트:
# - CREATOR 각 단계 화면 동작 확인
# - FKDS 모델 플로우 테스트
# - 반응형 디자인 확인
# - 접근성 테스트
```

### Step 7: /ship으로 PR + 배포

```bash
/ship

# 자동화된 배포 파이프라인:
# 1. PR 생성 (CREATOR 단계 라벨 포함)
# 2. CI 테스트 실행
# 3. GCP Cloud Run 배포
# 4. AlloyDB 마이그레이션 확인
```

### Step 8: /retro로 회고

```bash
/retro

# CREATOR + gstack 회고:
# - CREATOR 단계별 완성도 평가
# - gstack 활용도 분석
# - 다음 스프린트 개선 사항
# - 팀 학습 공유
```

---

## 4. 병렬 스프린트 (10~15개 동시)

### Conductor 패턴

gstack의 가장 강력한 기능 중 하나는 **여러 Claude Code 세션을 동시에 실행**하는 것입니다.

```
┌─────────────────────────────────────────────┐
│              개발자 (Conductor)               │
│         의사결정만 관리, CEO처럼 운영           │
└──────┬──────┬──────┬──────┬──────┬──────────┘
       │      │      │      │      │
  ┌────▼─┐ ┌──▼──┐ ┌──▼──┐ ┌──▼──┐ ┌──▼──┐
  │세션 1│ │세션 2│ │세션 3│ │세션 4│ │세션 5│
  │로그인│ │대시보│ │학습  │ │리뷰  │ │API  │
  │ 화면 │ │  드  │ │ 화면 │ │ 화면 │ │엔드 │
  └──────┘ └─────┘ └─────┘ └─────┘ └─────┘
    독립      독립     독립     독립     독립
   워크스페이스 워크스페이스 워크스페이스 워크스페이스 워크스페이스
```

### 실행 방법

```bash
# 터미널 1: 로그인/회원가입
claude --worktree feature/auth

# 터미널 2: 대시보드
claude --worktree feature/dashboard

# 터미널 3: 학습 화면 (CREATOR C단계)
claude --worktree feature/learning-concept

# 터미널 4: 리뷰 화면 (CREATOR R단계)
claude --worktree feature/learning-reflect

# 터미널 5: API 엔드포인트
claude --worktree feature/api-endpoints

# ... 최대 10~15개 동시 실행
```

### 병렬 스프린트 관리 원칙

1. **독립성**: 각 세션은 서로 다른 워크스페이스에서 작업 (git worktree 활용)
2. **명확한 스코프**: 각 세션에 명확한 작업 범위 지정
3. **주기적 통합**: 일정 주기로 main 브랜치에 병합
4. **충돌 최소화**: 파일 변경 범위가 겹치지 않도록 설계
5. **의사결정 집중**: 개발자는 코드 작성이 아닌 **의사결정**에 집중

### 생산성 비교

```
기존 방식:
  개발자 1명 × 1 스프린트 = 1 기능/주

gstack 병렬 방식:
  개발자 1명 × 10 스프린트 = 10 기능/주
  → 10배 생산성 향상
```

---

## 5. 품질 게이트

gstack은 코드를 빠르게 작성하는 것뿐만 아니라 **품질을 보장하는 안전장치**를 제공합니다.

### 5.1 /cso: 보안 감사

**역할**: Chief Security Officer
**검사 항목**: OWASP Top 10 + STRIDE 위협 모델링

```bash
/cso
```

| OWASP Top 10 | 검사 내용 |
|-------------|----------|
| A01: Broken Access Control | 인증/인가 우회 가능성 |
| A02: Cryptographic Failures | 암호화 미적용, 약한 알고리즘 |
| A03: Injection | SQL/NoSQL/OS Command 인젝션 |
| A04: Insecure Design | 설계 수준 보안 결함 |
| A05: Security Misconfiguration | 잘못된 보안 설정 |
| A06: Vulnerable Components | 취약한 의존성 |
| A07: Auth Failures | 인증 메커니즘 결함 |
| A08: Data Integrity Failures | 데이터 무결성 검증 누락 |
| A09: Logging Failures | 보안 로깅 미흡 |
| A10: SSRF | 서버 측 요청 위조 |

**STRIDE 위협 모델링**:

| 위협 | 설명 |
|------|------|
| **S**poofing | 신원 위조 |
| **T**ampering | 데이터 변조 |
| **R**epudiation | 부인 |
| **I**nformation Disclosure | 정보 유출 |
| **D**enial of Service | 서비스 거부 |
| **E**levation of Privilege | 권한 상승 |

### 5.2 /benchmark: 성능 측정

**역할**: Performance Engineer
**측정 항목**: Core Web Vitals

```bash
/benchmark
```

| 지표 | 기준 | 설명 |
|------|------|------|
| LCP | < 2.5초 | Largest Contentful Paint |
| INP | < 200ms | Interaction to Next Paint |
| CLS | < 0.1 | Cumulative Layout Shift |
| TTFB | < 800ms | Time to First Byte |
| FCP | < 1.8초 | First Contentful Paint |

### 5.3 안전장치 명령어

| 명령어 | 역할 | 사용 시점 |
|--------|------|----------|
| `/careful` | 주의 모드 활성화 | 프로덕션 코드 수정 시 |
| `/freeze` | 파일 변경 금지 | 특정 파일 보호 (설정 파일 등) |
| `/guard` | 가드레일 설정 | 위험한 작업 방지 (DB 삭제 등) |

```bash
# 프로덕션 데이터베이스 관련 코드 수정 시
/careful

# 핵심 설정 파일 보호
/freeze config/production.yaml

# 위험한 명령어 방지
/guard "DROP TABLE", "rm -rf", "force push"
```

### 품질 게이트 파이프라인

모든 코드는 배포 전 다음 게이트를 통과해야 합니다:

```
코드 작성
    │
    ▼
/review (코드 리뷰) ── 실패 → 수정 후 재시도
    │
    ▼
/cso (보안 감사) ── 실패 → 보안 이슈 해결
    │
    ▼
/qa (QA 테스트) ── 실패 → 버그 수정
    │
    ▼
/benchmark (성능) ── 실패 → 최적화
    │
    ▼
/ship (배포) ✅
```

---

## 6. 설치 및 설정 방법

### 6.1 사전 요구사항

```bash
# Node.js 18+ 설치 확인
node --version

# Claude Code 설치
npm install -g @anthropic-ai/claude-code

# Anthropic API 키 설정
export ANTHROPIC_API_KEY="your-api-key"
```

### 6.2 gstack 설치

```bash
# gstack 공식 설치 (https://github.com/garrytan/gstack)
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

또는 수동으로 프로젝트의 `CLAUDE.md`에 gstack 내용을 추가할 수 있습니다.

### 6.3 CLAUDE.md 설정

프로젝트 루트에 `CLAUDE.md` 파일을 생성하고 gstack 설정을 포함합니다:

```markdown
# CLAUDE.md

## 프로젝트 개요
LearnForm - CREATOR x FKDS 기반 AI 이러닝 플랫폼

## 기술 스택
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: FastAPI + Python 3.12 + SQLAlchemy 2.0
- AI: LangChain + LangGraph

## gstack 설정
@gstack/CLAUDE.md
```

### 6.4 팀 모드 설정

여러 명이 같은 프로젝트에서 gstack을 사용할 때:

```bash
# 팀 공유 설정 파일
# .claude/settings.json
{
  "team": {
    "name": "NEWKL GrowAI",
    "conventions": {
      "branch_prefix": "feature/",
      "commit_style": "conventional",
      "review_required": true
    }
  }
}
```

### 6.5 첫 번째 스프린트 시작하기

```bash
# 1. 프로젝트 디렉토리에서 Claude Code 실행
claude

# 2. gstack 명령어 확인
/help

# 3. 제품 기획 시작
/office-hours

# 4. 계획 수립 및 검토
/plan-ceo-review

# 5. 구현 시작
# (자연어로 작업 지시)

# 6. 리뷰 → 테스트 → 배포
/review
/qa
/ship
```

---

## Appendix

### A. gstack 전체 명령어 테이블

| # | 명령어 | 역할 | 설명 |
|---|--------|------|------|
| 1 | `/office-hours` | Product Manager | 제품 기획, 6가지 핵심 질문 |
| 2 | `/plan-ceo-review` | CEO Advisor | 전략적 관점 계획 검토 |
| 3 | `/plan-eng-review` | Staff Engineer | 아키텍처 및 기술 검토 |
| 4 | `/plan-design-review` | Senior Designer | UI/UX 디자인 검토, AI Slop 감지 |
| 5 | `/autoplan` | Pipeline | 자동 리뷰 파이프라인 실행 |
| 6 | `/review` | Staff Engineer | 코드 리뷰 (프로덕션 수준) |
| 7 | `/qa` | QA Engineer | 브라우저 기반 자동화 테스트 |
| 8 | `/ship` | Release Manager | PR 생성 + 테스트 + 배포 |
| 9 | `/retro` | Agile Coach | 스프린트 회고 |
| 10 | `/cso` | Security Officer | OWASP Top 10 + STRIDE 보안 감사 |
| 11 | `/benchmark` | Performance Eng. | Core Web Vitals 성능 측정 |
| 12 | `/careful` | Safety | 주의 모드 (신중한 변경) |
| 13 | `/freeze` | Safety | 파일 변경 금지 |
| 14 | `/guard` | Safety | 위험 명령 방지 가드레일 |
| 15 | `/debug` | Debugger | 체계적 디버깅 |
| 16 | `/perf` | Performance Eng. | 성능 프로파일링 및 최적화 |
| 17 | `/migrate` | Database Eng. | 데이터베이스 마이그레이션 |
| 18 | `/docs` | Tech Writer | 문서 생성 및 업데이트 |
| 19 | `/test` | Test Engineer | 테스트 작성 및 실행 |
| 20 | `/refactor` | Senior Engineer | 리팩토링 |
| 21 | `/deploy` | DevOps | 배포 관리 |
| 22 | `/monitor` | SRE | 모니터링 및 알림 설정 |
| 23 | `/incident` | SRE | 인시던트 대응 |

### B. 용어 사전

| 용어 | 설명 |
|------|------|
| **gstack** | Garry Tan이 만든 오픈소스 소프트웨어 팩토리 |
| **Agentic AI** | 자율적으로 작업을 수행하는 AI 에이전트 |
| **CREATOR** | NEWKL의 7단계 콘텐츠 생성 프레임워크 |
| **FKDS** | Feeling-Knowing-Doing-Sharing 학습 모델 |
| **Claude Code** | Anthropic의 AI 코딩 CLI 도구 |
| **Conductor** | 여러 AI 세션을 오케스트라처럼 관리하는 패턴 |
| **AI Slop** | AI가 생성한 코드에서 흔한 디자인 결함 |
| **Worktree** | Git의 작업 트리, 하나의 레포에서 여러 브랜치 동시 작업 |
| **OWASP Top 10** | 웹 애플리케이션 보안 위험 상위 10개 |
| **STRIDE** | Microsoft의 6가지 위협 분류 모델 |
| **Core Web Vitals** | Google의 웹 성능 핵심 지표 |
| **LCEL** | LangChain Expression Language |
| **Human-in-the-Loop** | AI 작업 중 핵심 의사결정에 사람이 개입하는 패턴 |
| **Sprint** | 1~2주 단위의 반복 개발 주기 |
| **MVP** | Minimum Viable Product, 최소 기능 제품 |

### C. 학습 자료

**gstack 관련**:
- gstack GitHub: [https://github.com/garrytan/gstack](https://github.com/garrytan/gstack)
- Garry Tan YouTube: [https://youtube.com/@garrytan](https://youtube.com/@garrytan)

**Claude Code 관련**:
- Claude Code 공식 문서: [https://docs.anthropic.com/claude-code](https://docs.anthropic.com/claude-code)
- Anthropic 공식 사이트: [https://anthropic.com](https://anthropic.com)

**NEWKL 프레임워크 관련**:
- CREATOR 프레임워크 가이드 (내부 문서)
- FKDS 모델 설명서 (내부 문서)

**애자일 방법론**:
- Scrum Guide: [https://scrumguides.org](https://scrumguides.org)
- Agile Manifesto: [https://agilemanifesto.org](https://agilemanifesto.org)

**보안**:
- OWASP Top 10: [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)
- STRIDE 모델: [https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool)

**성능**:
- Core Web Vitals: [https://web.dev/vitals/](https://web.dev/vitals/)

---

> **"혼자서도 위대한 소프트웨어를 만들 수 있는 시대가 왔습니다.**
> **gstack과 Agentic AI는 도구가 아니라 팀입니다.**
> **당신은 코드를 작성하는 사람이 아니라, 비전을 실현하는 사람입니다."**

---

*이 문서는 NEWKL GrowAI 팀의 개발 방법론 가이드입니다.*
*gstack은 MIT 라이선스로 제공되는 오픈소스 프로젝트입니다.*
*최종 업데이트: 2026-04-10*
