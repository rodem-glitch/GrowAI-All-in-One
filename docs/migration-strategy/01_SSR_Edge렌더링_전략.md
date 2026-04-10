# SSR / Edge 렌더링 마이그레이션 전략

> **NEWKL 주식회사** -- AI 고품질 영상 생성 Global No.1  
> 목표: 세계에서 가장 빠르게 렌더링되는 AI Video 플랫폼

---

## 1. 현재 상태 분석

| 항목 | 현황 |
|------|------|
| 번들러 | Vite 6 |
| UI 프레임워크 | React 19 |
| 렌더링 방식 | CSR (Client-Side Rendering) only |
| 초기 로드 | 빈 HTML + JS 번들 다운로드 후 렌더링 |
| SEO | 크롤러가 빈 페이지를 수신, 메타 태그 동적 삽입 불가 |
| 성능 지표 (추정) | TTFB 200-400ms, FCP 1.5-3.0s, LCP 2.0-4.0s |

### CSR 한계

- **초기 화면 공백**: JS 번들(200KB+ gzip)이 다운로드-파싱-실행되기 전까지 빈 화면 노출
- **SEO 불리**: 검색 엔진이 빈 HTML을 인덱싱하므로 Global No.1 브랜딩에 치명적
- **TTFB 지연**: API 호출이 클라이언트에서 시작되어 워터폴 발생
- **Core Web Vitals 저하**: LCP, CLS 지표에서 경쟁사 대비 열위

---

## 2. SSR 마이그레이션 옵션 비교

### 2.1 Next.js 16 App Router (React Server Components)

| 장점 | 단점 |
|------|------|
| React Server Components로 서버 전용 코드 분리 | 프레임워크 종속성 높음 (Vercel 최적화 편향) |
| Streaming SSR + Suspense 기본 지원 | App Router 학습 곡선 |
| 정적/동적 렌더링 페이지 단위 선택 | 번들 크기가 여전히 큼 (React 런타임 필수) |
| 거대한 생태계, 레퍼런스 풍부 | GCP Cloud Run 배포 시 Cold Start 이슈 |
| Partial Prerendering (PPR) 지원 | 마케팅/랜딩 페이지에도 React 런타임 포함 |

**적합도**: 풀스택 앱에 강하나, 정적 마케팅 페이지의 0KB JS 목표 달성 어려움

### 2.2 Remix (Nested Routes + Loader)

| 장점 | 단점 |
|------|------|
| 중첩 라우트 + Loader로 데이터 워터폴 제거 | React 런타임 번들 여전히 필요 |
| 점진적 향상(Progressive Enhancement) 철학 | Next.js 대비 생태계 소규모 |
| Web Fetch API 기반으로 Edge 배포 용이 | 정적 페이지 0KB JS 달성 불가 |
| Form 기반 데이터 뮤테이션 | React 19 Server Components 통합 미성숙 |

**적합도**: 데이터 중심 앱에 적합하나, 초고속 정적 페이지 목표에는 부족

### 2.3 Astro (Islands Architecture, 부분 하이드레이션)

| 장점 | 단점 |
|------|------|
| **정적 페이지 0KB JS** -- HTML/CSS만 전송 | 복잡한 SPA 인터랙션 구현 시 제약 |
| Islands Architecture로 필요한 컴포넌트만 하이드레이션 | React 외 Svelte, Vue 등 혼용 가능하나 팀 학습 필요 |
| Content Collections로 마케팅 콘텐츠 관리 | 풀스택 앱 라우팅은 React Router 등 별도 구성 |
| View Transitions API 기본 지원 | 상태 관리 복잡도 증가 가능 |
| 빌드 타임 최적화로 TTFB 극소화 | 대규모 동적 대시보드에는 부적합 단독 사용 |

**적합도**: 마케팅/랜딩 + 부분 인터랙티브 구간에 최적. **Global No.1 속도 목표에 가장 부합**

### 2.4 Vite SSR (vite-plugin-ssr / Vike)

| 장점 | 단점 |
|------|------|
| 기존 Vite 설정 최대 활용 | 프레임워크 수준 기능 부족 (라우팅, 데이터 로딩 직접 구현) |
| 마이그레이션 비용 최소 | 커뮤니티/생태계 소규모 |
| 유연한 렌더링 전략 선택 | Edge 배포 설정 수동 구성 필요 |
| 번들러 교체 불필요 | 프로덕션 안정성 검증 사례 부족 |

**적합도**: 최소 변경 마이그레이션에 유리하나, 장기적 성능 최적화 한계

### 종합 비교

