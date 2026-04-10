# 08. SEO / 글로벌 브랜딩 전략

> NEWKL 주식회사 — Global No.1 AI Video Company

---

## 1. SEO 기본 전략

### 1.1 서버 사이드 렌더링 (SSR/SSG)

검색엔진 크롤러가 완전한 HTML을 수집할 수 있도록 SSR 또는 SSG를 기본으로 적용한다.

| 페이지 유형 | 렌더링 방식 | 이유 |
|------------|-----------|------|
| 랜딩 페이지, 가격, 소개 | SSG (Static Site Generation) | 변경 빈도 낮음, 최고 성능 |
| 블로그, 케이스 스터디 | ISR (Incremental Static Regeneration) | 콘텐츠 갱신 + 빠른 응답 |
| 대시보드, 에디터 | CSR (Client Side Rendering) | 로그인 후 개인화 영역 |
| API 문서 | SSG | 개발자 검색 유입 |

### 1.2 구조화된 데이터 (JSON-LD)

검색 결과에 리치 스니펫을 노출하기 위해 JSON-LD 스키마를 삽입한다.

```json
// Organization
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NEWKL",
  "url": "https://newkl.ai",
  "logo": "https://newkl.ai/logo.png",
  "description": "Global No.1 AI Video Generation Platform",
  "sameAs": [
    "https://www.linkedin.com/company/newkl",
    "https://twitter.com/newkl_ai",
    "https://github.com/newkl"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@newkl.ai",
    "contactType": "sales"
  }
}
```

```json
// Product — GrowAI 플랫폼
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "GrowAI",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free tier available"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1200"
  }
}
```

```json
// VideoObject — AI 생성 영상
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "AI Generated Training Video",
  "description": "CREATOR 7단계 기반 AI 교육 영상",
  "thumbnailUrl": "https://newkl.ai/thumbnails/sample.jpg",
  "uploadDate": "2026-04-10",
  "duration": "PT5M30S",
  "contentUrl": "https://newkl.ai/videos/sample.mp4"
}
```

### 1.3 sitemap.xml + robots.txt

```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://newkl.ai/</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="https://newkl.ai/ko/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://newkl.ai/en/" />
    <xhtml:link rel="alternate" hreflang="ja" href="https://newkl.ai/ja/" />
    <lastmod>2026-04-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

```txt
# robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /admin/

Sitemap: https://newkl.ai/sitemap.xml
```

### 1.4 Canonical URL 관리

- 모든 페이지에 `<link rel="canonical">` 태그 필수 삽입
- 다국어 페이지: 각 언어별 canonical은 해당 언어 URL을 가리킴
- 중복 콘텐츠 방지: 파라미터 URL(`?sort=`, `?page=`)은 canonical에서 제외
- trailing slash 통일: `/about/` 또는 `/about` 중 하나로 일관 적용

```html
<link rel="canonical" href="https://newkl.ai/en/products/growai" />
```

---

## 2. 메타 태그 최적화

### 2.1 기본 메타 태그

```html
<!-- 글로벌 기본 -->
<title>NEWKL - Global No.1 AI Video Generation Platform</title>
<meta name="description" content="Transform your ideas into professional AI-generated videos. 
  NEWKL's GrowAI platform powers education, marketing, and enterprise content creation 
  with CREATOR 7-step methodology." />
<meta name="keywords" content="AI video, AI video generation, AI education, 
  e-learning, NEWKL, GrowAI, CREATOR, FKDS" />
```

### 2.2 서비스별 고유 설명

| 페이지 | title | description |
|--------|-------|-------------|
| 홈 | NEWKL - Global No.1 AI Video Generation Platform | AI로 전문 영상을 자동 생성하세요. 교육, 마케팅, 기업 콘텐츠를 CREATOR 7단계로 완성합니다. |
| GrowAI | GrowAI - AI 이러닝 콘텐츠 자동 생성 | FKDS 모델 기반 학습 경험 설계. 교안 업로드만으로 인터랙티브 교육 영상을 생성합니다. |
| API Docs | NEWKL API Documentation - AI Video Generation API | RESTful API로 AI 영상 생성을 자동화하세요. Python, Node.js SDK 지원. |
| 가격 | NEWKL Pricing - AI Video Plans for Every Team | Free부터 Enterprise까지. 교육기관 특별 할인 제공. |
| 블로그 | NEWKL Blog - AI Video Trends & Tutorials | AI 영상 제작 트렌드, 튜토리얼, 성공 사례를 공유합니다. |

### 2.3 Open Graph (Facebook, LinkedIn)

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="NEWKL" />
<meta property="og:title" content="NEWKL - Global No.1 AI Video Generation Platform" />
<meta property="og:description" content="Transform your ideas into professional 
  AI-generated videos with CREATOR methodology." />
<meta property="og:image" content="https://newkl.ai/og-image-1200x630.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://newkl.ai/" />
<meta property="og:locale" content="ko_KR" />
<meta property="og:locale:alternate" content="en_US" />
<meta property="og:locale:alternate" content="ja_JP" />
```

