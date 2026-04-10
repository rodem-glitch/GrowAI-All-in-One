# 09. PWA / 오프라인 전략

> NEWKL AI Video 웹사이트의 Progressive Web App 구현 및 오프라인 지원 전략

---

## 1. PWA 구현

### 1.1 Web App Manifest

`manifest.json` 설정으로 설치 가능한 웹앱 환경을 제공한다.

```json
{
  "name": "NEWKL AI Video",
  "short_name": "NEWKL",
  "description": "AI 기반 이러닝 콘텐츠 자동 생성 플랫폼",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#14a1c8",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["education", "productivity"],
  "lang": "ko",
  "dir": "ltr"
}
```

### 1.2 Next.js 연동

```typescript
// next.config.mjs
import withPWA from 'next-pwa';

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [/* 아래 캐싱 전략 참조 */],
})({
  // Next.js 설정
});

export default config;
```

### 1.3 메타 태그

```html
<head>
  <meta name="application-name" content="NEWKL AI Video" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="NEWKL" />
  <meta name="theme-color" content="#14a1c8" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
</head>
```

### 1.4 설치 프롬프트 (Add to Home Screen)

```typescript
// hooks/useInstallPrompt.ts
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return { isInstallable, promptInstall };
}
```

---

## 2. Service Worker (Workbox 기반)

### 2.1 Service Worker 등록

```typescript
// sw-registration.ts
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            // 업데이트 알림 토스트 표시
            showUpdateToast(registration);
          }
        });
      });
    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
    }
  }
}
```

### 2.2 Workbox Service Worker 구성

```javascript
// sw.js (Workbox 기반)
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { skipWaiting, clientsClaim } from 'workbox-core';

// 즉시 활성화
skipWaiting();
clientsClaim();

// 사전 캐싱 (빌드 시 자동 생성)
precacheAndRoute(self.__WB_MANIFEST);
```

---

## 3. 캐싱 전략

### 3.1 CacheFirst — 정적 자산

JS, CSS, 이미지, 폰트 등 변경 빈도가 낮은 정적 파일에 적용한다.

```javascript
// JavaScript, CSS 번들
registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style',
  new CacheFirst({
    cacheName: 'static-assets',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
      }),
    ],
  })
);

// 이미지
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 60 * 24 * 60 * 60, // 60일
      }),
    ],
  })
);

// 폰트
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1년
      }),
    ],
  })
);
```

### 3.2 NetworkFirst — API 응답

API 데이터는 네트워크 우선으로 처리하되, 오프라인 시 캐시를 반환한다.

```javascript
// API 호출
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-responses',
    networkTimeoutSeconds: 5,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 150,
        maxAgeSeconds: 24 * 60 * 60, // 24시간
      }),
    ],
  })
);
```

### 3.3 StaleWhileRevalidate — 페이지 HTML

페이지는 캐시를 즉시 반환하면서 백그라운드에서 최신 버전을 가져온다.

```javascript
// HTML 페이지
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7일
      }),
    ],
  })
);
```

### 3.4 캐싱 전략 요약

| 대상 | 전략 | 캐시 이름 | TTL | 최대 항목 |
|------|------|-----------|-----|-----------|
| JS/CSS 번들 | CacheFirst | `static-assets` | 30일 | 100 |
| 이미지 | CacheFirst | `images` | 60일 | 200 |
| 폰트 | CacheFirst | `fonts` | 1년 | 20 |
| API 응답 | NetworkFirst | `api-responses` | 24시간 | 150 |
| 페이지 HTML | StaleWhileRevalidate | `pages` | 7일 | 50 |

---

## 4. 오프라인 전략

### 4.1 핵심 페이지 사전 캐싱

설치 시점에 핵심 페이지를 미리 캐싱하여 오프라인에서도 접근 가능하게 한다.

```javascript
// 사전 캐싱 대상
const PRECACHE_URLS = [
  '/',                    // 포탈 메인
  '/learnform',           // LearnForm 랜딩
  '/offline',             // 오프라인 폴백 페이지
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('precache-v1').then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});
```

### 4.2 오프라인 폴백 페이지

네트워크와 캐시 모두 실패하는 경우 사용자에게 안내 페이지를 표시한다.

```typescript
// app/offline/page.tsx
export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">📡</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          오프라인 상태입니다
        </h1>
        <p className="text-gray-600 mb-6">
          인터넷 연결을 확인한 후 다시 시도해 주세요.
          <br />
          연결이 복구되면 자동으로 동기화됩니다.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-[#14a1c8] text-white rounded-lg
                     hover:bg-[#1190b4] transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
```

