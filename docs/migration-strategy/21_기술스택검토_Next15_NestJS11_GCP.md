# NEWKL 기술 스택 검토: Next.js 15 + NestJS 11 + GCP GPU

> 검토일: 2026-04-11 | NEWKL Global No.1 AI Video Platform

---

## 1. Next.js 15 검토

### 1.1 주요 기능

| 기능 | 설명 | NEWKL 활용도 |
|------|------|-------------|
| **Turbopack (Stable)** | Rust 기반 번들러, 10x 빠른 빌드/콜드스타트 | 개발 생산성 극대화 |
| **Partial Prerendering (PPR)** | 정적 셸 즉시 로드 + 동적 파트 스트리밍 | 랜딩 페이지 TTFB < 100ms |
| **React 19 지원** | Server Components, Actions, useTransition | 서버/클라이언트 최적 분리 |
| **Async Request APIs** | headers/cookies/params 비동기 처리 | 렌더링 효율 개선 |
| **Enhanced Forms** | 프리페칭 + 프로그레시브 개선 | 폼 UX 향상 |
| **Typed Routes** | 컴파일 타임 라우트 타입 검사 | 잘못된 링크 방지 |
| **캐싱 변경** | fetch/GET Handler 기본 캐시 비활성화 | 명시적 캐시 제어 가능 |

### 1.2 Next.js 15.5 추가 기능

- Turbopack 빌드 (베타)
- Stable Node.js 미들웨어
- TypeScript 개선
- Next.js 16 대비 deprecation 경고

### 1.3 현재 Vite SPA vs Next.js 15 비교

| 항목 | Vite 6 + React (현재) | Next.js 15 (전환 후) |
|------|----------------------|---------------------|
| 렌더링 | CSR only | SSR + SSG + ISR + PPR |
| SEO | 불가 (빈 HTML) | 완벽 (서버 렌더링) |
| TTFB | ~500ms | < 100ms (Edge) |
| 번들 | 전체 로드 | 페이지별 자동 스플리팅 |
| 이미지 최적화 | 수동 | next/image 자동 (AVIF/WebP) |
| 폰트 최적화 | 수동 | next/font 자동 (CLS 0) |
| API Routes | 별도 서버 필요 | 내장 Route Handlers |
| Edge Runtime | 미지원 | Edge Functions 내장 |
| 빌드 속도 | 빠름 (Vite) | 10x 빠름 (Turbopack) |

### 1.4 NEWKL에 대한 추천

```
추천: Next.js 15로 전환 ✅

이유:
1. PPR로 랜딩 페이지 즉시 로드 (정적 셸 + 동적 스트리밍)
2. SEO 필수 (AI Video 키워드 글로벌 1위 목표)
3. next/image + next/font로 CWV 자동 최적화
4. Edge Runtime으로 글로벌 TTFB < 50ms
5. React Server Components로 번들 크기 대폭 감소
```

### 1.5 마이그레이션 전략

```
Phase 1: app/ 디렉토리 구조 전환 (Vite pages → Next.js App Router)
Phase 2: Server Components 적용 (정적 섹션)
Phase 3: PPR 활성화 (랜딩 + LMS)
Phase 4: Edge 배포 (Vercel 또는 Cloud Run)
```

---

## 2. NestJS 11 검토

### 2.1 주요 기능

| 기능 | 설명 | NEWKL 활용도 |
|------|------|-------------|
| **SWC 기본 컴파일러** | Rust 기반, 20x 빠른 빌드 | 백엔드 개발 속도 극대화 |
| **Vitest 기본 테스트** | SWC 기반 초고속 테스트 | 프론트/백 테스트 통일 |
| **Standalone Apps** | AppModule 없이 부트스트랩 | 마이크로서비스/서버리스 최적 |
| **ESM 1등 시민** | Node.js 24 호환 | 최신 생태계 완벽 지원 |
| **Enhanced Logger** | JSON 로깅, 커스텀 프리픽스 | 구조화된 로그 (Cloud Logging) |
| **IntrinsicException** | 로깅 바이패스 예외 | 헬스체크 등 불필요한 로그 제거 |
| **Apollo Server v4** | GraphQL 모듈 업데이트 | AI 데이터 쿼리 최적화 |
| **Microservice 개선** | NATS, Kafka, Redis 트랜스포터 | TLA 서비스 간 통신 |

### 2.2 현재 FastAPI vs NestJS 11 비교