| 기준 | Next.js 16 | Remix | **Astro** | Vike |
|------|-----------|-------|-----------|------|
| 정적 페이지 0KB JS | X | X | **O** | X |
| TTFB 최적화 | B+ | B+ | **A+** | B |
| SEO | A | A | **A+** | B+ |
| Edge 배포 | A | A | **A** | B |
| 마이그레이션 비용 | 중 | 중 | 중 | 소 |
| 인터랙티브 앱 | A+ | A | B+ | A |
| 생태계 | A+ | B+ | A | C |

---

## 3. Edge Rendering 전략

### 3.1 Cloudflare Workers + D1

```
[사용자] → [Cloudflare Edge (300+ PoP)]
              ├─ Workers: SSR / ISR
              ├─ D1: Edge SQL DB
              ├─ R2: 정적 에셋 스토리지
              └─ KV: 세션 / 캐시
```

| 항목 | 상세 |
|------|------|
| TTFB | < 50ms (Edge에서 HTML 생성) |
| Cold Start | 0ms (V8 Isolates 기반, 컨테이너 아님) |
| 글로벌 커버리지 | 300+ PoP, 한국 서울 포함 |
| 비용 | 무료 10만 요청/일, 이후 $0.50/백만 요청 |
| 제약 | 실행 시간 30s 제한, Node.js API 일부 미지원 |

**판정**: 정적/경량 SSR에 최적. AI Video 처리 등 Heavy 로직은 Origin으로 위임 필요

### 3.2 Vercel Edge Functions

| 항목 | 상세 |
|------|------|
| TTFB | < 80ms |
| 통합성 | Next.js와 완벽 통합 |
| 글로벌 | Vercel Edge Network |
| 비용 | Pro $20/월, 엔터프라이즈 별도 |
| 제약 | Vercel 플랫폼 종속, 타 프레임워크 제한적 |

**판정**: Next.js 선택 시 최적이나, 플랫폼 종속 리스크

### 3.3 GCP Cloud Run (현재 인프라 호환)

```
[사용자] → [Cloud CDN / Cloud Armor]
              └─ [Cloud Run (서울 리전)]
                    ├─ Astro SSR 컨테이너
                    ├─ AlloyDB 연결
                    └─ GCS 정적 에셋
```

| 항목 | 상세 |
|------|------|
| TTFB | 100-200ms (리전 기반, CDN 캐시 시 < 50ms) |
| Cold Start | 1-3s (Min Instances 설정으로 0s 가능) |
| 호환성 | 기존 AlloyDB, Memorystore, GCS 인프라 그대로 사용 |
| 비용 | 사용량 기반, Min Instances 비용 추가 |
| 장점 | Docker 기반으로 어떤 프레임워크든 배포 가능 |

**판정**: 기존 인프라 활용 + 점진적 Edge 전환에 최적

### Edge 전략 추천 조합

```
Phase 1: GCP Cloud Run + Cloud CDN (현재 인프라 활용, 즉시 적용)
Phase 2: Cloudflare Workers 도입 (정적/마케팅 페이지 Edge 렌더링)
Phase 3: 하이브리드 (Edge + Origin 분리 완성)
```

---

## 4. 추천 아키텍처: Astro + React Islands

### 아키텍처 개요

```
                    ┌─────────────────────────────────┐
                    │         Cloudflare CDN           │
                    │    (정적 에셋 + Edge Cache)       │
                    └──────────┬──────────────────────┘
                               │
                    ┌──────────▼──────────────────────┐
                    │      GCP Cloud Run (서울)        │
                    │                                  │
                    │  ┌────────────────────────────┐  │
                    │  │       Astro SSR Server      │  │
                    │  │                            │  │
                    │  │  ┌──────┐  ┌───────────┐  │  │
                    │  │  │ 정적  │  │ React     │  │  │
                    │  │  │ 페이지 │  │ Islands   │  │  │
                    │  │  │ 0KB JS│  │ 선택적     │  │  │
                    │  │  │      │  │ 하이드레이션│  │  │
                    │  │  └──────┘  └───────────┘  │  │
                    │  └────────────────────────────┘  │
                    └──────────────────────────────────┘
                               │
                    ┌──────────▼──────────────────────┐
                    │     Backend Services (GCP)       │
                    │  AlloyDB │ Redis │ GCS │ AI API  │
                    └──────────────────────────────────┘
```

### 페이지별 렌더링 전략

