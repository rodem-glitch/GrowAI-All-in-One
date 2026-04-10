# Core Web Vitals 최적화 전략

**프로젝트**: NEWKL 주식회사 AI Video Global No.1 웹사이트  
**문서 버전**: 1.0  
**작성일**: 2026-04-10  
**목적**: 현행 SPA 구조의 Core Web Vitals 문제 분석 및 최적화 로드맵 수립

---

## 1. 현재 SPA의 Core Web Vitals 문제점

### 1.1 LCP (Largest Contentful Paint) — 초기 로딩 지연

현재 CSR(Client-Side Rendering) 기반 SPA 구조에서 발생하는 근본적 문제:

- **빈 HTML 전달**: 서버가 빈 `<div id="root">` 만 전달하므로 브라우저가 JS를 다운로드, 파싱, 실행할 때까지 의미 있는 콘텐츠가 렌더링되지 않음
- **렌더 블로킹 JS 번들**: 전체 애플리케이션 코드가 하나의 번들로 로드되어 LCP 요소(Hero 이미지, 헤드라인 텍스트)의 렌더링이 지연
- **API 워터폴**: JS 실행 후 데이터 fetch가 시작되는 직렬 워터폴 구조
- **현재 추정치**: LCP 2.5~4.0s (모바일 3G 환경 기준)

```
[현재 CSR 흐름]
HTML 다운로드 → JS 다운로드 → JS 파싱/실행 → API 호출 → 데이터 수신 → 렌더링
|_________________________________________ LCP 발생 ___|
```

### 1.2 FID/INP (First Input Delay / Interaction to Next Paint) — 인터랙션 지연

- **메인 스레드 블로킹**: 대형 JS 번들(추정 500KB+ gzipped)의 파싱 및 하이드레이션이 메인 스레드를 장시간 점유
- **Long Task 다수 발생**: 번들 평가 시 50ms 초과 Long Task가 반복적으로 발생
- **이벤트 핸들러 지연**: 복잡한 상태 관리(Redux/Zustand) 업데이트가 동기적으로 처리되어 입력 응답 지연
- **현재 추정치**: INP 200~500ms

### 1.3 CLS (Cumulative Layout Shift) — 레이아웃 이동

- **이미지 크기 미지정**: 동적으로 로드되는 AI 생성 비디오 썸네일에 width/height 미지정
- **웹폰트 FOUT/FOIT**: 커스텀 폰트 로딩 시 텍스트 크기가 변경되며 레이아웃 이동 발생
- **동적 콘텐츠 삽입**: 광고 배너, 공지사항, 추천 콘텐츠 등이 로드 후 삽입되며 기존 콘텐츠를 밀어냄
- **현재 추정치**: CLS 0.15~0.35

---

## 2. 목표 수치

Google "Good" 기준을 초과 달성하는 것을 목표로 한다.

| 지표 | Google "Good" 기준 | 목표 수치 | 비고 |
|------|-------------------|-----------|------|
| **LCP** | < 2.5s | **< 1.0s (목표 0.8s)** | SSR + Edge 캐싱으로 달성 |
| **INP** | < 200ms | **< 100ms (목표 50ms)** | 코드 분할 + Web Workers |
| **CLS** | < 0.1 | **< 0.05** | aspect-ratio + Skeleton UI |
| **TTFB** | < 800ms | **< 200ms (Edge: < 50ms)** | Edge Runtime + CDN |
| **FCP** | < 1.8s | **< 0.8s** | Critical CSS 인라인 |
| **TTI** | < 3.8s | **< 1.5s** | 선택적 하이드레이션 |

### 달성 기준

- **P75 기준**: 전체 사용자의 75번째 백분위수에서 목표 수치 달성
- **모바일 4G 기준**: Moto G Power + 4G 환경에서 측정
- **글로벌 기준**: 한국, 미국, 일본, 유럽 주요 지역 CrUX 데이터 기준

---

## 3. LCP 최적화 전략

### 3.1 Hero 이미지 최적화

#### 차세대 이미지 포맷 적용