| 항목 | FastAPI (현재) | NestJS 11 (전환 후) |
|------|---------------|-------------------|
| 언어 | Python 3.12 | TypeScript (Node.js) |
| 타입 안전성 | Pydantic v2 | TypeScript + class-validator |
| ORM | SQLAlchemy 2.0 | TypeORM / Prisma |
| 빌드 속도 | 보통 | 20x 빠름 (SWC) |
| 테스트 | pytest | Vitest (프론트와 통일) |
| 마이크로서비스 | 별도 구성 필요 | 내장 (NATS/Kafka/Redis) |
| GraphQL | Strawberry | Apollo Server v4 내장 |
| WebSocket | Socket.io 별도 | @nestjs/websockets 내장 |
| AI 통합 | LangChain Python | LangChain.js + Vercel AI SDK |
| 프론트 통합 | API 분리 | 풀스택 TypeScript 통일 |

### 2.3 NestJS 11 아키텍처 (NEWKL 맞춤)

```
src/
├── modules/
│   ├── auth/           # 인증 (JWT + SSO)
│   ├── users/          # 사용자 관리
│   ├── courses/        # LMS 강의
│   ├── video/          # AI 영상 생성 (Veo API 연동)
│   ├── learnform/      # LearnForm CREATOR/FKDS
│   ├── ai/             # Gemini + Claude 통합
│   ├── notification/   # 알림 (Push/Email/SMS)
│   └── analytics/      # 학습 분석
├── common/
│   ├── guards/         # 인증 가드
│   ├── interceptors/   # 로깅/캐싱
│   ├── filters/        # 예외 필터
│   └── decorators/     # 커스텀 데코레이터
├── microservices/
│   ├── map/            # Manufacturing AI
│   ├── vls/            # Video Lecture
│   ├── vas/            # Video Auto Summary
│   ├── ccb/            # Customer Care Bot
│   ├── ccs/            # Claude Code Skill
│   ├── cdn/            # Content Delivery
│   └── cms/            # Construction Management
└── config/
    ├── database.ts     # TypeORM/Prisma
    ├── redis.ts        # 캐싱
    └── gcp.ts          # GCP 서비스 연동
```

### 2.4 NEWKL에 대한 추천

```
추천: NestJS 11 도입 ✅ (점진적)

이유:
1. 풀스택 TypeScript 통일 (프론트 Next.js + 백엔드 NestJS)
2. 마이크로서비스 내장 → 8개 TLA 서비스 독립 배포
3. SWC 20x 빌드 → 개발 생산성
4. Vitest 통일 → 프론트/백 테스트 도구 통일
5. GraphQL + WebSocket 내장 → 실시간 AI 생성 진행률

전환 전략:
- FastAPI는 AI/ML 파이프라인(LangChain)에서 유지
- NestJS는 API Gateway + 비즈니스 로직 담당
- 하이브리드 아키텍처: NestJS ↔ FastAPI (gRPC 연동)
```

---

## 3. GCP GPU 서버 스펙

### 3.1 GPU 옵션 비교

| GPU | VRAM | 용도 | GCP 머신타입 | 시간당 비용 |
|-----|------|------|-------------|------------|
| **NVIDIA L4** | 24GB | 추론(inference), 영상 트랜스코딩 | g2-standard-* | $0.44~0.80/hr |
| **NVIDIA A100 40GB** | 40GB | 파인튜닝, 대규모 추론 | a2-standard-* | $1.49~3.43/hr |
| **NVIDIA A100 80GB** | 80GB | 대규모 모델 학습/추론 | a2-ultra-* | $2.50~4.50/hr |
| **NVIDIA H100 80GB** | 80GB | 초대규모 학습/서빙 | a3-mega-* | $3.00~9.80/hr |
| **RTX PRO 6000** | 96GB | 차세대 추론 (Preview) | Cloud Run GPU | TBD |

### 3.2 NEWKL AI Video 워크로드별 GPU 추천

| 워크로드 | 추천 GPU | 수량 | 예상 비용 (월) |
|---------|---------|------|--------------|
| **영상 생성 (Veo API)** | API 호출 (GPU 불필요) | - | 사용량 기반 |
| **실시간 추론 서빙** | L4 24GB | 2-4 | $640~2,300 |
| **모델 파인튜닝** | A100 80GB | 1-2 | $1,800~6,480 |
| **영상 트랜스코딩** | L4 24GB | 1-2 | $320~1,150 |
| **RAG/임베딩** | L4 24GB | 1 | $320~575 |
| **대규모 학습** | H100 80GB | 2-4 | $4,320~28,200 |