### 2.4 Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@newkl_ai" />
<meta name="twitter:title" content="NEWKL - Global No.1 AI Video Generation Platform" />
<meta name="twitter:description" content="AI-powered video generation for education 
  and enterprise." />
<meta name="twitter:image" content="https://newkl.ai/twitter-card-1200x600.png" />
```

### 2.5 hreflang 태그

```html
<link rel="alternate" hreflang="ko" href="https://newkl.ai/ko/" />
<link rel="alternate" hreflang="en" href="https://newkl.ai/en/" />
<link rel="alternate" hreflang="ja" href="https://newkl.ai/ja/" />
<link rel="alternate" hreflang="x-default" href="https://newkl.ai/en/" />
```

---

## 3. 글로벌 브랜딩 포지셔닝

### 3.1 타겟 키워드 전략

**1차 키워드** (글로벌 1위 목표):

| 키워드 | 월 검색량 (예상) | 경쟁도 | 우선순위 |
|--------|----------------|--------|---------|
| AI video generator | 150K+ | 높음 | 최우선 |
| AI video maker | 90K+ | 높음 | 최우선 |
| AI education video | 30K+ | 중간 | 핵심 |
| AI e-learning platform | 15K+ | 중간 | 핵심 |

**2차 키워드** (차별화 영역):

| 키워드 | 월 검색량 (예상) | 경쟁도 | 우선순위 |
|--------|----------------|--------|---------|
| AI training video creator | 5K+ | 낮음 | 블루오션 |
| automated e-learning content | 3K+ | 낮음 | 블루오션 |
| AI curriculum generator | 2K+ | 낮음 | 블루오션 |
| instructional design AI | 4K+ | 낮음 | 블루오션 |

### 3.2 경쟁사 분석

| 항목 | NEWKL (GrowAI) | Runway | Pika | Sora | Luma |
|------|---------------|--------|------|------|------|
| 핵심 분야 | 교육 + 영상 생성 | 크리에이티브 영상 | 소셜 영상 | 범용 영상 | 3D/영상 |
| 교육 특화 | CREATOR 7단계 + FKDS | 없음 | 없음 | 없음 | 없음 |
| 학습 설계 | 교수설계 자동화 | 없음 | 없음 | 없음 | 없음 |
| LMS 연동 | 네이티브 지원 | 없음 | 없음 | 없음 | 없음 |
| API 제공 | 전체 기능 API | 일부 | 일부 | 제한적 | 일부 |
| 다국어 | ko/en/ja | en 중심 | en 중심 | en 중심 | en 중심 |

### 3.3 차별화 메시지

> **"AI Video + Education = NEWKL"**

핵심 차별점:
1. **CREATOR 7단계 방법론**: 교수설계 이론에 기반한 체계적 콘텐츠 생성
   - C(컨셉) → R(경로설계) → E(경험설계) → A(산출물생성) → T(변화적용) → O(최적운영) → R(성찰)
2. **FKDS 학습 모델**: 감정-지식-실행-공유 순환 학습
   - F(Feeling) → K(Knowing) → D(Doing) → S(Sharing)
3. **교육 도메인 전문성**: Korea Polytechnics 등 실증 사례 보유
4. **Human-in-the-Loop**: AI 자동화 + 전문가 검수 병행

---

## 4. 다국어 SEO

### 4.1 URL 구조

```
https://newkl.ai/ko/           # 한국어 (기본)
https://newkl.ai/en/           # 영어
https://newkl.ai/ja/           # 일본어 (향후)

