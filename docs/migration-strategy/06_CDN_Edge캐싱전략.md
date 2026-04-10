# 06. CDN / Edge 캐싱 전략

> NEWKL Global No.1 AI Video 웹사이트 — 글로벌 콘텐츠 전송 및 Edge 캐싱 아키텍처

---

## 1. 글로벌 CDN 아키텍처

### 1.1 멀티 CDN 구성

| 계층 | 제공자 | 역할 |
|------|--------|------|
| **Primary** | GCP Cloud CDN | 기존 GCP 인프라와 통합, Origin Shield, Cloud Storage 연동 |
| **Secondary** | Cloudflare | DDoS 보호, WAF, Edge Workers, HTTP/3 지원 |

- Primary CDN(GCP Cloud CDN)은 Cloud Run / Cloud Storage Origin과 직접 연결하여 최소 지연 보장
- Secondary CDN(Cloudflare)은 DNS 레벨에서 트래픽을 수신하고, DDoS 방어 및 Edge Computing 처리 후 GCP Origin으로 프록시
- 장애 시 자동 Failover: Cloudflare Health Check로 GCP CDN 장애 감지 시 Cloudflare 캐시에서 직접 서빙

### 1.2 글로벌 POP(Point of Presence) 배치

```
┌─────────────────────────────────────────────────────────┐
│                    글로벌 POP 배치                       │
├──────────┬──────────────────┬───────────────────────────┤
│  리전     │  POP 위치         │  커버 지역               │
├──────────┼──────────────────┼───────────────────────────┤
│  아시아   │  서울 (ICN)       │  한국, 북한              │
│          │  도쿄 (NRT)       │  일본                    │
│          │  싱가포르 (SIN)    │  동남아시아              │
├──────────┼──────────────────┼───────────────────────────┤
│  북미     │  버지니아 (IAD)   │  미국 동부, 캐나다 동부   │
│          │  오레곤 (PDX)     │  미국 서부, 캐나다 서부    │
├──────────┼──────────────────┼───────────────────────────┤
│  유럽     │  런던 (LHR)       │  영국, 서유럽            │
│          │  프랑크푸르트 (FRA)│  독일, 중부/동부 유럽     │
└──────────┴──────────────────┴───────────────────────────┘
```

### 1.3 Origin Shield

- GCP Cloud CDN의 Origin Shield를 **asia-northeast3(서울)** 에 설정
- 모든 Cache Miss 요청이 Origin Shield를 거쳐 Origin 서버 부하 최소화
- Cache Fill 트래픽 70% 이상 절감 목표

---

## 2. 캐싱 정책

### 2.1 리소스 유형별 Cache-Control 헤더

| 리소스 유형 | Cache-Control 값 | TTL | 설명 |
|------------|------------------|-----|------|
| **Static Assets** (JS/CSS/이미지) | `public, max-age=31536000, immutable` | 1년 | 파일명에 해시 포함, 변경 시 새 URL 생성 |
| **HTML** | `no-cache` | 항상 revalidate | 매 요청 시 Origin에서 유효성 검증 |
| **API 응답** | `private, max-age=60, stale-while-revalidate=300` | 1분 + 5분 SWR | 사용자별 데이터, Edge 캐시 불가 |
| **웹 폰트** | `public, max-age=31536000` | 1년 | WOFF2 형식 우선 사용 |
| **비디오 매니페스트** (HLS/DASH) | `public, max-age=5, stale-while-revalidate=10` | 5초 + 10초 SWR | 라이브 스트리밍 대응 |
| **비디오 세그먼트** | `public, max-age=86400` | 24시간 | VOD 세그먼트는 불변 |

### 2.2 캐시 키 설계

```
캐시 키 구성 요소:
  - URL 경로 + 쿼리 파라미터
  - Accept-Encoding (br, gzip, identity)
  - Accept-Language (지역별 콘텐츠 분기 시)

제외 항목:
  - Cookie (인증 토큰 등)
  - User-Agent
  - 불필요한 쿼리 파라미터 (utm_*, fbclid 등)
```

### 2.3 캐시 무효화 전략

```
┌─────────────────────────────────────────────┐
│           캐시 무효화 흐름                    │
│                                             │
│  배포 트리거 ──→ CI/CD Pipeline             │
│                    │                        │
│         ┌──────────┴──────────┐             │
│         ▼                     ▼             │
│  GCP CDN Invalidation   Cloudflare Purge    │
│  (URL 패턴 기반)         (태그 기반 Purge)   │
│         │                     │             │
│         └──────────┬──────────┘             │
│                    ▼                        │
│           전체 전파 완료 (< 30초)            │
└─────────────────────────────────────────────┘
```