### 3.3 Cloud Run GPU (서버리스 GPU)

```
NEWKL 핵심 추천: Cloud Run + L4 GPU ✅

특징:
- NVIDIA L4 GPU (24GB VRAM)
- 인스턴스 시작: < 5초
- 0으로 스케일 다운 (비용 절감)
- 초 단위 과금
- CPU 대비 120x AI 비디오 성능
- NVIDIA NIM 컨테이너 지원

용도:
- AI 영상 추론/생성
- 영상 트랜스코딩
- 실시간 자막 생성
- AI 음성 합성
```

### 3.4 Vertex AI Veo (영상 생성 API)

| 모델 | 비용 (초당) | 특징 | NEWKL 용도 |
|------|-----------|------|-----------|
| **Veo 3.1** | $0.75/초 | 최고 품질, SLA, HIPAA | 프리미엄 영상 |
| **Veo 3.1 Fast** | ~$0.10/초 | 빠른 생성 | 미리보기/프로토타입 |
| **Veo 3.1 Lite** | $0.05/초 | 비용 최적화 (50% 절감) | 대량 생성 |
| **Veo 3.0** | $0.50/초 (영상), $0.75/초 (영상+오디오) | 이전 버전 | 레거시 |

### 3.5 비용 최적화 전략

```
1. Spot/Preemptible 인스턴스: 60-70% 절감
   - 파인튜닝, 배치 처리에 활용
   - 체크포인트 저장으로 중단 대비

2. Committed Use Discounts (CUD): 1년 약정 37%, 3년 약정 55% 절감
   - 상시 운영 GPU에 적용

3. 오토스케일링: Cloud Run 0→N 자동
   - 비활성 시 비용 0원
   - 피크 시간만 GPU 확장

4. Veo Lite 활용: 미리보기는 Lite, 최종 생성만 Premium
   - 비용 50% 절감
```

---

## 4. GCP 통합 인프라 아키텍처 (NEWKL 추천)

### 4.1 아키텍처 다이어그램

```
                    growai.co.kr
                         │
                   ┌─────┴─────┐
                   │  Cloud    │
                   │  Load     │
                   │  Balancer │
                   └─────┬─────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
        ┌─────┴────┐ ┌──┴───┐ ┌───┴────┐
        │ Cloud Run│ │Cloud │ │ Cloud  │
        │ Frontend │ │ Run  │ │  Run   │
        │ (Next.js │ │ API  │ │  GPU   │
        │  15 SSR) │ │(Nest │ │ (L4)  │
        │          │ │ JS)  │ │AI추론 │
        └──────────┘ └──┬───┘ └───┬────┘
                        │         │
              ┌─────────┼─────────┤
              │         │         │
        ┌─────┴────┐ ┌──┴───┐ ┌──┴─────┐
        │ AlloyDB  │ │Redis │ │Vertex  │
        │(Postgres)│ │Memory│ │AI (Veo)│
        │          │ │store │ │Gemini  │
        └──────────┘ └──────┘ └────────┘
              │
        ┌─────┴────┐
        │   GCS    │
        │ (영상/   │
        │  이미지) │
        └──────────┘
```

### 4.2 서비스별 GCP 매핑

| NEWKL 서비스 | GCP 서비스 | 스펙 |
|-------------|-----------|------|
| Frontend (Next.js 15) | Cloud Run | 2 vCPU, 4GB RAM |
| API (NestJS 11) | Cloud Run | 4 vCPU, 8GB RAM |
| AI 추론 | Cloud Run + L4 GPU | L4 24GB VRAM |
| 영상 생성 | Vertex AI Veo 3.1 | API 호출 |
| AI 챗봇 | Vertex AI Gemini 2.5 | API 호출 |
| 데이터베이스 | AlloyDB (PostgreSQL) | 4 vCPU, 32GB |
| 캐시 | Memorystore (Redis) | 4GB |
| 파일 저장소 | Cloud Storage | Standard |
| CDN | Cloud CDN + Cloudflare | 글로벌 |
| CI/CD | Cloud Build | 자동 빌드/배포 |
| 모니터링 | Cloud Monitoring | 풀스택 |
| 시크릿 | Secret Manager | API 키 관리 |

### 4.3 예상 월간 비용

