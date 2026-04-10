# 13. CI/CD 파이프라인 전략

> NEWKL AI Video 플랫폼 — 지속적 통합/배포 파이프라인 설계
> 배포 빈도 목표: **하루 5회 이상**

---

## 1. GitHub Actions 파이프라인

### 1.1 PR 생성 시 (CI 검증)

```yaml
# .github/workflows/ci-pr.yml
name: PR CI Pipeline

on:
  pull_request:
    branches: [main, develop]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint & Format
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run format:check

  type-check:
    name: TypeScript Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm run type-check

  unit-test:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm run test:unit -- --coverage
      - name: Coverage Check
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "::error::커버리지가 80% 미만입니다: ${COVERAGE}%"
            exit 1
          fi

  bundle-size:
    name: Bundle Size Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
      - uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          build_script: build
          skip_step: build
```

### 1.2 PR 머지 시 (통합 검증)

```yaml
# .github/workflows/ci-merge.yml
name: Merge CI Pipeline

on:
  push:
    branches: [develop]

jobs:
  build:
    name: Build Verification
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: .next/
          retention-days: 1

  e2e-test:
    name: E2E Tests
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: npx playwright install --with-deps chromium
      - uses: actions/download-artifact@v4
        with:
          name: build-output
          path: .next/
      - run: pnpm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

  lighthouse:
    name: Lighthouse CI
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - uses: actions/download-artifact@v4
        with:
          name: build-output
          path: .next/
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          configPath: ./lighthouserc.json
          uploadArtifacts: true
```

### 1.3 main 푸시 시 (자동 배포)

```yaml
# .github/workflows/deploy.yml
name: Deploy Pipeline

on:
  push:
    branches: [main]

jobs:
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}
      - uses: google-github-actions/setup-gcloud@v2
      - name: Build & Push Docker Image
        run: |
          IMAGE="asia-northeast3-docker.pkg.dev/${{ vars.GCP_PROJECT }}/newkl/web:${{ github.sha }}"
          docker build -t $IMAGE \
            --build-arg NEXT_PUBLIC_API_URL=${{ vars.API_URL }} \
            --cache-from type=registry,ref=asia-northeast3-docker.pkg.dev/${{ vars.GCP_PROJECT }}/newkl/web:cache \
            -f docker/web/Dockerfile .
          docker push $IMAGE
      - name: Deploy to Cloud Run (Staging)
        run: |
          gcloud run deploy newkl-web-staging \
            --image $IMAGE \
            --region asia-northeast3 \
            --platform managed \
            --allow-unauthenticated \
            --set-env-vars "ENVIRONMENT=staging"

  smoke-test-staging:
    name: Staging Smoke Test
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          HEALTH=$(curl -s -o /dev/null -w "%{http_code}" ${{ vars.STAGING_URL }}/api/health)
          if [ "$HEALTH" != "200" ]; then
            echo "::error::Staging 헬스체크 실패: HTTP $HEALTH"
            exit 1
          fi
      - run: pnpm run test:smoke -- --base-url=${{ vars.STAGING_URL }}

  deploy-production:
    name: Deploy to Production
    needs: smoke-test-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}
      - uses: google-github-actions/setup-gcloud@v2
      - name: Canary Deploy (10%)
        run: |
          IMAGE="asia-northeast3-docker.pkg.dev/${{ vars.GCP_PROJECT }}/newkl/web:${{ github.sha }}"
          gcloud run deploy newkl-web-production \
            --image $IMAGE \
            --region asia-northeast3 \
            --platform managed \
            --tag canary \
            --no-traffic
          gcloud run services update-traffic newkl-web-production \
            --region asia-northeast3 \
            --to-tags canary=10
      - name: Canary 모니터링 (5분)
        run: |
          sleep 300
          ERROR_RATE=$(gcloud monitoring time-series list \
            --filter='metric.type="run.googleapis.com/request_count" AND resource.labels.service_name="newkl-web-production"' \
            --format=json | jq '.[].points[0].value.int64Value // 0')
          echo "Canary 에러율: $ERROR_RATE"
      - name: Full Rollout (100%)
        run: |
          gcloud run services update-traffic newkl-web-production \
            --region asia-northeast3 \
            --to-latest
```

---

## 2. 빌드 최적화