| 페이지 유형 | 렌더링 방식 | JS 전송량 | 목표 LCP |
|------------|-----------|----------|---------|
| 랜딩 페이지 | Static (빌드 타임) | **0KB** | < 0.5s |
| 마케팅/소개 | Static + View Transitions | **0KB** | < 0.5s |
| 가격/요금제 | Static | **0KB** | < 0.5s |
| 로그인/회원가입 | SSR + React Island (폼) | ~15KB | < 0.8s |
| 대시보드 | SSR + React Islands (차트, 목록) | ~45KB | < 1.0s |
| 영상 에디터 | SSR Shell + React Island (에디터) | ~80KB | < 1.2s |
| AI 생성 인터페이스 | SSR + React Island (채팅, 프리뷰) | ~50KB | < 1.0s |

### 성능 목표 (Global No.1 기준)

| 지표 | 현재 (CSR) | 목표 | 경쟁사 평균 |
|------|-----------|------|-----------|
| **TTFB** | 200-400ms | **< 100ms** | 150-300ms |
| **FCP** | 1.5-3.0s | **< 0.5s** | 1.0-2.0s |
| **LCP** | 2.0-4.0s | **< 1.0s** | 1.5-2.5s |
| **CLS** | 0.1-0.3 | **< 0.05** | 0.1-0.2 |
| **INP** | 100-300ms | **< 50ms** | 100-200ms |
| **Total JS** | 200KB+ | **0-80KB** (페이지별) | 150-300KB |

### Islands 하이드레이션 전략

```astro
---
// 랜딩 페이지: JS 0KB -- 순수 HTML/CSS
---
<Layout>
  <HeroSection />           <!-- 정적 HTML -->
  <FeatureShowcase />       <!-- 정적 HTML + CSS 애니메이션 -->
  <PricingTable />          <!-- 정적 HTML -->
  <TestimonialCarousel      <!-- React Island: 인터랙션 필요 시만 로드 -->
    client:visible
  />
  <ContactForm              <!-- React Island: 뷰포트 진입 시 로드 -->
    client:visible
  />
</Layout>
```

```astro
---
// 대시보드: 필요한 부분만 React Island
import DashboardChart from '../components/DashboardChart';
import VideoList from '../components/VideoList';

const stats = await fetch('/api/stats').then(r => r.json());
---
<DashboardLayout>
  <StatsOverview data={stats} />    <!-- 정적 서버 렌더링 -->
  <DashboardChart                    <!-- React Island -->
    client:load
    data={stats.chart}
  />
  <VideoList                         <!-- React Island: 스크롤 시 로드 -->
    client:visible
  />
</DashboardLayout>
```

### 핵심 기술 구성

| 레이어 | 기술 | 역할 |
|--------|------|------|
| 메타 프레임워크 | **Astro 5** | 정적 생성 + 선택적 SSR |
| UI Islands | **React 19** | 인터랙티브 컴포넌트 |
| 스타일링 | **Tailwind CSS 4** | 유틸리티 CSS, 미사용 제거 |
| 상태 관리 | **Zustand** (Island 내부) | 경량 상태 관리 |
| 데이터 페칭 | **Astro Server** + **TanStack Query** (Island) | 서버/클라이언트 데이터 |
| 빌드 | **Vite 6** (Astro 내장) | 기존 Vite 플러그인 재활용 |
| 배포 | **GCP Cloud Run** + **Cloud CDN** | 서버 렌더링 + CDN 캐시 |

---

## 5. 마이그레이션 로드맵 (4주)

### Week 1: 기반 구축 + 랜딩 페이지

| 일차 | 작업 | 산출물 |
|------|------|--------|
| Day 1-2 | Astro 프로젝트 초기화, React 통합 설정 | `astro.config.mjs`, 프로젝트 구조 |
| Day 3 | 공통 레이아웃, 헤더/푸터 마이그레이션 | `Layout.astro`, 공통 컴포넌트 |
| Day 4-5 | 랜딩 페이지 마이그레이션 (0KB JS 목표) | 정적 랜딩 페이지 완성 |

**마일스톤**: 랜딩 페이지 LCP < 0.5s 달성

### Week 2: 마케팅 페이지 + 인증

| 일차 | 작업 | 산출물 |
|------|------|--------|
| Day 6-7 | 마케팅/소개/가격 페이지 마이그레이션 | 정적 마케팅 페이지 (0KB JS) |
| Day 8-9 | 로그인/회원가입 React Island 구현 | 인증 플로우 완성 |
| Day 10 | Cloud Run 배포 파이프라인 구축 | CI/CD, Dockerfile |

**마일스톤**: 마케팅 사이트 전체 0KB JS, 인증 플로우 동작

### Week 3: 대시보드 + 핵심 기능

