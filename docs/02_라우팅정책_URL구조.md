# 라우팅 정책 및 URL 구조

## 1. 도메인 구조

| 항목 | 값 |
|------|-----|
| 도메인 | `growai.co.kr` |
| 프로토콜 | HTTPS |
| SPA 프레임워크 | React (Vite 빌드) |

---

## 2. 루트 라우트 (`/`)

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | `PortalPage` | 서비스 허브 페이지. 9개 서비스 카드를 그리드 형태로 렌더링하여 각 서비스로의 진입점 역할을 한다. |

---

## 3. LearnForm (`/learnform`)

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/learnform` | `LearnFormLanding` | LearnForm 서비스 랜딩 페이지 |

### 랜딩 페이지 구성 섹션 (총 12개)

1. Hero 섹션
2. Features (주요 기능)
3. Pricing (가격 정책)
4. FAQ (자주 묻는 질문)
5. 기타 마케팅/소개 섹션 등

---

## 4. LMS (`/lms/*`)

### 4.1 메인 페이지

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/lms` | `HomePage` | LMS 메인 대시보드 |

### 4.2 탐색 및 커뮤니티

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/lms/explore` | `ExplorePage` | 강의 탐색 — 카테고리별 강의 검색 및 필터링 |
| `/lms/community` | `CommunityPage` | 커뮤니티 — 학습자 간 소통 공간 |
| `/lms/paths` | `PathsPage` | 학습 경로 — 단계별 커리큘럼 구성 |
| `/lms/projects` | `ProjectsPage` | 프로젝트 — 실습 프로젝트 목록 |
| `/lms/leaderboard` | `LeaderboardPage` | 리더보드 — 학습 성과 순위 |

### 4.3 개인 영역

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/lms/profile` | `ProfilePage` | 프로필 — 개인정보 및 학습 통계 |
| `/lms/dashboard` | `DashboardPage` | LMS 대시보드 — 학습 진행 현황 요약 |
| `/lms/courses` | `CoursesPage` | 내 강의 — 수강 중인 강의 목록 |
| `/lms/certificates` | `CertificatesPage` | 수료증 — 발급된 수료증 관리 |

### 4.4 상세 페이지

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/lms/course/:id` | `CourseDetailPage` | 강의 상세 — 동적 라우트. `:id`는 강의 고유 식별자 |

---

## 5. TLA 서비스 라우트

각 TLA(Three-Letter Acronym) 서비스는 독립 경로를 가지며, 현재 `ServicePlaceholder` 컴포넌트를 렌더링한다.

| 경로 | 서비스명 | 설명 |
|------|----------|------|
| `/map` | MAP | 서비스 플레이스홀더 |
| `/vls` | VLS | 서비스 플레이스홀더 |
| `/vas` | VAS | 서비스 플레이스홀더 |
| `/ccb` | CCB | 서비스 플레이스홀더 |
| `/ccs` | CCS | 서비스 플레이스홀더 |
| `/cdn` | CDN | 서비스 플레이스홀더 |
| `/cms` | CMS | 서비스 플레이스홀더 |

> 각 서비스가 본격 개발되면 전용 컴포넌트로 교체 예정

---

## 6. Lazy Loading 전략

### 적용 방식

- 모든 페이지 컴포넌트를 `React.lazy()`로 동적 임포트
- `<Suspense fallback={...}>`로 로딩 상태 처리
- Vite 빌드 시 자동 코드 스플리팅 적용

### 예시 패턴

```tsx
const HomePage = lazy(() => import('./pages/HomePage'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/lms" element={<HomePage />} />
    {/* ... */}
  </Routes>
</Suspense>
```

### 효과

- 초기 번들 크기 최소화
- 라우트 단위 청크 분리
- 사용자가 접근하는 페이지만 로드

---

## 7. Nginx 설정 참고

SPA 특성상 모든 경로를 `index.html`로 폴백해야 클라이언트 사이드 라우팅이 정상 동작한다.

### 핵심 설정

```nginx
server {
    listen 80;
    server_name growai.co.kr;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 주의사항

- API 경로(`/api/*`)는 별도 `location` 블록으로 백엔드 프록시 설정 필요
- 정적 자산(`/assets/*`)은 캐시 헤더 설정 권장
- HTTPS 리다이렉트 및 SSL 인증서 설정은 별도 관리