### 2.1 Turborepo 캐시

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"],
      "cache": true
    },
    "lint": {
      "cache": true
    },
    "type-check": {
      "cache": true
    },
    "test:unit": {
      "dependsOn": ["^build"],
      "cache": false
    }
  }
}
```

**기대 효과:**
| 항목 | 캐시 미적용 | 캐시 적용 | 단축률 |
|------|-------------|-----------|--------|
| 전체 빌드 | 8분 | 4분 | 50% |
| Lint | 2분 | 10초 | 92% |
| Type Check | 3분 | 15초 | 92% |

### 2.2 Docker Layer Caching

```dockerfile
# docker/web/Dockerfile
FROM node:20-alpine AS base

# 1단계: 의존성 설치 (캐시 레이어)
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# 2단계: 빌드 (소스 변경 시만 재빌드)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN corepack enable pnpm && pnpm run build

# 3단계: 프로덕션 이미지 (최소 크기)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

### 2.3 node_modules 캐시 (GitHub Actions)

```yaml
# 공통 캐시 설정
- uses: actions/cache@v4
  with:
    path: |
      ~/.pnpm-store
      node_modules
      .next/cache
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-
```

---

## 3. 테스트 전략

### 3.1 Unit Test — Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
      thresholds: {
        lines: 80,
        branches: 75,
        functions: 80,
        statements: 80,
      },
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**커버리지 목표:**
| 영역 | 최소 커버리지 | 목표 커버리지 |
|------|---------------|---------------|
| 비즈니스 로직 (hooks, utils) | 90% | 95% |
| UI 컴포넌트 | 70% | 80% |
| API 연동 (services) | 85% | 90% |
| 전체 | 80% | 85% |

### 3.2 Integration Test — Testing Library

```typescript
// src/components/VideoEditor/__tests__/VideoEditor.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VideoEditor } from '../VideoEditor';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

describe('VideoEditor 통합 테스트', () => {
  it('비디오 생성 플로우가 정상 동작한다', async () => {
    const user = userEvent.setup();

    render(<VideoEditor projectId="test-project" />);

    // 1. 스크립트 입력
    await user.type(
      screen.getByLabelText('스크립트'),
      '테스트 비디오 스크립트입니다.'
    );

    // 2. 음성 선택
    await user.click(screen.getByRole('combobox', { name: '음성 선택' }));
    await user.click(screen.getByText('한국어 여성 1'));

    // 3. 생성 버튼 클릭
    await user.click(screen.getByRole('button', { name: '비디오 생성' }));

    // 4. 진행 상태 확인
    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    // 5. 완료 확인
    await waitFor(
      () => {
        expect(screen.getByText('비디오 생성 완료')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });
});
```

### 3.3 E2E Test — Playwright (핵심 시나리오 10개)

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
```

**핵심 E2E 시나리오:**

| # | 시나리오 | 우선순위 | 예상 소요 |
|---|----------|----------|-----------|
| 1 | 회원가입 → 로그인 플로우 | P0 | 15초 |
| 2 | 프로젝트 생성 → 설정 | P0 | 20초 |
| 3 | 스크립트 입력 → AI 생성 | P0 | 30초 |
| 4 | 비디오 미리보기 → 편집 | P0 | 25초 |
| 5 | 비디오 내보내기 → 다운로드 | P0 | 40초 |
| 6 | 아바타 선택 → 커스터마이징 | P1 | 20초 |
| 7 | 다국어 자막 생성 | P1 | 30초 |
| 8 | 팀 협업 (공유/댓글) | P1 | 25초 |
| 9 | 결제 → 구독 관리 | P0 | 35초 |
| 10 | 관리자 대시보드 | P2 | 20초 |

### 3.4 Visual Regression — Playwright Screenshot

```typescript
// e2e/visual/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

const pages = [
  { name: 'home', path: '/' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'editor', path: '/editor/demo' },
  { name: 'login', path: '/login' },
];