- **URL 패턴 기반 무효화**: 배포 시 변경된 리소스 경로만 선택적 무효화
- **태그 기반 Purge**: Cloudflare Cache Tags로 관련 리소스 그룹 일괄 무효화
- **Surrogate Key**: 비디오 콘텐츠별 Surrogate Key 부여, 콘텐츠 수정 시 해당 키로 즉시 무효화

---

## 3. Edge Computing

### 3.1 A/B 테스트 라우팅

```
사용자 요청
    │
    ▼
┌─────────────────────────┐
│   Cloudflare Worker     │
│                         │
│  1. 쿠키에서 실험 그룹  │
│     확인                │
│  2. 없으면 해시 기반    │
│     그룹 배정           │
│  3. 해당 그룹의 Origin  │
│     으로 라우팅         │
│  4. 응답에 그룹 쿠키    │
│     설정                │
└─────────────────────────┘
```

- Edge에서 A/B 분기 처리로 Origin 부하 제거
- 실험 설정은 KV Store에 저장하여 실시간 변경 가능
- 분석 데이터는 Logpush로 BigQuery에 적재

### 3.2 지역별 언어 자동 감지

```javascript
// Cloudflare Worker 예시
export default {
  async fetch(request) {
    const country = request.cf.country;       // 국가 코드
    const acceptLang = request.headers.get('Accept-Language');

    const langMap = {
      KR: 'ko', JP: 'ja', CN: 'zh',
      US: 'en', GB: 'en', DE: 'de', FR: 'fr',
      SG: 'en', TH: 'th', VN: 'vi'
    };

    const detectedLang = langMap[country] || parseAcceptLanguage(acceptLang) || 'en';

    // 언어별 캐시 키 분리 + Origin에 언어 헤더 전달
    const modifiedRequest = new Request(request, {
      headers: { ...request.headers, 'X-Detected-Language': detectedLang }
    });

    return fetch(modifiedRequest);
  }
};
```

- `Vary: Accept-Language` 대신 Edge에서 정규화하여 캐시 효율 극대화
- 지원 언어: 한국어, 영어, 일본어, 중국어(간체), 독일어, 프랑스어

### 3.3 Bot 감지 및 프리렌더링

| 구분 | 처리 방식 |
|------|----------|
| **검색 엔진 봇** (Googlebot, Bingbot 등) | Edge에서 감지 후 프리렌더링된 HTML 반환 |
| **소셜 미디어 크롤러** (Facebook, Twitter, KakaoTalk) | OG 메타 태그가 포함된 경량 HTML 반환 |
| **악성 봇** | Cloudflare Bot Management로 차단 |
| **일반 사용자** | SPA/SSR 정상 응답 |

- 프리렌더링 결과는 Cloud Storage에 저장, Edge 캐시에서 서빙
- 프리렌더링 갱신 주기: 콘텐츠 변경 시 + 매 24시간 배치 갱신

---

## 4. Service Worker (오프라인 캐싱)

### 4.1 Workbox 기반 구성

```javascript
// service-worker.js (Workbox 기반)
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// 1. 핵심 자산 Precache (빌드 시 자동 생성된 매니페스트)
precacheAndRoute(self.__WB_MANIFEST);

// 2. 이미지: CacheFirst (최대 200개, 30일)
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 }),
      new CacheableResponsePlugin({ statuses: [0, 200] })
    ]
  })
);

// 3. API 응답: StaleWhileRevalidate (최대 100개, 1시간)
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 }),
      new CacheableResponsePlugin({ statuses: [0, 200] })
    ]
  })
);

// 4. 페이지 네비게이션: NetworkFirst (오프라인 Fallback)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 })
    ]
  })
);

// 5. 폰트: CacheFirst (1년)
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 })
    ]
  })
);
```

### 4.2 Precache 대상 핵심 자산

| 자산 유형 | 대상 |
|----------|------|
| App Shell | `index.html`, 메인 레이아웃 컴포넌트 |
| CSS | 크리티컬 CSS 번들 |
| JavaScript | 메인 번들 + 라우트별 청크 (상위 5개 페이지) |
| 폰트 | Pretendard (한국어), Inter (영문) |
| 아이콘 | SVG 스프라이트, 파비콘 |

### 4.3 오프라인 Fallback 페이지

- 네트워크 불가 시 캐시된 오프라인 전용 페이지 표시
- 마지막으로 학습한 콘텐츠를 로컬 캐시에서 제공
- 온라인 복귀 시 Background Sync로 학습 진도 자동 동기화

---

## 5. HTTP/3 + QUIC

### 5.1 프로토콜 활성화

```
# Cloudflare 설정
HTTP/3 (QUIC): 활성화
0-RTT:         활성화
Early Hints:   활성화 (103 응답)

# GCP Cloud CDN
QUIC 협상:     자동 (Alt-Svc 헤더)
```

### 5.2 HTTP/3 이점

