# 10. API/데이터 페칭 최적화

> NEWKL AI Video 플랫폼 — API 통신 및 데이터 페칭 전략 최적화 가이드

---

## 1. 현재 상태 분석

### 기술 스택

| 항목 | 현재 버전 | 비고 |
|------|----------|------|
| TanStack React Query | 5.97.0 | 서버 상태 관리 |
| Axios | - | HTTP 클라이언트 |
| Next.js App Router | - | 서버 컴포넌트 + 클라이언트 컴포넌트 혼합 |

### 현재 문제점

- **Over-fetching**: 모든 엔드포인트가 전체 엔티티 반환, 불필요한 필드 포함
- **정적 Mock 데이터**: `src/data/` 디렉토리에 하드코딩된 데이터가 프로덕션 번들에 포함
- **캐싱 미비**: staleTime/gcTime 기본값 사용, 불필요한 리페치 발생
- **순차 로딩**: 병렬 가능한 요청이 직렬로 실행됨
- **에러 처리 부재**: 네트워크 오류 시 빈 화면 노출

---

## 2. React Query 최적화

### 2.1 staleTime/gcTime 전략 (서비스별 차등)

데이터 특성에 따라 캐시 유지 시간을 차등 적용한다.

```typescript
// lib/query/cache-config.ts

export const CACHE_CONFIG = {
  /** 거의 변하지 않는 데이터: 카테고리, 설정값 */
  STATIC: {
    staleTime: 1000 * 60 * 60,      // 1시간
    gcTime: 1000 * 60 * 60 * 24,    // 24시간
  },

  /** 자주 변하지 않는 데이터: 프로젝트 목록, 코스 메타데이터 */
  SEMI_STATIC: {
    staleTime: 1000 * 60 * 5,       // 5분
    gcTime: 1000 * 60 * 30,         // 30분
  },

  /** 자주 변하는 데이터: 학습 진도, 알림 */
  DYNAMIC: {
    staleTime: 1000 * 30,           // 30초
    gcTime: 1000 * 60 * 5,          // 5분
  },

  /** 실시간 데이터: AI 생성 상태, 라이브 피드 */
  REALTIME: {
    staleTime: 0,                   // 항상 stale
    gcTime: 1000 * 60,              // 1분
  },
} as const;
```

```typescript
// QueryClient 전역 기본값 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_CONFIG.SEMI_STATIC.staleTime,
      gcTime: CACHE_CONFIG.SEMI_STATIC.gcTime,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
  },
});
```

### 2.2 prefetchQuery: 다음 페이지 예측 프리페치

사용자가 이동할 가능성이 높은 페이지의 데이터를 미리 로드한다.

```typescript
// hooks/usePrefetchNextPage.ts
import { useQueryClient } from '@tanstack/react-query';

export function usePrefetchOnHover<T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>,
  cacheConfig = CACHE_CONFIG.SEMI_STATIC
) {
  const queryClient = useQueryClient();

  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      ...cacheConfig,
    });
  };

  return { onMouseEnter: prefetch, onFocus: prefetch };
}
```

```typescript
// 프로젝트 목록에서 다음 페이지 프리페치
function ProjectList({ projects }: { projects: Project[] }) {
  const queryClient = useQueryClient();

  // 커서 기반 다음 페이지 프리페치
  const prefetchNextPage = (cursor: string) => {
    queryClient.prefetchQuery({
      queryKey: ['projects', { cursor }],
      queryFn: () => fetchProjects({ cursor }),
      ...CACHE_CONFIG.SEMI_STATIC,
    });
  };

  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          {...usePrefetchOnHover(
            ['project', project.id],
            () => fetchProjectDetail(project.id)
          )}
        />
      ))}
    </>
  );
}
```

### 2.3 placeholderData: 즉시 UI 표시

캐시에 이전 데이터가 있으면 즉시 표시하고, 백그라운드에서 최신 데이터를 가져온다.

```typescript
import { keepPreviousData } from '@tanstack/react-query';

// 페이지네이션 시 이전 데이터 유지
function useProjects(cursor?: string) {
  return useQuery({
    queryKey: ['projects', { cursor }],
    queryFn: () => fetchProjects({ cursor }),
    placeholderData: keepPreviousData,  // 페이지 전환 시 깜빡임 방지
  });
}

// 목록 데이터를 상세 페이지의 placeholder로 활용
function useProjectDetail(projectId: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProjectDetail(projectId),
    placeholderData: () => {
      // 목록 캐시에서 해당 프로젝트의 요약 데이터를 가져옴
      const projects = queryClient.getQueryData<ProjectListResponse>(
        ['projects']
      );
      return projects?.items.find((p) => p.id === projectId);
    },
  });
}
```