https://newkl.ai/ko/products/growai
https://newkl.ai/en/products/growai
https://newkl.ai/ja/products/growai
```

### 4.2 hreflang 교차 참조 규칙

모든 다국어 페이지는 상호 교차 참조를 포함해야 한다.

```html
<!-- /ko/products/growai 페이지 -->
<link rel="alternate" hreflang="ko" href="https://newkl.ai/ko/products/growai" />
<link rel="alternate" hreflang="en" href="https://newkl.ai/en/products/growai" />
<link rel="alternate" hreflang="ja" href="https://newkl.ai/ja/products/growai" />
<link rel="alternate" hreflang="x-default" href="https://newkl.ai/en/products/growai" />
```

**규칙:**
- `x-default`는 항상 영어(`/en/`) 버전을 가리킴
- 번역되지 않은 페이지는 hreflang에 포함하지 않음
- sitemap.xml에도 hreflang 정보 포함

### 4.3 지역별 구조화된 데이터

```json
// 한국어 Organization
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "뉴클 주식회사",
  "alternateName": "NEWKL Inc.",
  "url": "https://newkl.ai/ko/",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "KR",
    "addressLocality": "서울"
  },
  "description": "글로벌 No.1 AI 영상 생성 플랫폼"
}
```

```json
// 영어 Organization
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NEWKL Inc.",
  "url": "https://newkl.ai/en/",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "KR",
    "addressLocality": "Seoul"
  },
  "description": "Global No.1 AI Video Generation Platform"
}
```

### 4.4 언어별 키워드 매핑

| 영어 | 한국어 | 일본어 |
|------|--------|--------|
| AI video generator | AI 영상 생성기 | AI動画生成 |
| e-learning platform | 이러닝 플랫폼 | eラーニングプラットフォーム |
| AI education | AI 교육 | AI教育 |
| video creation tool | 영상 제작 도구 | 動画作成ツール |
| training video | 교육 영상 | 研修動画 |

---

## 5. 페이지 속도 = SEO

### 5.1 Core Web Vitals 목표

Google 검색 순위 요소인 Core Web Vitals를 최적화한다.

| 지표 | 설명 | 목표 | 현재 기준 |
|------|------|------|----------|
| **LCP** (Largest Contentful Paint) | 최대 콘텐츠 렌더링 시간 | < 2.5초 | Good |
| **INP** (Interaction to Next Paint) | 상호작용 응답 시간 | < 200ms | Good |
| **CLS** (Cumulative Layout Shift) | 레이아웃 이동 누적 | < 0.1 | Good |

### 5.2 Google PageSpeed Insights 90+ 달성 전략

```
목표: Mobile 90+ / Desktop 95+
```

**이미지 최적화:**
- Next.js `<Image>` 컴포넌트 사용 (자동 WebP/AVIF 변환)
- 레이아웃 시프트 방지를 위한 width/height 명시
- lazy loading 기본 적용, above-the-fold 이미지는 `priority` 설정

**번들 최적화:**
- 코드 스플리팅: 라우트 기반 자동 분할
- Tree shaking: 미사용 코드 제거
- Dynamic import: 무거운 라이브러리 지연 로딩

**폰트 최적화:**
- `next/font`를 이용한 폰트 자체 호스팅
- `font-display: swap` 적용
- 서브셋 폰트 사용 (한국어: KS X 1001 범위)

**캐싱 전략:**
- 정적 에셋: `Cache-Control: public, max-age=31536000, immutable`
- HTML: `Cache-Control: public, max-age=0, must-revalidate`
- API 응답: `stale-while-revalidate` 패턴 적용

**서버 최적화:**
- GCP Cloud Run: 최소 인스턴스 1개 유지 (콜드 스타트 방지)
- CDN: Cloud CDN으로 정적 에셋 및 SSG 페이지 캐싱
- 압축: Brotli 압축 적용

---

## 6. 콘텐츠 전략

### 6.1 블로그: AI 영상 트렌드 & 튜토리얼

**콘텐츠 캘린더 (월간):**

| 주차 | 콘텐츠 유형 | 주제 예시 |
|------|-----------|----------|
| 1주차 | 트렌드 분석 | "2026년 AI 영상 생성 기술 동향" |
| 2주차 | 튜토리얼 | "GrowAI로 5분 만에 교육 영상 만들기" |
| 3주차 | 비교 분석 | "AI 교육 영상 도구 비교: NEWKL vs 경쟁사" |
| 4주차 | 인사이트 | "CREATOR 7단계로 학습 효과 극대화하기" |

**SEO 최적화 블로그 구조:**
- URL: `/blog/{slug}` (영문 슬러그)
- H1: 핵심 키워드 포함
- H2/H3: 관련 키워드 자연스럽게 배치
- 내부 링크: 관련 서비스 페이지 연결
- 이미지 alt 텍스트: 키워드 포함 설명
- 메타 설명: 160자 이내, CTA 포함

### 6.2 케이스 스터디

**Korea Polytechnics 성공 사례:**

```
제목: "한국폴리텍대학, GrowAI로 교육 콘텐츠 제작 시간 80% 단축"

구조:
1. 도전 과제 — 기존 교육 영상 제작의 비용/시간 문제
2. 솔루션 — CREATOR 7단계 + FKDS 모델 적용
3. 결과 — 정량적 성과 지표
   - 콘텐츠 제작 시간: 2주 → 2일 (80% 단축)
   - 제작 비용: 건당 500만원 → 50만원 (90% 절감)
   - 학습자 만족도: 4.2 → 4.7 (12% 향상)