| 일차 | 작업 | 산출물 |
|------|------|--------|
| Day 11-12 | 대시보드 SSR + React Islands 구현 | 대시보드 페이지 |
| Day 13-14 | AI 생성 인터페이스 React Island | AI 인터페이스 동작 |
| Day 15 | 영상 에디터 React Island 통합 | 에디터 기본 동작 |

**마일스톤**: 핵심 기능 페이지 LCP < 1.0s 달성

### Week 4: 최적화 + 전환

| 일차 | 작업 | 산출물 |
|------|------|--------|
| Day 16-17 | Cloud CDN 설정, 에셋 최적화 | CDN 캐시 정책, 이미지 최적화 |
| Day 18-19 | 성능 테스트, Core Web Vitals 검증 | Lighthouse 100점 목표 |
| Day 20 | 기존 SPA에서 트래픽 전환 (Blue-Green) | 프로덕션 배포 완료 |

**마일스톤**: 전체 사이트 TTFB < 100ms, 프로덕션 전환 완료

### 전체 타임라인

```
Week 1          Week 2          Week 3          Week 4
├─ 기반 구축 ───┤                                        
├─ 랜딩 0KB JS ─┤                                        
                ├─ 마케팅 0KB ──┤                         
                ├─ 인증 Island ─┤                         
                                ├─ 대시보드 ────┤          
                                ├─ AI/에디터 ───┤          
                                                ├─ 최적화 ┤
                                                ├─ 전환 ──┤
```

---

## 6. 리스크 및 대응 방안

### 기술 리스크

| 리스크 | 영향도 | 발생 확률 | 대응 방안 |
|--------|--------|----------|----------|
| Astro Islands 간 상태 공유 복잡성 | 높음 | 중 | 공유 상태는 `nanostores`로 Islands 간 동기화. 복잡한 플로우는 단일 Island으로 통합 |
| React 컴포넌트 Astro 호환성 이슈 | 중 | 중 | 마이그레이션 전 컴포넌트 호환성 테스트 매트릭스 작성. 비호환 컴포넌트는 Astro 네이티브로 재작성 |
| SSR Cold Start로 TTFB 목표 미달 | 높음 | 낮 | Cloud Run Min Instances 1 이상 유지. Cloud CDN 캐시 적극 활용 (TTL 설정) |
| 영상 에디터 Island 크기 과대 | 중 | 중 | 코드 스플리팅 + `client:only` 디렉티브로 서버 렌더링 건너뛰기. 웹워커로 Heavy 로직 분리 |

### 비즈니스 리스크

| 리스크 | 영향도 | 발생 확률 | 대응 방안 |
|--------|--------|----------|----------|
| 마이그레이션 중 서비스 장애 | 높음 | 낮 | Blue-Green 배포로 즉시 롤백 가능. 기존 SPA는 2주간 병행 운영 |
| 4주 일정 초과 | 중 | 중 | 우선순위 기반 점진적 전환. 랜딩/마케팅 먼저 전환하여 즉시 SEO/성능 개선 효과 확보 |
| 팀원 Astro 학습 곡선 | 중 | 중 | Week 1에 1일 워크숍 진행. 기존 React 지식 최대 활용 (Islands = React 컴포넌트) |
| SEO 순위 일시 하락 | 중 | 낮 | 301 리다이렉트 매핑 사전 준비. Google Search Console 모니터링 강화 |

### 롤백 전략

```
[Astro 신규 사이트] ←──── Cloud CDN ────→ [기존 Vite SPA]
                              │
                        트래픽 가중치 조절
                        (10% → 50% → 100%)
                              │
                     문제 발생 시 즉시 0%로 롤백
```

- Cloud CDN의 URL Map을 활용한 가중치 기반 트래픽 분배
- 5분 이내 롤백 가능한 구조 유지
- 마이그레이션 완료 후 2주간 기존 SPA 인프라 유지

---

## 결론

**NEWKL의 Global No.1 AI Video Company 브랜딩에 걸맞은 초고속 웹 성능을 달성하기 위해 Astro + React Islands 아키텍처를 추천합니다.**

- 마케팅/랜딩 페이지: **JS 0KB**, LCP < 0.5s -- 경쟁사 압도
- 앱 영역: **선택적 하이드레이션**으로 최소 JS, LCP < 1.0s
- 인프라: **GCP Cloud Run + Cloud CDN** 기존 인프라 활용으로 전환 비용 최소화
- 4주 내 프로덕션 전환 완료, Blue-Green 배포로 무중단 마이그레이션

> 세계에서 가장 빠른 AI Video 플랫폼 -- 이것이 NEWKL의 기술 브랜딩입니다.