```html
<picture>
  <source
    type="image/avif"
    srcset="
      /images/hero-400w.avif 400w,
      /images/hero-800w.avif 800w,
      /images/hero-1200w.avif 1200w,
      /images/hero-1920w.avif 1920w
    "
    sizes="100vw"
  />
  <source
    type="image/webp"
    srcset="
      /images/hero-400w.webp 400w,
      /images/hero-800w.webp 800w,
      /images/hero-1200w.webp 1200w,
      /images/hero-1920w.webp 1920w
    "
    sizes="100vw"
  />
  <img
    src="/images/hero-1200w.jpg"
    alt="AI Video 글로벌 No.1 플랫폼"
    width="1920"
    height="1080"
    fetchpriority="high"
    decoding="async"
  />
</picture>
```

#### Priority Preload 적용

```html
<head>
  <link
    rel="preload"
    as="image"
    href="/images/hero-1200w.avif"
    type="image/avif"
    fetchpriority="high"
    imagesrcset="
      /images/hero-400w.avif 400w,
      /images/hero-800w.avif 800w,
      /images/hero-1200w.avif 1200w,
      /images/hero-1920w.avif 1920w
    "
    imagesizes="100vw"
  />
</head>
```

#### Next.js Image 컴포넌트 활용

```tsx
import Image from 'next/image';

export function HeroSection() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="AI Video 글로벌 No.1 플랫폼"
      width={1920}
      height={1080}
      priority
      sizes="100vw"
      quality={85}
      placeholder="blur"
      blurDataURL={shimmerBase64}
    />
  );
}
```

### 3.2 폰트 최적화

#### font-display: swap 적용

```css
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Regular.subset.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+AC00-D7A3, U+0020-007E; /* 한글 + 기본 라틴 */
}
```

#### Preconnect 설정

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://cdn.newkl.com" crossorigin />
</head>
```

#### 서브셋 폰트 사용

- 전체 폰트(2MB+) 대신 자주 사용하는 글리프만 포함한 서브셋(50~100KB) 사용
- `pyftsubset` 또는 `glyphhanger`로 서브셋 생성
- WOFF2 포맷 우선 적용 (Brotli 압축)

### 3.3 Critical CSS 인라인

#### 전략

```
1단계: Critical CSS 추출 (Above-the-fold 렌더링에 필요한 CSS)
2단계: <style> 태그로 HTML <head>에 인라인
3단계: 나머지 CSS는 비동기 로드
```

#### 구현

```html
<head>
  <!-- Critical CSS 인라인 -->
  <style>
    /* Above-the-fold에 필요한 최소 CSS (~15KB 이하 유지) */
    :root { --color-primary: #0066ff; }
    .hero { min-height: 100vh; display: flex; align-items: center; }
    .nav { position: fixed; top: 0; width: 100%; z-index: 100; }
    /* ... */
  </style>

  <!-- 나머지 CSS 비동기 로드 -->
  <link
    rel="preload"
    href="/styles/main.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  <noscript><link rel="stylesheet" href="/styles/main.css" /></noscript>
</head>
```

### 3.4 서버사이드 렌더링 (SSR/SSG)

- **SSG (Static Site Generation)**: 랜딩 페이지, 소개 페이지 등 정적 콘텐츠
- **SSR (Server-Side Rendering)**: 사용자별 대시보드, 동적 콘텐츠
- **ISR (Incremental Static Regeneration)**: 블로그, 도움말 등 준정적 콘텐츠
- **Streaming SSR**: React Suspense를 활용한 점진적 HTML 스트리밍

```
[최적화 후 SSR 흐름]
HTML 다운로드(콘텐츠 포함) → FCP/LCP 발생 → JS 다운로드 → 하이드레이션
|_____ LCP < 1.0s _____|
```

---

## 4. INP 최적화 전략

### 4.1 React 동시성 기능 활용

#### useTransition — 비긴급 상태 업데이트 분리

```tsx
import { useTransition } from 'react';

function SearchFilter({ onFilter }: { onFilter: (query: string) => void }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // 입력 필드 업데이트는 즉시 반영
    setInputValue(e.target.value);

    // 필터링 결과 업데이트는 낮은 우선순위로 처리
    startTransition(() => {
      onFilter(e.target.value);
    });
  }

  return (
    <>
      <input onChange={handleChange} />
      {isPending && <Spinner />}
    </>
  );
}
```

#### useDeferredValue — 렌더링 지연

```tsx
import { useDeferredValue, useMemo } from 'react';

