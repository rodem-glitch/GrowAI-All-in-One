---
name: GrowAI All-in-One 통합 플랫폼
description: LearnForm V2 + GrowAI-LMS V4를 통합한 올인원 플랫폼 프로젝트 현황
type: project
originSessionId: ca92efba-3fc5-45f3-aa8e-76d94e22a4ed
---
GrowAI All-in-One 통합 플랫폼이 /home/desktop/GrowAI-ALL-ONE 에 구축됨 (2026-04-11).

**Why:** growai.co.kr 단일 도메인에서 9개 AI 서비스를 통합 운영하기 위해 LearnForm V2와 GrowAI-LMS V4 소스를 머지.
**How to apply:** 향후 서비스 관련 작업은 GrowAI-ALL-ONE 디렉토리에서 진행. V2는 LearnForm 단독 랜딩용으로 유지.

주요 사항:
- GitHub: rodem-glitch/GrowAI-All-in-One (branch: feature/init_all_in_one)
- 기술 스택: Vite 6 + React 19 + TypeScript 5.8 + Tailwind CSS 4 + React Router 7
- 91개 파일, 22,251줄
- 라우팅: / (Portal), /learnform, /lms/*, /map, /vls, /vas, /ccb, /ccs, /cdn, /cms
- TLA 서비스 8개: MAP, LMS, VLS, VAS, CCB, CCS, CDN, CMS
- 문서 7개: docs/ 디렉토리 (통합전략, 라우팅, UI, TLA, CI, 배포, 구조)
- 인프라: Docker 3-stage, Nginx, docker-compose (frontend+API+PostgreSQL+Redis)