Service Worker에서 네비게이션 실패 시 폴백 처리:

```javascript
// 네비게이션 실패 시 오프라인 페이지로 폴백
import { setCatchHandler } from 'workbox-routing';

setCatchHandler(async ({ event }) => {
  if (event.request.mode === 'navigate') {
    return caches.match('/offline');
  }
  return Response.error();
});
```

### 4.3 네트워크 복구 시 자동 동기화

```typescript
// hooks/useNetworkStatus.ts
import { useState, useEffect, useCallback } from 'react';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    // 네트워크 복구 시 보류 중인 동기화 실행
    triggerPendingSync();
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
  }, []);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return { isOnline };
}

async function triggerPendingSync() {
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register('pending-requests');
}
```

---

## 5. Push Notifications

### 5.1 알림 권한 요청

```typescript
// lib/push-notifications.ts
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;

  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export async function subscribeToPush(): Promise<PushSubscription | null> {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
    ),
  });

  // 서버에 구독 정보 전송
  await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  });

  return subscription;
}
```

### 5.2 알림 유형

| 알림 유형 | 트리거 | 우선순위 |
|-----------|--------|----------|
| 강의 완료 | 학습자가 모듈/코스 완료 시 | 보통 |
| 새 콘텐츠 | 관심 분야에 새 강의 등록 시 | 보통 |
| AI 생성 완료 | 요청한 AI 콘텐츠 생성 완료 시 | 높음 |
| 학습 리마인더 | 설정된 학습 시간 도래 시 | 낮음 |
| 피드백 요청 | 동료 피드백 요청 수신 시 | 보통 |

### 5.3 Service Worker Push 이벤트 처리

```javascript
// sw.js
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};

  const options = {
    body: data.body || '새로운 알림이 있습니다.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: data.tag || 'default',
    data: {
      url: data.url || '/',
    },
    actions: data.actions || [],
    vibrate: [100, 50, 100],
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'NEWKL AI Video',
      options
    )
  );
});

// 알림 클릭 시 해당 페이지로 이동
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // 이미 열려 있는 탭이 있으면 포커스
        for (const client of clientList) {
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus();
          }
        }
        // 없으면 새 탭 열기
        return clients.openWindow(targetUrl);
      })
  );
});
```

---

## 6. Background Sync

### 6.1 오프라인 데이터 자동 업로드

오프라인 상태에서 작성한 내용(메모, 응답, 과제 등)을 IndexedDB에 저장하고, 네트워크 복구 시 자동 업로드한다.

```javascript
// sw.js — Background Sync
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

const bgSyncPlugin = new BackgroundSyncPlugin('offline-queue', {
  maxRetentionTime: 24 * 60, // 최대 24시간 보관 (분 단위)
  onSync: async ({ queue }) => {
    let entry;
    while ((entry = await queue.shiftRequest())) {
      try {
        await fetch(entry.request);
      } catch (error) {
        await queue.unshiftRequest(entry);
        throw error;
      }
    }
  },
});

// POST/PUT/PATCH 요청에 Background Sync 적용
registerRoute(
  ({ url, request }) =>
    url.pathname.startsWith('/api/') &&
    ['POST', 'PUT', 'PATCH'].includes(request.method),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

registerRoute(
  ({ url, request }) =>
    url.pathname.startsWith('/api/') &&
    ['POST', 'PUT', 'PATCH'].includes(request.method),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'PUT'
);
```

### 6.2 학습 진도 동기화

```typescript
// lib/progress-sync.ts
import { openDB } from 'idb';

const DB_NAME = 'newkl-offline';
const STORE_NAME = 'progress';

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
    },
  });
}

// 학습 진도 로컬 저장
export async function saveProgressLocally(progressData: {
  courseId: string;
  moduleId: string;
  stepId: string;
  progress: number;
  timestamp: number;
}) {
  const db = await getDB();
  await db.put(STORE_NAME, {
    ...progressData,
    synced: false,
    timestamp: Date.now(),
  });
}

// 동기화 실행
export async function syncProgress() {
  const db = await getDB();
  const unsyncedItems = await db.getAll(STORE_NAME);
  const pending = unsyncedItems.filter((item) => !item.synced);

  if (pending.length === 0) return;

  try {
    const response = await fetch('/api/progress/batch-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: pending }),
    });

    if (response.ok) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      for (const item of pending) {
        await tx.store.put({ ...item, synced: true });
      }
      await tx.done;
    }
  } catch (error) {
    console.warn('진도 동기화 실패, 다음 연결 시 재시도:', error);
  }
}
```