function VideoList({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const filteredVideos = useMemo(
    () => videos.filter(v => v.title.includes(deferredQuery)),
    [deferredQuery]
  );

  return (
    <div style={{ opacity: isStale ? 0.7 : 1 }}>
      {filteredVideos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
```

### 4.2 Web Workers로 Heavy Computation 분리

#### Worker 파일 생성

```typescript
// workers/video-processor.worker.ts
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'ANALYZE_METADATA': {
      const result = processVideoMetadata(payload);
      self.postMessage({ type: 'METADATA_RESULT', payload: result });
      break;
    }
    case 'GENERATE_THUMBNAILS': {
      const thumbnails = generateThumbnailGrid(payload);
      self.postMessage({ type: 'THUMBNAILS_RESULT', payload: thumbnails });
      break;
    }
  }
});

function processVideoMetadata(data: ArrayBuffer): VideoMetadata {
  // 무거운 메타데이터 파싱을 Worker 스레드에서 처리
  // 메인 스레드 블로킹 방지
  // ...
}
```

#### React Hook으로 Worker 래핑

```typescript
// hooks/useWorker.ts
import { useEffect, useRef, useCallback } from 'react';

export function useVideoWorker() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/video-processor.worker.ts', import.meta.url)
    );
    return () => workerRef.current?.terminate();
  }, []);

  const analyzeMetadata = useCallback((data: ArrayBuffer) => {
    return new Promise<VideoMetadata>((resolve) => {
      const worker = workerRef.current!;
      worker.onmessage = (e) => {
        if (e.data.type === 'METADATA_RESULT') {
          resolve(e.data.payload);
        }
      };
      worker.postMessage(
        { type: 'ANALYZE_METADATA', payload: data },
        [data] // Transferable로 전달하여 복사 비용 제거
      );
    });
  }, []);

  return { analyzeMetadata };
}
```

### 4.3 requestIdleCallback 활용

```typescript
// utils/idle-task.ts
type IdleTask = () => void;

const taskQueue: IdleTask[] = [];
let isProcessing = false;

export function scheduleIdleTask(task: IdleTask, timeout = 2000) {
  taskQueue.push(task);

  if (!isProcessing) {
    isProcessing = true;
    requestIdleCallback(processQueue, { timeout });
  }
}

function processQueue(deadline: IdleDeadline) {
  while (taskQueue.length > 0 && deadline.timeRemaining() > 0) {
    const task = taskQueue.shift();
    task?.();
  }

  if (taskQueue.length > 0) {
    requestIdleCallback(processQueue, { timeout: 2000 });
  } else {
    isProcessing = false;
  }
}

// 사용 예시: 비필수 분석 데이터 전송
scheduleIdleTask(() => {
  analytics.track('page_view', { page: '/dashboard' });
});

// 사용 예시: 비필수 UI 업데이트
scheduleIdleTask(() => {
  prefetchNextPageData();
});
```

### 4.4 코드 분할 및 지연 로딩

```typescript
// 라우트 기반 코드 분할
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const EditorPage = lazy(() => import('./pages/Editor'));

// 컴포넌트 기반 코드 분할
const VideoPlayer = lazy(() => import('./components/VideoPlayer'));
const AnalyticsChart = lazy(() => import('./components/AnalyticsChart'));

// 인터랙션 기반 코드 분할 (버튼 클릭 시 로드)
function ExportButton() {
  async function handleExport() {
    const { exportVideo } = await import('./utils/video-export');
    await exportVideo(videoId);
  }

  return <button onClick={handleExport}>내보내기</button>;
}
```

---

## 5. CLS 최적화 전략

### 5.1 이미지/비디오 aspect-ratio 고정

#### CSS aspect-ratio 속성 활용

```css
/* 비디오 썸네일 — 16:9 비율 고정 */
.video-thumbnail {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
  background-color: #1a1a2e; /* 로딩 중 배경색 */
}

/* 프로필 이미지 — 1:1 비율 고정 */
.avatar {
  aspect-ratio: 1 / 1;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
}

/* 반응형 비디오 플레이어 */
.video-player-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 1280px;
  contain: layout; /* 레이아웃 격리 */
}
```

#### 이미지 명시적 크기 지정

```html
<!-- 항상 width/height 속성을 명시하여 브라우저가 공간을 미리 확보 -->
<img
  src="/thumbnails/video-001.webp"
  alt="AI 비디오 생성 튜토리얼"
  width="640"
  height="360"
  loading="lazy"
  decoding="async"
