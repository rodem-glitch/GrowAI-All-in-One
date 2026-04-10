# ── Stage 1: 의존성 설치 ──
FROM node:20-alpine AS deps
WORKDIR /app

# 패키지 매니저 파일만 먼저 복사하여 캐시 레이어 최적화
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps 2>/dev/null || npm install --legacy-peer-deps

# ── Stage 2: 빌드 ──
FROM node:20-alpine AS builder
WORKDIR /app

# 의존성 레이어 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Vite 프로덕션 빌드
RUN npm run build

# ── Stage 3: 실행 (nginx) ──
FROM nginx:alpine AS runner

# nginx로 정적 파일 서빙 (Cloud Run 포트 8080)
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