| 항목 | HTTP/2 | HTTP/3 (QUIC) | 개선 효과 |
|------|--------|---------------|----------|
| 연결 수립 | TCP + TLS (2-3 RTT) | 1 RTT (최초), 0 RTT (재연결) | 연결 시간 50-66% 단축 |
| HOL 차단 | 스트림 간 차단 발생 | 스트림별 독립 전송 | 패킷 손실 시 성능 저하 방지 |
| 연결 마이그레이션 | IP 변경 시 재연결 | Connection ID 기반 유지 | 모바일 환경 끊김 없는 전환 |

### 5.3 0-RTT 연결 재사용

```
최초 연결:
  Client ──── ClientHello ────→ Server
  Client ←─── ServerHello ────  Server
  Client ──── Data ───────────→ Server    (1-RTT)

재연결 (0-RTT):
  Client ──── ClientHello + Data ──→ Server  (0-RTT)
  Client ←─── ServerHello + Data ──  Server
```

- 재방문 사용자의 초기 로딩 속도 대폭 개선
- 0-RTT Replay Attack 방지를 위해 멱등성 요청(GET)에만 적용

### 5.4 Early Hints (103)

```
HTTP/1.1 103 Early Hints
Link: </fonts/pretendard.woff2>; rel=preload; as=font; crossorigin
Link: </css/critical.css>; rel=preload; as=style
Link: </js/main.js>; rel=modulepreload

HTTP/1.1 200 OK
Content-Type: text/html
...
```

- HTML 응답 생성 전에 핵심 리소스 힌트를 먼저 전송
- 브라우저가 Origin 응답 대기 중에 리소스 사전 로딩 시작

---

## 6. 성과 목표 및 모니터링

### 6.1 핵심 성과 지표 (KPI)

| 지표 | 목표치 | 측정 방법 |
|------|--------|----------|
| **글로벌 TTFB** | < 100ms (p95) | Cloudflare Analytics + Cloud Monitoring |
| **캐시 히트율** | > 95% | CDN 대시보드 실시간 모니터링 |
| **Origin 요청 비율** | < 5% | Origin Shield 통계 |
| **에러율 (5xx)** | < 0.01% | 알림 임계값 설정 |
| **대역폭 절감율** | > 80% | CDN vs Origin 트래픽 비교 |
| **Edge 처리 지연** | < 5ms | Worker 실행 시간 모니터링 |

### 6.2 모니터링 아키텍처

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Cloudflare  │    │   GCP Cloud  │    │  Real User   │
│  Analytics   │    │  Monitoring  │    │  Monitoring  │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                   │
       └───────────┬───────┘───────────────────┘
                   ▼
          ┌────────────────┐
          │    BigQuery    │
          │  (통합 분석)    │
          └────────┬───────┘
                   ▼
          ┌────────────────┐
          │   Looker 대시  │
          │   보드 + 알림   │
          └────────────────┘
```

### 6.3 지역별 성능 벤치마크

| 리전 | 목표 TTFB | 목표 FCP | 비고 |
|------|----------|---------|------|
| 서울 | < 30ms | < 500ms | Primary Origin 인접 |
| 도쿄 | < 50ms | < 600ms | 아시아 POP 활용 |
| 싱가포르 | < 80ms | < 700ms | 동남아 커버 |
| 버지니아 | < 80ms | < 700ms | 미국 동부 |
| 오레곤 | < 90ms | < 750ms | 미국 서부 |
| 런던 | < 90ms | < 750ms | 서유럽 |
| 프랑크푸르트 | < 100ms | < 800ms | 중부 유럽 |

### 6.4 장애 대응 절차

1. **CDN 장애 감지**: Health Check 실패 시 30초 이내 자동 Failover
2. **Origin 장애**: stale-if-error 헤더로 캐시된 콘텐츠 최대 1시간 서빙
3. **글로벌 장애**: 멀티 CDN 자동 전환 + DNS Failover (TTL 30초)
4. **캐시 오염**: 즉시 전체 Purge + 재배포 파이프라인 트리거

---

## 요약

| 전략 | 핵심 내용 |
|------|----------|
| 멀티 CDN | GCP Cloud CDN(Primary) + Cloudflare(Secondary), 자동 Failover |
| 캐싱 정책 | 정적 자산 1년 캐시, HTML 항상 검증, API 60초 + SWR |
| Edge Computing | A/B 테스트, 언어 감지, Bot 프리렌더링을 Edge에서 처리 |
| Service Worker | Workbox 기반 오프라인 지원, StaleWhileRevalidate 전략 |
| HTTP/3 + QUIC | 0-RTT 재연결, 연결 마이그레이션, Early Hints |
| 성과 목표 | TTFB < 100ms(p95), 캐시 히트율 > 95% |