/>
```

### 5.2 폰트 사이즈 조정 (size-adjust)

#### @font-face size-adjust 적용

```css
/* 시스템 폴백 폰트와 커스텀 폰트 간 크기 차이를 보정 */
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
  size-adjust: 100.5%;        /* 폴백 폰트와 크기 맞춤 */
  ascent-override: 95%;       /* 상승 높이 보정 */
  descent-override: 22%;      /* 하강 높이 보정 */
  line-gap-override: 0%;      /* 줄 간격 보정 */
}

/* 폴백 폰트 스택 — 메트릭 일치 */
body {
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    system-ui,
    sans-serif;
}
```

#### Next.js next/font 활용 (자동 size-adjust)

```tsx
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: '../fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
  adjustFontFallback: true, // 자동으로 size-adjust 계산
  preload: true,
});
```

### 5.3 Skeleton UI

#### 범용 Skeleton 컴포넌트

```tsx
// components/Skeleton.tsx
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = '1em',
  borderRadius = '4px',
  className,
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className ?? ''}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}

// 비디오 카드 스켈레톤
export function VideoCardSkeleton() {
  return (
    <div className="video-card-skeleton">
      <Skeleton height={0} className="aspect-video" />
      <div className="p-4 space-y-2">
        <Skeleton height="1.2em" width="80%" />
        <Skeleton height="1em" width="60%" />
        <Skeleton height="0.9em" width="40%" />
      </div>
    </div>
  );
}
```

#### Skeleton CSS 애니메이션

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #e2e2e2 25%,
    #f0f0f0 50%,
    #e2e2e2 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    opacity: 0.7;
  }
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 5.4 동적 콘텐츠 삽입 전략

```css
/* 광고/배너 슬롯 — 고정 높이 예약 */
.ad-slot {
  min-height: 90px;   /* 배너 광고 높이 */
  contain: layout style;
  content-visibility: auto;
}

/* 공지사항 영역 — 접힘/펼침에도 레이아웃 안정 */
.notification-bar {
  min-height: 48px;
  contain: layout;
}

/* 무한 스크롤 — 콘텐츠 높이 예측 */
.video-grid-item {
  contain: layout style paint;
  content-visibility: auto;
  contain-intrinsic-size: 0 320px; /* 예상 높이 */
}
```

---

## 6. 측정 도구

### 6.1 Lighthouse CI

#### 설정 파일

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": [
        "https://www.newkl.com/",
        "https://www.newkl.com/products",
        "https://www.newkl.com/pricing",
        "https://www.newkl.com/dashboard"
      ],
      "numberOfRuns": 5,
      "settings": {
        "preset": "desktop",
        "chromeFlags": "--no-sandbox --disable-gpu"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 1000 }],
        "interactive": ["error", { "maxNumericValue": 1500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "total-blocking-time": ["error", { "maxNumericValue": 100 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### 6.2 Web Vitals JS 라이브러리

#### 실시간 측정 및 리포팅

```typescript
// lib/web-vitals.ts
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

interface VitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
}

function sendToAnalytics(metric: VitalMetric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    page: window.location.pathname,
    userAgent: navigator.userAgent,
    connectionType: (navigator as any).connection?.effectiveType ?? 'unknown',
    timestamp: Date.now(),
  });

  // Beacon API로 페이지 언로드 시에도 안전하게 전송
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals', body);
  } else {
    fetch('/api/vitals', {
      method: 'POST',
      body,
      keepalive: true,
    });
  }
}

// 모든 Core Web Vitals 측정 등록
export function initWebVitals() {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
```

### 6.3 CrUX Dashboard

- **Google Search Console**: Core Web Vitals 리포트에서 실제 사용자 데이터 확인
- **CrUX Dashboard (Data Studio)**: 월별 추세 분석 및 경쟁사 비교
- **BigQuery CrUX 데이터셋**: 커스텀 쿼리로 세분화 분석

```sql
-- BigQuery: 페이지별 LCP P75 추세
SELECT
  yyyymm,
  origin,
  p75_lcp,
  p75_inp,
  p75_cls
FROM
  `chrome-ux-report.materialized.metrics_summary`
WHERE
  origin = 'https://www.newkl.com'
ORDER BY
  yyyymm DESC
LIMIT 12;
```

### 6.4 추가 도구

| 도구 | 용도 | 환경 |
|------|------|------|
| Chrome DevTools Performance | 프레임별 분석, Long Task 식별 | 개발 |
| WebPageTest | 다중 지역/디바이스 테스트 | 스테이징 |
| SpeedCurve | 경쟁사 벤치마크, 지속 모니터링 | 프로덕션 |
| Sentry Performance | 실사용자 트랜잭션 모니터링 | 프로덕션 |

---

## 7. 자동화: GitHub Actions Lighthouse 점수 게이트

### 7.1 Lighthouse CI GitHub Action

```yaml
# .github/workflows/lighthouse-ci.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build application
        run: pnpm build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.STAGING_API_URL }}

      - name: Start server
        run: pnpm start &
        env:
          PORT: 3000

      - name: Wait for server
        run: npx wait-on http://localhost:3000 --timeout 30000

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Performance Budget Check
        run: |
          echo "## Lighthouse 성능 점수" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| 지표 | 점수 | 기준 | 결과 |" >> $GITHUB_STEP_SUMMARY
          echo "|------|------|------|------|" >> $GITHUB_STEP_SUMMARY