4. 향후 계획 — 확대 적용 로드맵
```

**케이스 스터디 SEO:**
- 구조화된 데이터: `Article` + `Organization` 스키마
- 소셜 증거: 실제 담당자 인터뷰 인용
- 시각 자료: 전후 비교 인포그래픽

### 6.3 API 문서: 개발자 SEO

개발자 검색 유입을 위한 API 문서 최적화:

```
URL 구조:
/docs/api/getting-started
/docs/api/authentication
/docs/api/video-generation
/docs/api/webhooks
/docs/sdk/python
/docs/sdk/nodejs
```

**개발자 SEO 키워드:**
- "AI video generation API"
- "text to video API"
- "e-learning content API"
- "AI video REST API documentation"

---

## 7. 분석 도구

### 7.1 Google Search Console

**활용 항목:**
- 검색 실적: 클릭수, 노출수, CTR, 평균 게재순위 모니터링
- 색인 생성: 페이지 색인 상태 확인, 색인 오류 수정
- 경험: Core Web Vitals 실제 사용자 데이터 추적
- 사이트맵: sitemap.xml 제출 및 상태 확인
- 모바일 사용 편의성: 모바일 관련 이슈 탐지

**주간 모니터링 대시보드:**

| 지표 | 목표 | 알림 기준 |
|------|------|----------|
| 색인 페이지 수 | 증가 추세 | 10% 이상 감소 시 |
| 평균 CTR | 5% 이상 | 3% 이하 시 |
| 평균 게재순위 | 상위 20위 | 50위 밖 페이지 증가 시 |
| Core Web Vitals 통과율 | 90% 이상 | 75% 이하 시 |

### 7.2 Google Analytics 4 (GA4)

**핵심 이벤트 추적:**

```javascript
// 주요 전환 이벤트
gtag('event', 'sign_up', { method: 'google' });
gtag('event', 'video_generation_start', { plan: 'pro' });
gtag('event', 'video_generation_complete', { duration_seconds: 120 });
gtag('event', 'api_key_created', {});
gtag('event', 'purchase', { value: 29.99, currency: 'USD' });
```

**맞춤 보고서:**
- 유입 채널별 전환율 (Organic Search vs Direct vs Social)
- 언어/지역별 사용자 행동
- 콘텐츠별 참여도 (블로그 → 회원가입 전환 퍼널)
- 검색 키워드별 랜딩 페이지 성과

### 7.3 Ahrefs

**활용 항목:**
- 키워드 순위 추적: 핵심 키워드 일일 순위 변동 모니터링
- 백링크 분석: 신규/유실 백링크 추적, 경쟁사 백링크 프로필 분석
- 콘텐츠 탐색: 경쟁사 인기 콘텐츠 벤치마킹
- 사이트 감사: 기술적 SEO 이슈 자동 탐지 (깨진 링크, 중복 콘텐츠 등)

**월간 SEO 리포트 구성:**

| 섹션 | 내용 |
|------|------|
| 키워드 성과 | 핵심 키워드 순위 변동, 신규 순위 진입 키워드 |
| 트래픽 분석 | Organic 트래픽 추이, 상위 랜딩 페이지 |
| 백링크 현황 | DR(Domain Rating) 변화, 신규 참조 도메인 |
| 경쟁사 비교 | 주요 키워드 점유율, 콘텐츠 갭 분석 |
| 액션 아이템 | 다음 달 SEO 개선 과제 목록 |

---

## 8. 실행 로드맵

### Phase 1: 기반 구축 (1-2개월)

- [ ] SSR/SSG 기반 페이지 렌더링 적용
- [ ] JSON-LD 구조화된 데이터 삽입 (Organization, Product)
- [ ] sitemap.xml, robots.txt 배포
- [ ] 메타 태그 및 Open Graph 전체 페이지 적용
- [ ] Google Search Console, GA4 연동
- [ ] Core Web Vitals 90+ 달성

### Phase 2: 콘텐츠 확장 (3-4개월)

- [ ] 블로그 운영 시작 (주 1회 이상)
- [ ] Korea Polytechnics 케이스 스터디 발행
- [ ] API 문서 SEO 최적화
- [ ] Ahrefs 키워드 추적 시작
- [ ] 백링크 구축 전략 실행

### Phase 3: 다국어 & 글로벌 (5-6개월)

- [ ] 영어(/en/) 페이지 전체 번역 및 배포
- [ ] hreflang 교차 참조 설정
- [ ] 지역별 구조화된 데이터 적용
- [ ] 글로벌 키워드 순위 추적 시작

### Phase 4: 일본어 & 확장 (7개월 이후)

- [ ] 일본어(/ja/) 페이지 번역 및 배포
- [ ] 일본 시장 키워드 전략 수립
- [ ] 지역별 콘텐츠 현지화
- [ ] 추가 언어 확장 검토
