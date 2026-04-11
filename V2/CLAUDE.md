# GrowAI V2 - Next.js 16+ Application

## Project
NEWKL GrowAI - Global No.1 AI Video Generation Platform
Korea Polytechnics AI E-Learning Content Auto-Generation

## Tech Stack
- Frontend: Next.js 16.2+ (App Router, Streaming UI, PPR)
- UI: Shadcn UI (Radix) + Tailwind CSS 4
- Language: TypeScript 5.8+ (strict mode)
- Icons: Lucide React
- Animation: Motion (Framer Motion)
- AI: Gemini 2.5 Pro + Claude + Veo 3.1
- State: React Context + Zustand (planned)
- i18n: Custom LanguageContext (ko/en)

## CREATOR 7 Steps
C(Concept) → R(Route Design) → E(Experience Design) → A(Artifact Generation) → T(Transform Apply) → O(Optimal Operation) → R(Reflection)

## FKDS Model
F(Feeling) → K(Knowing) → D(Doing) → S(Sharing) Cycle

## Development Rules
- TypeScript: strict mode, no any
- Components: Shadcn UI first, custom second
- Styling: Tailwind CSS utilities, no inline styles
- Testing: Vitest (unit) + Playwright (E2E)
- Git: Conventional Commits
- Line limit: 100 characters
- Korean comments for complex logic

## gstack 개발 방법론
Source: https://github.com/garrytan/gstack (MIT License)
Version: v0.16.2 | by Garry Tan, Y Combinator CEO

gstack은 Claude Code를 가상 엔지니어링 팀으로 변환하는 오픈소스 소프트웨어 팩토리입니다.
23개 전문가 역할 + 8개 파워 도구를 slash 명령어로 제공합니다.

### Sprint Process: Think → Plan → Build → Review → Test → Ship → Reflect

| 단계 | 명령어 | 역할 |
|------|--------|------|
| Think | /office-hours | YC Office Hours 스타일 제품 기획 (6가지 핵심 질문) |
| Plan | /plan-ceo-review | CEO 관점 전략 검토 (4가지 스코프 모드) |
| Plan | /plan-eng-review | 엔지니어링 아키텍처 검토 |
| Plan | /plan-design-review | 디자인 검토 (AI Slop 감지) |
| Plan | /autoplan | CEO → Design → Eng 자동 리뷰 파이프라인 |
| Build | (구현) | Next.js 16+ / Go / FastAPI 개발 |
| Review | /review | Staff Engineer 수준 코드 리뷰 |
| Test | /qa | 실제 브라우저 QA 테스트 |
| Test | /cso | OWASP Top 10 + STRIDE 보안 감사 |
| Test | /benchmark | Core Web Vitals 성능 측정 |
| Ship | /ship | PR 생성 + 테스트 + 배포 |
| Ship | /land-and-deploy | PR 머지 → CI → 프로덕션 배포 |
| Reflect | /retro | 팀 회고 (주간/프로젝트별) |

### Safety
- /careful: 파괴적 명령어 경고
- /freeze: 편집 범위 잠금
- /guard: careful + freeze 동시 활성화

## CI/CD
- Lighthouse score gate: 90+
- Bundle size gate: +10KB warning
- Test coverage: 80%+