```

### 7.2 번들 사이즈 게이트

```yaml
# .github/workflows/bundle-check.yml
name: Bundle Size Check

on:
  pull_request:
    branches: [main]

jobs:
  bundle-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Build and analyze
        run: |
          pnpm build
          pnpm exec next-bundle-analyzer

      - name: Check bundle budget
        uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          build_script: build
          skip_step: build
```

### 7.3 성능 예산 설정

```json
// .size-limit.json
[
  {
    "name": "전체 JS (First Load)",
    "path": ".next/static/**/*.js",
    "limit": "150 kB",
    "gzip": true
  },
  {
    "name": "메인 페이지 JS",
    "path": ".next/static/chunks/pages/index-*.js",
    "limit": "50 kB",
    "gzip": true
  },
  {
    "name": "공통 CSS",
    "path": ".next/static/css/*.css",
    "limit": "30 kB",
    "gzip": true
  }
]
```

### 7.4 PR 코멘트 자동 리포트

```yaml
      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          header: lighthouse
          message: |
            ## Lighthouse 성능 리포트

            | 지표 | 현재 | 목표 | 상태 |
            |------|------|------|------|
            | LCP | ${{ steps.lhci.outputs.lcp }} | < 1.0s | ${{ steps.lhci.outputs.lcp < 1000 && '통과' || '실패' }} |
            | INP | ${{ steps.lhci.outputs.inp }} | < 100ms | ${{ steps.lhci.outputs.inp < 100 && '통과' || '실패' }} |
            | CLS | ${{ steps.lhci.outputs.cls }} | < 0.05 | ${{ steps.lhci.outputs.cls < 0.05 && '통과' || '실패' }} |
            | Performance Score | ${{ steps.lhci.outputs.performance }} | > 95 | ${{ steps.lhci.outputs.performance > 0.95 && '통과' || '실패' }} |

            [상세 리포트 보기](${{ steps.lhci.outputs.resultsUrl }})
```

---

## 부록: 최적화 체크리스트

### 배포 전 필수 확인 항목

- [ ] Hero 이미지에 `fetchpriority="high"` 및 `priority` 적용
- [ ] Above-the-fold 이미지에 `loading="eager"`, Below-the-fold에 `loading="lazy"` 적용
- [ ] 모든 이미지에 `width`/`height` 또는 `aspect-ratio` 지정
- [ ] 웹폰트에 `font-display: swap` 적용
- [ ] 폰트 서브셋 생성 및 WOFF2 포맷 사용
- [ ] Critical CSS 인라인 적용 (15KB 이하)
- [ ] Third-party 스크립트에 `async`/`defer` 적용
- [ ] 라우트 기반 코드 분할 적용
- [ ] Skeleton UI로 레이아웃 예약
- [ ] `content-visibility: auto` 적용 (Below-the-fold 콘텐츠)
- [ ] Web Workers로 heavy computation 분리
- [ ] Lighthouse CI 점수 게이트 통과 확인
- [ ] 번들 사이즈 예산 초과 여부 확인

### 모니터링 주기

| 항목 | 주기 | 담당 |
|------|------|------|
| Lighthouse CI (자동) | 매 PR | CI/CD |
| CrUX 데이터 리뷰 | 주 1회 | 프론트엔드 팀 |
| 성능 회귀 분석 | 릴리즈 후 24시간 | DevOps |
| 경쟁사 벤치마크 | 월 1회 | 프로덕트 팀 |
