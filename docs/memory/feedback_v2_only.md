---
name: V2 버전으로만 서비스 실행
description: 서비스 실행 요청 시 반드시 V2 디렉토리(/home/desktop/learnform/V2)의 Next.js 프로젝트만 실행할 것
type: feedback
originSessionId: ca92efba-3fc5-45f3-aa8e-76d94e22a4ed
---
서비스 실행 요청 시 V2 디렉토리(/home/desktop/learnform/V2)의 프론트엔드만 실행한다.
기존 V1(apps/web, apps/api) 서비스는 실행하지 않는다.

**Why:** 사용자가 V2를 최신 작업 버전으로 지정함. V1은 더 이상 사용하지 않음.
**How to apply:** `make web`, `make api` 등 V1 명령어 대신 V2 디렉토리에서 `pnpm dev`로 실행.