for (const page of pages) {
  test(`Visual Regression: ${page.name}`, async ({ page: browserPage }) => {
    await browserPage.goto(page.path);
    await browserPage.waitForLoadState('networkidle');

    await expect(browserPage).toHaveScreenshot(`${page.name}.png`, {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });
}
```

---

## 4. 배포 전략

### 4.1 Blue-Green 배포 (무중단)

```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                        │
│                   (Cloud Run)                           │
└──────────────┬──────────────────────┬───────────────────┘
               │                      │
        ┌──────▼──────┐        ┌──────▼──────┐
        │  Blue (v1)  │        │ Green (v2)  │
        │  현재 활성   │        │  새 버전     │
        │  100% 트래픽 │        │  0% 트래픽   │
        └─────────────┘        └─────────────┘

배포 과정:
1. Green 환경에 새 버전 배포
2. 헬스체크 통과 확인
3. 트래픽을 Green으로 전환 (100%)
4. Blue는 롤백 대기 상태 유지
```

### 4.2 Canary 배포 (점진적)

```
시간순 트래픽 분배:

T+0분:   ████████████████████ v1 (100%)
         ░░░░░░░░░░░░░░░░░░░░ v2 (0%)

T+5분:   ██████████████████   v1 (90%)
         ██                   v2 (10%)  ← Canary 시작

T+15분:  ██████████           v1 (50%)
         ██████████           v2 (50%)  ← 에러율 정상 확인

T+30분:  ░░░░░░░░░░░░░░░░░░░░ v1 (0%)
         ████████████████████ v2 (100%) ← 완전 전환
```

**Canary 판단 기준:**
| 지표 | 임계값 | 초과 시 조치 |
|------|--------|-------------|
| 에러율 (5xx) | > 1% | 즉시 롤백 |
| 응답 시간 (p95) | > 2초 | 즉시 롤백 |
| 에러율 (4xx) | > 5% | 경고 + 모니터링 |
| CPU 사용률 | > 80% | 스케일아웃 확인 |

### 4.3 롤백 전략 (1분 내)

```yaml
# scripts/rollback.sh
#!/bin/bash
set -euo pipefail

SERVICE_NAME="newkl-web-production"
REGION="asia-northeast3"

echo "🔄 롤백 시작..."

# 이전 리비전 목록 조회
PREV_REVISION=$(gcloud run revisions list \
  --service=$SERVICE_NAME \
  --region=$REGION \
  --format='value(REVISION)' \
  --sort-by='~CREATED' \
  --limit=2 | tail -1)

echo "이전 리비전: $PREV_REVISION"

# 트래픽 전환 (즉시)
gcloud run services update-traffic $SERVICE_NAME \
  --region=$REGION \
  --to-revisions=$PREV_REVISION=100

echo "롤백 완료: $PREV_REVISION 으로 전환됨"

# Slack 알림
curl -X POST $SLACK_WEBHOOK_URL \
  -H 'Content-type: application/json' \
  -d "{\"text\":\"⚠️ 프로덕션 롤백 실행: $PREV_REVISION\"}"
```

**롤백 시간 목표:**
| 단계 | 소요 시간 | 누적 |
|------|-----------|------|
| 이상 감지 | 10초 | 10초 |
| 롤백 결정 | 10초 | 20초 |
| 트래픽 전환 | 15초 | 35초 |
| 검증 완료 | 25초 | 60초 |

---

## 5. 환경 관리

### 5.1 환경 구성

```
┌─────────┐      ┌──────────┐      ┌─────────────┐
│   dev   │ ──→  │ staging  │ ──→  │ production  │
│ 개발자   │      │ QA/테스트 │      │  사용자      │
│ 로컬환경 │      │ GCP 환경  │      │  GCP 환경    │
└─────────┘      └──────────┘      └─────────────┘

브랜치 전략:
  feature/* → develop → main
     │           │         │
     dev      staging   production
```

### 5.2 환경변수 관리 (GCP Secret Manager)

```yaml
# 환경별 시크릿 구조
projects/newkl-dev/secrets/
  ├── DATABASE_URL
  ├── REDIS_URL
  ├── OPENAI_API_KEY
  ├── NEXT_PUBLIC_API_URL
  └── JWT_SECRET

projects/newkl-staging/secrets/
  ├── DATABASE_URL
  ├── REDIS_URL
  ├── OPENAI_API_KEY
  ├── NEXT_PUBLIC_API_URL
  └── JWT_SECRET

projects/newkl-production/secrets/
  ├── DATABASE_URL
  ├── REDIS_URL
  ├── OPENAI_API_KEY
  ├── NEXT_PUBLIC_API_URL
  └── JWT_SECRET
```

```yaml
# Cloud Run 환경변수 바인딩
# deploy-config.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: newkl-web
spec:
  template:
    spec:
      containers:
        - image: IMAGE_URL
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  key: latest
                  name: DATABASE_URL
            - name: OPENAI_API_KEY
              valueFrom:
                secretKeyRef:
                  key: latest
                  name: OPENAI_API_KEY
```

### 5.3 Feature Flags

```typescript
// src/lib/feature-flags.ts

interface FeatureFlag {
  key: string;
  enabled: boolean;
  percentage?: number; // 점진적 롤아웃 (0-100)
  allowedUsers?: string[]; // 특정 사용자만
  environments?: ('dev' | 'staging' | 'production')[];
}

const FLAGS: Record<string, FeatureFlag> = {
  'ai-avatar-v2': {
    key: 'ai-avatar-v2',
    enabled: true,
    percentage: 30,
    environments: ['dev', 'staging'],
  },
  'multilingual-subtitle': {
    key: 'multilingual-subtitle',
    enabled: true,
    percentage: 100,
    environments: ['dev', 'staging', 'production'],
  },
  'real-time-collaboration': {
    key: 'real-time-collaboration',
    enabled: true,
    percentage: 10,
    environments: ['dev'],
  },
};

export function isFeatureEnabled(
  flagKey: string,
  userId?: string
): boolean {
  const flag = FLAGS[flagKey];
  if (!flag || !flag.enabled) return false;

  const env = process.env.NEXT_PUBLIC_ENV as FeatureFlag['environments'][0];
  if (flag.environments && !flag.environments.includes(env)) return false;

  if (flag.allowedUsers?.includes(userId ?? '')) return true;

  if (flag.percentage !== undefined && flag.percentage < 100) {
    const hash = simpleHash(userId + flagKey);
    return (hash % 100) < flag.percentage;
  }

  return true;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}
```

---

## 6. 품질 게이트

### 6.1 품질 게이트 구성

```yaml
# .github/workflows/quality-gate.yml
name: Quality Gate

on:
  pull_request:
    branches: [main, develop]

jobs:
  quality-gate:
    name: Quality Gate Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile

      # 1. 번들 크기 체크
      - name: Bundle Size Check
        run: |
          pnpm run build
          BUNDLE_SIZE=$(du -sb .next/ | cut -f1)
          BASE_SIZE=$(curl -s "${{ vars.METRICS_API }}/bundle-size/main" || echo "0")
          DIFF=$((BUNDLE_SIZE - BASE_SIZE))
          if [ $DIFF -gt 10240 ]; then
            echo "::warning::번들 크기가 10KB 이상 증가했습니다: +$((DIFF / 1024))KB"
          fi

      # 2. Lighthouse 점수 체크
      - name: Lighthouse Score Check
        run: |
          npx @lhci/cli@0.13.x autorun
          SCORE=$(cat .lighthouseci/lhr-*.json | jq '.categories.performance.score * 100')
          if (( $(echo "$SCORE < 90" | bc -l) )); then
            echo "::error::Lighthouse 성능 점수가 90 미만입니다: ${SCORE}"
            exit 1
          fi

      # 3. 테스트 커버리지 체크
      - name: Coverage Gate
        run: |
          pnpm run test:unit -- --coverage
          CURRENT=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          BASELINE=$(curl -s "${{ vars.METRICS_API }}/coverage/main" || echo "0")
          if (( $(echo "$CURRENT < $BASELINE" | bc -l) )); then
            echo "::error::테스트 커버리지가 감소했습니다: ${BASELINE}% → ${CURRENT}%"
            exit 1
          fi
```

### 6.2 품질 게이트 기준표

| 게이트 | 기준 | 위반 시 조치 | 예외 허용 |
|--------|------|-------------|-----------|
| Lighthouse 성능 | >= 90 | 배포 차단 | 핫픽스 시 임시 우회 |
| Lighthouse 접근성 | >= 85 | 배포 차단 | 없음 |
| 번들 크기 증가 | < 10KB | 경고 표시 | 신규 기능 추가 시 |
| 번들 크기 증가 | < 50KB | 배포 차단 | 라이브러리 추가 시 승인 |
| 테스트 커버리지 | >= 80% | 배포 차단 | 없음 |
| 커버리지 감소 | 0% | 배포 차단 | 파일 삭제 시 |
| TypeScript 에러 | 0개 | 배포 차단 | 없음 |
| ESLint 에러 | 0개 | 배포 차단 | 없음 |
| ESLint 경고 | < 10개 | 경고 표시 | 마이그레이션 기간 |

### 6.3 PR 자동 코멘트

```yaml
# 품질 리포트를 PR에 자동 코멘트
- name: PR Quality Report
  uses: actions/github-script@v7
  with:
    script: |
      const report = `
      ## 품질 리포트

      | 항목 | 결과 | 상태 |
      |------|------|------|
      | Lighthouse 성능 | ${process.env.LH_SCORE}점 | ${process.env.LH_SCORE >= 90 ? '✅' : '❌'} |
      | 번들 크기 변화 | ${process.env.BUNDLE_DIFF} | ${Math.abs(process.env.BUNDLE_DIFF) < 10240 ? '✅' : '⚠️'} |
      | 테스트 커버리지 | ${process.env.COVERAGE}% | ${process.env.COVERAGE >= 80 ? '✅' : '❌'} |
      | TypeScript | ${process.env.TS_ERRORS}개 에러 | ${process.env.TS_ERRORS == 0 ? '✅' : '❌'} |
      `;

      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: report
      });
```

---

## 7. 배포 빈도 목표

### 7.1 단계별 목표

```
Phase 1 (1-2개월): 주 3회 배포
  ├── CI/CD 파이프라인 구축
  ├── 기본 테스트 자동화
  └── 수동 배포 → 자동 배포 전환

Phase 2 (3-4개월): 하루 1회 배포
  ├── 풀 테스트 자동화
  ├── Canary 배포 도입
  └── 품질 게이트 자동화

Phase 3 (5-6개월): 하루 3-5회 배포
  ├── Feature flags 활용
  ├── Trunk-based development
  └── 자동 롤백 구현

Phase 4 (6개월+): 하루 5회+ 배포
  ├── 완전 자동화된 파이프라인
  ├── 실시간 모니터링 + 자동 롤백
  └── 개발자 자율 배포
```

### 7.2 DORA 메트릭 목표

| 메트릭 | 현재 (예상) | 6개월 후 목표 | Elite 기준 |
|--------|-------------|---------------|------------|
| 배포 빈도 | 주 1회 | 하루 5회 | 하루 여러 회 |
| 리드 타임 | 1주 | 1시간 | 1시간 미만 |
| 변경 실패율 | 15% | 5% 미만 | 5% 미만 |
| 복구 시간 (MTTR) | 4시간 | 1분 | 1시간 미만 |

### 7.3 파이프라인 소요 시간 목표

```
PR 생성 → 머지 가능 상태:
  Lint          ████░░░░░░  1분
  Type Check    ████░░░░░░  1분
  Unit Test     ██████░░░░  2분
  Bundle Check  ████░░░░░░  1분
  ────────────────────────
  총 소요 (병렬): 약 3분

머지 → Staging 배포:
  Build         ████████░░  3분
  E2E Test      ██████░░░░  2분
  Lighthouse    ████░░░░░░  1분
  Deploy        ████░░░░░░  1분
  ────────────────────────
  총 소요: 약 5분

Staging → Production:
  Smoke Test    ██░░░░░░░░  30초
  Canary (10%)  ████████░░  5분
  Full Rollout  ██░░░░░░░░  30초
  ────────────────────────
  총 소요: 약 6분

전체 파이프라인: PR → Production = 약 14분
```

---

## 요약

| 영역 | 핵심 전략 | 도구 |
|------|-----------|------|
| CI | PR별 자동 검증 (lint, test, build) | GitHub Actions |
| 빌드 최적화 | Turborepo 캐시 + Docker layer caching | Turborepo |
| 테스트 | 4단계 (Unit → Integration → E2E → Visual) | Vitest, Playwright |
| 배포 | Canary 점진 배포 + 1분 내 롤백 | Cloud Run |
| 환경 관리 | 3단계 환경 + Secret Manager + Feature Flags | GCP |
| 품질 게이트 | Lighthouse 90+ / 커버리지 80+ / 번들 체크 | 자동화 |
| 목표 | 하루 5회 배포, MTTR 1분 | DORA 메트릭 |