### 2.4 select: 필요한 필드만 추출

서버 응답에서 컴포넌트에 필요한 필드만 선택하여 불필요한 리렌더링을 방지한다.

```typescript
// 전체 프로젝트 데이터 중 카드 표시에 필요한 필드만 추출
function useProjectCards() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    select: (data) =>
      data.items.map(({ id, title, thumbnail, status, updatedAt }) => ({
        id,
        title,
        thumbnail,
        status,
        updatedAt,
      })),
  });
}

// 프로젝트 통계만 추출
function useProjectStats(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProjectDetail(projectId),
    select: (data) => ({
      totalSteps: data.steps.length,
      completedSteps: data.steps.filter((s) => s.status === 'completed').length,
      totalDuration: data.steps.reduce((sum, s) => sum + s.duration, 0),
    }),
  });
}
```

---

## 3. API 설계 최적화

### 3.1 GraphQL 도입 검토

| 기준 | REST (현재) | GraphQL (검토) |
|------|-----------|---------------|
| Over-fetching | 전체 엔티티 반환 | 필요한 필드만 요청 |
| Under-fetching | N+1 요청 발생 | 단일 쿼리로 해결 |
| 캐싱 | HTTP 캐시 활용 용이 | 별도 캐싱 레이어 필요 |
| 파일 업로드 | 네이티브 지원 | 별도 처리 필요 |
| 러닝 커브 | 낮음 | 중간 |
| 실시간 | WebSocket 별도 구현 | Subscription 내장 |

**권장 전략**: 단계적 도입

1. **1단계 (당장)**: REST + sparse fieldsets로 over-fetching 해결
2. **2단계 (3개월 후)**: 복잡한 관계형 데이터(코스 > 단계 > 에셋)에 GraphQL 도입
3. **3단계 (6개월 후)**: GraphQL Subscription으로 실시간 기능 통합

### 3.2 REST sparse fieldsets

```typescript
// API 클라이언트에 fields 파라미터 지원
interface FetchOptions {
  fields?: string[];
  include?: string[];   // 관계 데이터 포함
  exclude?: string[];   // 특정 필드 제외
}

async function fetchProjects(options?: FetchOptions): Promise<ProjectListResponse> {
  const params = new URLSearchParams();

  if (options?.fields?.length) {
    params.set('fields', options.fields.join(','));
    // GET /api/v1/projects?fields=id,title,thumbnail,status
  }

  if (options?.include?.length) {
    params.set('include', options.include.join(','));
    // GET /api/v1/projects?include=owner,lastStep
  }

  return apiClient.get(`/projects?${params}`);
}
```

```typescript
// 사용 예시: 카드 목록에 필요한 최소 필드만 요청
const { data } = useQuery({
  queryKey: ['projects', 'card-view'],
  queryFn: () =>
    fetchProjects({
      fields: ['id', 'title', 'thumbnail', 'status', 'updatedAt'],
    }),
});
```

### 3.3 Pagination: Cursor-based

Offset 기반 페이지네이션 대신 커서 기반으로 전환한다.

```typescript
// types/pagination.ts
interface CursorPaginationParams {
  cursor?: string;       // 마지막 항목의 ID 또는 인코딩된 위치
  limit?: number;        // 기본 20, 최대 100
  direction?: 'forward' | 'backward';
}

interface CursorPaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;   // null이면 마지막 페이지
  prevCursor: string | null;
  hasMore: boolean;
  totalCount?: number;         // 필요할 때만 포함 (비용이 큼)
}
```

```typescript
// hooks/useInfiniteProjects.ts
function useInfiniteProjects() {
  return useInfiniteQuery({
    queryKey: ['projects', 'infinite'],
    queryFn: ({ pageParam }) =>
      fetchProjects({ cursor: pageParam, limit: 20 }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    ...CACHE_CONFIG.SEMI_STATIC,
  });
}
```

**Offset vs Cursor 비교**:

| 특성 | Offset | Cursor |
|------|--------|--------|
| 중간 삽입/삭제 시 | 데이터 누락/중복 | 안정적 |
| 깊은 페이지 성능 | O(n) — 느림 | O(1) — 일정 |
| 임의 페이지 접근 | 가능 | 불가 (순차만) |
| 무한 스크롤 적합성 | 낮음 | 높음 |