### 6.3 Background Sync 이벤트

```javascript
// sw.js
self.addEventListener('sync', (event) => {
  switch (event.tag) {
    case 'pending-requests':
      event.waitUntil(replayPendingRequests());
      break;
    case 'sync-progress':
      event.waitUntil(syncLearningProgress());
      break;
    default:
      break;
  }
});
```

---

## 7. 앱 업데이트 전략

### 7.1 skipWaiting + clients.claim

새 Service Worker가 설치되면 즉시 활성화하여 모든 클라이언트를 제어한다.

```javascript
// sw.js
import { skipWaiting, clientsClaim } from 'workbox-core';

skipWaiting();
clientsClaim();
```

### 7.2 업데이트 알림 토스트

사용자에게 업데이트가 가능함을 알리고 새로고침을 유도한다.

```typescript
// components/UpdateToast.tsx
'use client';

import { useEffect, useState } from 'react';

export function UpdateToast() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.ready.then((reg) => {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            setShowUpdate(true);
            setRegistration(reg);
          }
        });
      });
    });
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg
                    shadow-lg border border-gray-200 p-4 max-w-sm">
      <p className="text-sm text-gray-700 mb-3">
        새 버전이 준비되었습니다. 업데이트하시겠습니까?
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setShowUpdate(false)}
          className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          나중에
        </button>
        <button
          onClick={handleUpdate}
          className="px-3 py-1.5 text-sm bg-[#14a1c8] text-white
                     rounded hover:bg-[#1190b4] transition-colors"
        >
          지금 업데이트
        </button>
      </div>
    </div>
  );
}
```

### 7.3 Service Worker 측 메시지 수신

```javascript
// sw.js
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

---

## 8. 성과 목표

### 8.1 Lighthouse PWA 점수 100 달성 체크리스트

| 항목 | 요구사항 | 상태 |
|------|----------|------|
| HTTPS 사용 | 모든 페이지 HTTPS 제공 | 필수 |
| Service Worker 등록 | fetch 이벤트 핸들러 포함 | 필수 |
| Web App Manifest | name, icons, start_url, display 포함 | 필수 |
| 아이콘 제공 | 192x192, 512x512 maskable 아이콘 | 필수 |
| 오프라인 동작 | 오프라인에서 200 응답 반환 | 필수 |
| 설치 가능 | beforeinstallprompt 이벤트 지원 | 필수 |
| 리다이렉트 없음 | start_url에서 리다이렉트 없음 | 필수 |
| theme_color 설정 | manifest + meta 태그 일치 | 필수 |
| 뷰포트 설정 | width=device-width 메타 태그 | 필수 |
| 콘텐츠 크기 | 뷰포트에 맞는 콘텐츠 | 필수 |

### 8.2 주요 성능 지표 (KPI)

| 지표 | 목표값 |
|------|--------|
| Lighthouse PWA 점수 | 100 |
| 오프라인 가용 페이지 비율 | 핵심 페이지 100% |
| Service Worker 캐시 히트율 | 정적 자산 95% 이상 |
| Push 알림 허용률 | 40% 이상 |
| Background Sync 성공률 | 99% 이상 |
| 앱 설치 전환율 | 방문자 대비 15% |
| 오프라인 → 온라인 동기화 지연 | 5초 이내 |

---

## 9. 구현 우선순위

| 단계 | 항목 | 기간 |
|------|------|------|
| **Phase 1** | manifest.json + 기본 Service Worker + 정적 캐싱 | 1주 |
| **Phase 2** | 오프라인 폴백 + 페이지 캐싱 전략 적용 | 1주 |
| **Phase 3** | Push Notifications 구현 | 2주 |
| **Phase 4** | Background Sync + 학습 진도 동기화 | 2주 |
| **Phase 5** | 업데이트 전략 + Lighthouse 최적화 | 1주 |

---

## 10. 보안 고려사항

- **HTTPS 필수**: Service Worker는 HTTPS(또는 localhost)에서만 동작
- **VAPID 키 관리**: Push 알림용 VAPID 키는 환경 변수로 관리, 공개키만 클라이언트에 노출
- **캐시 무효화**: 민감한 데이터(인증 토큰, 개인정보)는 캐싱 대상에서 제외
- **IndexedDB 암호화**: 오프라인 저장 데이터 중 민감 정보는 암호화 저장
- **CSP 헤더**: Service Worker 스크립트 출처를 Content-Security-Policy로 제한