| 항목 | 스펙 | 월 비용 (예상) |
|------|------|--------------|
| Cloud Run (Frontend) | 2 인스턴스 상시 | $50~100 |
| Cloud Run (API) | 2 인스턴스 상시 | $100~200 |
| Cloud Run GPU (AI) | L4, 오토스케일 0→4 | $300~1,500 |
| AlloyDB | 4 vCPU, 32GB | $400~600 |
| Memorystore Redis | 4GB | $100~150 |
| Cloud Storage | 1TB | $20~30 |
| Cloud CDN | 100GB 전송 | $10~20 |
| Vertex AI (Veo Lite) | 1,000초/월 | $50 |
| Vertex AI (Gemini) | 100만 토큰/월 | $30~50 |
| Cloud Build | 240분/월 무료 | $0~20 |
| Cloud Monitoring | 기본 무료 | $0~30 |
| **합계** | | **$1,060~2,700/월** |

### 4.4 스케일 단계별 비용

| 단계 | 사용자 | 영상 생성 | 월 비용 |
|------|--------|---------|--------|
| MVP | 100명 | 100개/월 | ~$1,000 |
| Growth | 1,000명 | 1,000개/월 | ~$3,000 |
| Scale | 10,000명 | 10,000개/월 | ~$10,000 |
| Enterprise | 100,000명 | 100,000개/월 | ~$50,000 |

---

## 5. 최종 추천 기술 스택

### 5.1 TO-BE 스택

```
┌─────────────────────────────────────────────┐
│              NEWKL Tech Stack               │
├─────────────────────────────────────────────┤
│ Frontend: Next.js 15 (App Router + PPR)     │
│ Backend:  NestJS 11 (TypeScript 풀스택)     │
│ AI:       Vertex AI Veo 3.1 + Gemini 2.5   │
│ GPU:      Cloud Run + NVIDIA L4 24GB        │
│ DB:       AlloyDB (PostgreSQL 호환)         │
│ Cache:    Memorystore (Redis)               │
│ Storage:  Cloud Storage + Cloud CDN         │
│ CI/CD:    Cloud Build + GitHub Actions      │
│ Monitor:  Cloud Monitoring + Sentry         │
│ Deploy:   Cloud Run (서버리스 컨테이너)     │
└─────────────────────────────────────────────┘
```

### 5.2 전환 로드맵

| Phase | 기간 | 작업 | 목표 |
|-------|------|------|------|
| 1 | Week 1-4 | Next.js 15 전환 + SSR | Lighthouse 90+ |
| 2 | Week 5-8 | NestJS 11 API 구축 | 풀스택 TypeScript |
| 3 | Week 9-12 | GPU 추론 + Veo 연동 | AI 영상 생성 서비스 |
| 4 | Week 13-16 | 글로벌 배포 + 최적화 | TTFB < 50ms, Lighthouse 100 |

### 5.3 핵심 이점

1. **풀스택 TypeScript**: Next.js 15 + NestJS 11 = 하나의 언어로 전체 스택
2. **서버리스 GPU**: Cloud Run L4로 비용 최적화 (0으로 스케일 다운)
3. **AI 네이티브**: Vertex AI Veo + Gemini 직접 통합
4. **글로벌 성능**: Edge Runtime + Cloud CDN = TTFB < 50ms
5. **비용 효율**: MVP $1,000/월부터 시작, 오토스케일

---

## Sources

- [Next.js 15 공식 블로그](https://nextjs.org/blog/next-15)
- [Next.js 15.5 릴리스](https://nextjs.org/blog/next-15-5)
- [NestJS 11 발표](https://trilon.io/blog/announcing-nestjs-11-whats-new)
- [NestJS 11 상세 기능](https://tirnav.com/blog/nestjs-11-whats-new)
- [GCP GPU 가격](https://cloud.google.com/compute/gpus-pricing)
- [GCP GPU 머신 타입](https://docs.cloud.google.com/compute/docs/gpus)
- [Cloud Run GPU 지원](https://docs.cloud.google.com/run/docs/configuring/services/gpu)
- [Cloud Run GPU Best Practices](https://docs.cloud.google.com/run/docs/configuring/services/gpu-best-practices)
- [Vertex AI 가격](https://cloud.google.com/vertex-ai/generative-ai/pricing)
- [Veo 3.1 문서](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate)
- [GCP AI 인프라 at NVIDIA GTC 2026](https://cloud.google.com/blog/products/compute/google-cloud-ai-infrastructure-at-nvidia-gtc-2026)
- [H100 클라우드 가격 비교](https://getdeploying.com/gpus/nvidia-h100)
- [AI Video API 가격 비교 2026](https://devtk.ai/en/blog/ai-video-generation-pricing-2026/)