---

## 4. 실시간 데이터

### 4.1 WebSocket: 학습 진도, 알림

```typescript
// lib/websocket/useRealtimeProgress.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useRealtimeProgress(projectId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/ws/progress/${projectId}`
    );

    ws.onmessage = (event) => {
      const update: ProgressUpdate = JSON.parse(event.data);

      // React Query 캐시에 실시간 반영
      queryClient.setQueryData(
        ['project', projectId, 'progress'],
        (old: ProgressData | undefined) => {
          if (!old) return old;
          return {
            ...old,
            steps: old.steps.map((step) =>
              step.id === update.stepId
                ? { ...step, progress: update.progress, status: update.status }
                : step
            ),
          };
        }
      );
    };

    ws.onerror = () => {
      // WebSocket 실패 시 폴링으로 폴백
      queryClient.invalidateQueries({
        queryKey: ['project', projectId, 'progress'],
      });
    };

    return () => ws.close();
  }, [projectId, queryClient]);
}
```

### 4.2 Server-Sent Events: AI 생성 진행률

AI 콘텐츠 생성처럼 서버에서 클라이언트로의 단방향 스트리밍에 SSE를 사용한다.

```typescript
// hooks/useAIGenerationStream.ts
export function useAIGenerationStream(taskId: string) {
  const [progress, setProgress] = useState<GenerationProgress>({
    stage: 'idle',
    percent: 0,
    message: '',
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!taskId) return;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${taskId}/stream`
    );

    eventSource.addEventListener('progress', (event) => {
      const data: GenerationProgress = JSON.parse(event.data);
      setProgress(data);
    });

    eventSource.addEventListener('complete', (event) => {
      const result = JSON.parse(event.data);
      // 완료 시 관련 쿼리 무효화하여 최신 데이터 로드
      queryClient.invalidateQueries({
        queryKey: ['project', result.projectId],
      });
      eventSource.close();
    });

    eventSource.addEventListener('error', (event) => {
      setProgress((prev) => ({
        ...prev,
        stage: 'error',
        message: '생성 중 오류가 발생했습니다.',
      }));
      eventSource.close();
    });

    return () => eventSource.close();
  }, [taskId, queryClient]);

  return progress;
}
```

### 4.3 Optimistic Updates: 즉시 UI 반영

사용자 액션의 결과를 서버 응답 전에 즉시 반영한다.

```typescript
// hooks/useUpdateProjectTitle.ts
function useUpdateProjectTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { projectId: string; title: string }) =>
      apiClient.patch(`/projects/${params.projectId}`, { title: params.title }),

    onMutate: async ({ projectId, title }) => {
      // 진행 중인 리페치 취소 (낙관적 업데이트를 덮어쓰지 않도록)
      await queryClient.cancelQueries({
        queryKey: ['project', projectId],
      });

      // 이전 데이터 스냅샷 저장
      const previousProject = queryClient.getQueryData<Project>(
        ['project', projectId]
      );

      // 캐시를 낙관적으로 업데이트
      queryClient.setQueryData(['project', projectId], (old: Project) => ({
        ...old,
        title,
        updatedAt: new Date().toISOString(),
      }));

      return { previousProject };
    },

    onError: (_err, { projectId }, context) => {
      // 실패 시 이전 데이터로 롤백
      if (context?.previousProject) {
        queryClient.setQueryData(
          ['project', projectId],
          context.previousProject
        );
      }
    },

    onSettled: (_data, _error, { projectId }) => {
      // 성공/실패 관계없이 서버 데이터와 동기화
      queryClient.invalidateQueries({
        queryKey: ['project', projectId],
      });
    },
  });
}
```

---

## 5. 캐싱 레이어

4계층 캐싱 아키텍처를 구성한다.

```
[브라우저] → [CDN Edge] → [API 서버] → [DB]
 React Query    SWR 헤더     Redis       쿼리 캐시
```

### 5.1 Client: React Query 캐시

- 위 섹션 2에서 정의한 `CACHE_CONFIG`에 따라 동작
- `queryKey` 설계 원칙: `[엔티티, 식별자, 필터]` 구조

```typescript
// queryKey 팩토리 패턴
export const queryKeys = {
  projects: {
    all: ['projects'] as const,
    lists: () => [...queryKeys.projects.all, 'list'] as const,
    list: (filters: ProjectFilters) =>
      [...queryKeys.projects.lists(), filters] as const,
    details: () => [...queryKeys.projects.all, 'detail'] as const,
    detail: (id: string) =>
      [...queryKeys.projects.details(), id] as const,
  },
  steps: {
    all: ['steps'] as const,
    byProject: (projectId: string) =>
      [...queryKeys.steps.all, { projectId }] as const,
    detail: (stepId: string) =>
      [...queryKeys.steps.all, 'detail', stepId] as const,
  },
} as const;
```

### 5.2 Edge: CDN 캐시 (SWR 헤더)

```python
# FastAPI 응답 헤더 예시
from fastapi import Response

@app.get("/api/v1/categories")
async def get_categories(response: Response):
    response.headers["Cache-Control"] = "public, s-maxage=3600, stale-while-revalidate=86400"
    return categories

@app.get("/api/v1/projects/{project_id}")
async def get_project(project_id: str, response: Response):
    response.headers["Cache-Control"] = "private, max-age=0, must-revalidate"
    response.headers["ETag"] = compute_etag(project)
    return project
```

| 데이터 유형 | Cache-Control 전략 |
|-------------|-------------------|
| 카테고리/설정 | `public, s-maxage=3600, stale-while-revalidate=86400` |
| 프로젝트 목록 | `private, max-age=60, stale-while-revalidate=300` |
| 프로젝트 상세 | `private, no-cache` + ETag |
| 미디어 에셋 | `public, max-age=31536000, immutable` |
| AI 생성 결과 | `private, no-store` |

### 5.3 Server: Redis 캐시

```python
# core/cache.py
import redis.asyncio as redis
import json
from functools import wraps

redis_client = redis.from_url(settings.REDIS_URL)

def cached(prefix: str, ttl: int = 300):
    """서버 사이드 Redis 캐시 데코레이터"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            cache_key = f"{prefix}:{_build_key(args, kwargs)}"

            # 캐시 히트 확인
            cached_value = await redis_client.get(cache_key)
            if cached_value:
                return json.loads(cached_value)

            # 캐시 미스: 실제 함수 실행
            result = await func(*args, **kwargs)

            # 결과 캐싱 (비동기)
            await redis_client.setex(
                cache_key, ttl, json.dumps(result, default=str)
            )
            return result
        return wrapper
    return decorator

# 사용 예시
@cached(prefix="project", ttl=300)
async def get_project(project_id: str) -> dict:
    return await db.fetch_project(project_id)
```

### 5.4 DB: 쿼리 캐시

```python
# SQLAlchemy 쿼리 결과 캐싱 (dogpile.cache 활용)
from sqlalchemy import select
from app.core.cache import cached

@cached(prefix="projects:list", ttl=60)
async def list_projects(
    user_id: str,
    cursor: str | None = None,
    limit: int = 20,
) -> CursorPaginatedResponse:
    query = (
        select(Project)
        .where(Project.owner_id == user_id)
        .order_by(Project.updated_at.desc())
        .limit(limit + 1)  # hasMore 판단용
    )
    if cursor:
        query = query.where(Project.id < cursor)

    results = await session.execute(query)
    items = results.scalars().all()

    has_more = len(items) > limit
    if has_more:
        items = items[:limit]

    return CursorPaginatedResponse(
        items=items,
        next_cursor=items[-1].id if has_more else None,
        has_more=has_more,
    )
```

### 캐시 무효화 전략

```python
# 데이터 변경 시 관련 캐시 계층적 무효화
async def invalidate_project_cache(project_id: str, user_id: str):
    """프로젝트 변경 시 관련 캐시 모두 무효화"""
    keys_to_delete = [
        f"project:{project_id}",
        f"projects:list:user:{user_id}:*",
        f"steps:project:{project_id}:*",
    ]
    for pattern in keys_to_delete:
        async for key in redis_client.scan_iter(match=pattern):
            await redis_client.delete(key)
```

---

## 6. 데이터 로딩 UX

### 6.1 Skeleton UI (Content-aware)

콘텐츠 유형에 맞춘 스켈레톤을 표시한다.

```typescript
// components/skeleton/ProjectCardSkeleton.tsx
function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border p-4">
      {/* 썸네일 영역 */}
      <div className="aspect-video w-full rounded bg-gray-200" />
      {/* 제목 */}
      <div className="mt-3 h-5 w-3/4 rounded bg-gray-200" />
      {/* 메타 정보 */}
      <div className="mt-2 flex gap-2">
        <div className="h-4 w-16 rounded bg-gray-100" />
        <div className="h-4 w-20 rounded bg-gray-100" />
      </div>
    </div>
  );
}

// 목록에서 활용
function ProjectListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}
```

### 6.2 Progressive Loading

데이터를 우선순위에 따라 단계적으로 로드한다.

```typescript
// 1단계: 핵심 데이터 (즉시 로드)
// 2단계: 보조 데이터 (핵심 로드 후)
// 3단계: 부가 데이터 (사용자 인터랙션 시)

function ProjectDetailPage({ projectId }: { projectId: string }) {
  // 1단계: 프로젝트 기본 정보 (즉시)
  const { data: project, isLoading } = useProjectDetail(projectId);

  // 2단계: 단계 목록 (프로젝트 로드 후)
  const { data: steps } = useQuery({
    queryKey: queryKeys.steps.byProject(projectId),
    queryFn: () => fetchSteps(projectId),
    enabled: !!project,  // 프로젝트 로드 완료 후 실행
  });

  // 3단계: 분석 데이터 (탭 클릭 시)
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { data: analytics } = useQuery({
    queryKey: ['project', projectId, 'analytics'],
    queryFn: () => fetchProjectAnalytics(projectId),
    enabled: showAnalytics,  // 탭 활성화 시에만 로드
  });

  if (isLoading) return <ProjectDetailSkeleton />;

  return (
    <div>
      <ProjectHeader project={project!} />
      <Suspense fallback={<StepListSkeleton />}>
        {steps && <StepList steps={steps} />}
      </Suspense>
      <Tabs onSelect={(tab) => tab === 'analytics' && setShowAnalytics(true)}>
        <Tab id="steps" label="학습 단계">...</Tab>
        <Tab id="analytics" label="분석">
          {analytics ? <Analytics data={analytics} /> : <AnalyticsSkeleton />}
        </Tab>
      </Tabs>
    </div>
  );
}
```

### 6.3 Error Boundary + Retry

```typescript
// components/error/QueryErrorBoundary.tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function QueryErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div className="flex flex-col items-center gap-4 p-8">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <h3 className="text-lg font-semibold">
                데이터를 불러오지 못했습니다
              </h3>
              <p className="text-sm text-gray-500">
                {getErrorMessage(error)}
              </p>
              <button
                onClick={resetErrorBoundary}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                다시 시도
              </button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401: return '로그인이 필요합니다.';
      case 403: return '접근 권한이 없습니다.';
      case 404: return '요청한 데이터를 찾을 수 없습니다.';
      case 429: return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
      default: return '서버 오류가 발생했습니다.';
    }
  }
  return '네트워크 연결을 확인해주세요.';
}
```

---

## 7. Bundle에서 Mock Data 제거

### 7.1 현재 문제

`src/data/` 디렉토리에 정적 데이터가 하드코딩되어 있어 프로덕션 번들 크기를 증가시킨다.

```
src/data/
├── projects.ts        # 프로젝트 목록 mock
├── steps.ts           # 학습 단계 mock
├── categories.ts      # 카테고리 mock
└── users.ts           # 사용자 mock
```

### 7.2 전환 전략

**Phase 1**: Mock 데이터를 MSW 핸들러로 이동

```typescript
// mocks/handlers/projects.ts (개발 환경 전용)
import { http, HttpResponse } from 'msw';
import { projectsMockData } from './data/projects';

export const projectHandlers = [
  http.get('/api/v1/projects', ({ request }) => {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const limit = Number(url.searchParams.get('limit') ?? 20);

    const startIndex = cursor
      ? projectsMockData.findIndex((p) => p.id === cursor) + 1
      : 0;
    const items = projectsMockData.slice(startIndex, startIndex + limit);

    return HttpResponse.json({
      items,
      nextCursor: items[items.length - 1]?.id ?? null,
      hasMore: startIndex + limit < projectsMockData.length,
    });
  }),
];
```

**Phase 2**: MSW 초기화 (개발 환경만)

```typescript
// mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { projectHandlers } from './handlers/projects';
import { stepHandlers } from './handlers/steps';

export const worker = setupWorker(
  ...projectHandlers,
  ...stepHandlers,
);
```

```typescript
// app/providers.tsx
'use client';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return;
  if (typeof window === 'undefined') return;

  const { worker } = await import('@/mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',  // mock 없는 요청은 실제 서버로
  });
}

// Provider 초기화 시 MSW 활성화
enableMocking();
```

**Phase 3**: `src/data/` 파일 제거 및 import 경로 업데이트

```typescript
// Before (삭제 대상)
import { projects } from '@/data/projects';

// After (API 호출로 전환)
const { data: projects } = useQuery({
  queryKey: queryKeys.projects.lists(),
  queryFn: fetchProjects,
});
```

### 7.3 번들 크기 영향 예상

| 항목 | Before | After | 절감 |
|------|--------|-------|------|
| src/data/ 정적 데이터 | ~120KB | 0KB | -120KB |
| MSW (dev only) | 0KB | 0KB (prod) | - |
| API 클라이언트 추가 | 0KB | ~5KB | +5KB |
| **순 절감** | | | **~115KB** |

---

## 8. 성과 목표

### 핵심 지표

| 지표 | 현재 (추정) | 목표 | 측정 방법 |
|------|------------|------|----------|
| API 응답 시간 (p95) | ~300ms | < 100ms | 서버 측 미들웨어 로깅 |
| UI 업데이트 지연 | ~50ms | < 16ms (60fps) | React DevTools Profiler |
| 초기 데이터 로드 (FCP → 데이터) | ~1.5s | < 500ms | Web Vitals 측정 |
| 캐시 히트율 | ~20% | > 80% | Redis/React Query 메트릭 |
| 프로덕션 번들 크기 | 기준값 | -15% 이상 | next build 분석 |

### 최적화 달성 방안 요약

```
API 응답 < 100ms 달성:
├── sparse fieldsets로 페이로드 축소
├── Redis 캐시 (TTL 300s, 히트율 80%+)
├── cursor 기반 페이지네이션 (O(1) 쿼리)
└── CDN edge 캐시 (정적 데이터)

UI 업데이트 < 16ms 달성:
├── select()로 필요한 데이터만 구독
├── Optimistic Updates (서버 응답 대기 없음)
├── placeholderData (깜빡임 없는 전환)
└── 컴포넌트 단위 Suspense 경계
```

### 모니터링 대시보드

```typescript
// lib/monitoring/api-metrics.ts
import { QueryClient } from '@tanstack/react-query';

export function setupQueryMetrics(queryClient: QueryClient) {
  const queryCache = queryClient.getQueryCache();

  queryCache.subscribe((event) => {
    if (event.type === 'updated' && event.action.type === 'success') {
      const query = event.query;
      const fetchTime = query.state.dataUpdatedAt - query.state.fetchMeta?.startTime;

      // 성능 메트릭 전송
      reportMetric('api.response_time', fetchTime, {
        queryKey: JSON.stringify(query.queryKey),
        cached: query.state.fetchStatus === 'idle',
      });

      // 100ms 초과 시 경고
      if (fetchTime > 100) {
        console.warn(
          `[Performance] Slow query detected: ${JSON.stringify(query.queryKey)} took ${fetchTime}ms`
        );
      }
    }
  });
}
```

---

## 구현 우선순위

| 순서 | 작업 | 난이도 | 영향도 | 예상 기간 |
|------|------|--------|--------|----------|
| 1 | CACHE_CONFIG 적용 + queryKey 팩토리 | 낮음 | 높음 | 1일 |
| 2 | placeholderData + select 적용 | 낮음 | 중간 | 1일 |
| 3 | src/data/ → MSW 전환 | 중간 | 높음 | 2일 |
| 4 | Cursor-based pagination | 중간 | 중간 | 2일 |
| 5 | Skeleton UI 표준화 | 낮음 | 중간 | 1일 |
| 6 | Error Boundary 통합 | 낮음 | 중간 | 1일 |
| 7 | sparse fieldsets API 구현 | 중간 | 높음 | 3일 |
| 8 | Redis 캐시 레이어 | 중간 | 높음 | 2일 |
| 9 | SSE 기반 AI 진행률 스트리밍 | 높음 | 중간 | 3일 |
| 10 | Optimistic Updates 패턴 적용 | 중간 | 중간 | 2일 |
| 11 | WebSocket 실시간 진도 | 높음 | 중간 | 3일 |
| 12 | 모니터링 대시보드 | 중간 | 중간 | 2일 |

**총 예상 기간: 약 3~4주 (1인 기준)**
